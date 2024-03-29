// Component Imports

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, useWindowDimensions, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, forwardRef, useImperativeHandle } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

// This is a custom modal component I developed for modal reuse in the LitterApp.

const ScrapAddModal = forwardRef(({activeHeight, backDropColor, backgroundColor, children}, ref) => {

    // Get Active Device Height

    const height = useWindowDimensions().height + 40;
    const newActiveHeight = height - activeHeight;

    // Modal Animation Handlers (Do not touch)

    const topAnimation = useSharedValue(height);

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
            top,
        }
    });

    const backDropAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            topAnimation.value,
            [height, newActiveHeight],
            [0, 0.5],
        )

        const display = opacity === 0 ? 'none' : 'flex';
        return {
            opacity,
            display,
        };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = topAnimation.value;
        },
        onActive: (event, ctx) => {
            if(event.translationY < 0) {
                topAnimation.value = withSpring(newActiveHeight, {
                    damping: 100,
                    stiffness: 400,
                });
            } else {
                topAnimation.value = withSpring(ctx.startY + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });
            }
        },
        onEnd: () => {
            if(topAnimation.value > newActiveHeight + 50) {
                topAnimation.value = withSpring(height, {
                    damping: 100,
                    stiffness: 400,
                });
            } else {
                topAnimation.value = withSpring(newActiveHeight, {
                    damping: 100,
                    stiffness: 400,
                });
            }
        },
    });

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
        });
    }, []);

    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
        });
    }, []);

    useImperativeHandle( 
        ref, 
        () => ({
            expand, 
            close,
        }), 
        [expand, close],
    );

    // Modal Component Structure
    
    return (
        <>
            <TouchableWithoutFeedback onPress={() => {close();}}>
                <Animated.View style={[styles.backDrop, backDropAnimation, {backgroundColor: backDropColor}]}/>
            </TouchableWithoutFeedback>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[
                    styles.container, 
                    animationStyle,
                    {
                        height: activeHeight,
                        backgroundColor: backgroundColor,
                    }
                ]}>
                    <View style={styles.lineContainer}>
                        <View style={styles.line}></View>
                    </View>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </>
    )

});

// Modal Component Styling

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 61,
        height: 11,
        backgroundColor: '#C4D6CA',
        borderRadius: 5,
        marginTop: 5
    },
    backDrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default ScrapAddModal;