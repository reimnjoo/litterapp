import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ImageBackground, Image, BackHandler, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PreAuthOwner = ({ navigation }) => {

    // Back Handler

    React.useEffect(() => {
        function handleBackButton() {
            navigation.navigate('UserSelection');
        return true;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/welcomeOwner.png')} style={styles.bg}>
                <View style={{alignItems: 'center', marginTop: windowHeight * 30 / 100}}>
                    <Text style={styles.welcome}>Welcome</Text>
                </View>
                <View style={styles.authButtonContainer}>
                    <TouchableOpacity style={styles.authButton1} onPress={() => navigation.navigate('RegAuthOwner')}>
                        <Text style={styles.authButtonLabel1}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authButton2} onPress={() => navigation.navigate('LogAuthOwner')}>
                        <Text style={styles.authButtonLabel2}>Sign-In</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    welcome: {
        fontFamily: 'Inter-Thin',
        fontStyle: 'italic',
        fontSize: 50,
        color: '#F4F5F4',
    },
    authButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: windowHeight * 40 / 100,
    },
    authButton1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 123,
        height: 55,
        backgroundColor: '#F4F5F4',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: '#F4F5F4',
        borderWidth: 1,
    },
    authButton2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 123,
        height: 55,
        backgroundColor: '#365540',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#F4F5F4',
        borderWidth: 1,
    },
    authButtonLabel1: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: '#365540'
    },
    authButtonLabel2: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: '#F4F5F4'
    },
});

export default PreAuthOwner;
