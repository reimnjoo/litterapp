import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';

// AuthContext Import

// import { AuthContext } from './context';

const UserSelection = ({ navigation }) => {

    // const { userChoice } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/ob_splash.png')} style={styles.bg}>
                <View style={styles.userChoiceContainer}>
                    <Text style={styles.uscLabel}>Are you a...</Text>
                    <View style={styles.uscButtonsContainer}>
                        <LinearGradient
                            colors={['#95B6A0', '#FFFFFF']}
                            style={styles.gradientContainer}
                            start={{x: 0.5, y: 0.1}}
                        >
                            <TouchableOpacity onPress={() => {navigation.navigate('PreAuthOwner')}} style={styles.uscButton}>
                                <Image style={{width: 86, height: 86}} source={require('../assets/img/ownerIcon.png')}></Image>
                                <Text style={styles.uscButtonLabel}>Owner</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <LinearGradient
                            colors={['#95B6A0', '#FFFFFF']}
                            style={styles.gradientContainer}
                            start={{x: 0.5, y: 0.1}}
                        >
                            <TouchableOpacity onPress={() => {navigation.navigate('PreAuthBuyer')}} style={styles.uscButton}>
                                <Image style={{width: 86, height: 86}} source={require('../assets/img/buyerIcon.png')}></Image>
                                <Text style={styles.uscButtonLabel}>Buyer</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
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
    userChoiceContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding:70,
    },
    uscLabel: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 25,
        color: '#3C6255',
    },
    uscButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
    },
    uscButton: {
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'center',
        width: 146,
        height: 190,
    },
    uscButtonLabel: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: 25,
        color: '#3C6255',
    },
    gradientContainer: {
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    }
});

export default UserSelection;
