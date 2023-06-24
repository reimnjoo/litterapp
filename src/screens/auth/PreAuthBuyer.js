import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ImageBackground, Image, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native';

const PreAuth = ({ navigation }) => {

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
            <ImageBackground source={require('../assets/img/welcomeBuyer.png')} style={styles.bg}>
                <Text style={styles.welcome}>Welcome</Text>
                <View style={styles.authButtonContainer}>
                    <TouchableOpacity style={styles.authButton1} onPress={() => navigation.navigate('RegAuthBuyer')}>
                        <Text style={styles.authButtonLabel1}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authButton2} onPress={() => navigation.navigate('LogAuthBuyer')}>
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
        width: "100%",
        height: "100%",
    },
    welcome: {
        position: 'absolute',
        top: 460,
        left: 115,
        fontFamily: 'Inter-Thin',
        fontStyle: 'italic',
        fontSize: 50,
        color: '#365540',
    },
    authButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 700,
    },
    authButton1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 123,
        height: 55,
        backgroundColor: '#365540',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: '#365540',
        borderWidth: 1,
    },
    authButton2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 123,
        height: 55,
        backgroundColor: '#F4F5F4',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#365540',
        borderWidth: 1,
    },
    authButtonLabel1: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: '#F4F5F4'
    },
    authButtonLabel2: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: '#365540'
    },
});

export default PreAuth;
