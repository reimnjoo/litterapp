import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'

// Auth Context Import

import { AuthContext } from './context';

// Screen Width and Height 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginAuth = ({ navigation }) => {

  // Input State

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // Show/Hide Password State

  const [isSecuredEntry, setSecuredEntry] = useState(true);

  // Login Auth 

  const { signIn } = React.useContext(AuthContext);

  const loginData = {
    email: email,
    password: password,
  }

  // Alert Handler

  const [showBox, setShowBox] = useState(true);

  function handleAuthAlert() {
    loginError();
    return false;
  }

  function handleInputAlert() {
    inputError();
    return false;
  }

  const loginError = () => {
    return Alert.alert(
      "Authentication Failed",
      "Invalid Credentials!",
      [
        {
          text: "Try Again",
          onPress: () => {
            setShowBox(false);
          },
        },
      ]
    );
  };

  const inputError = () => {
    return Alert.alert(
      "Authentication Failed",
      "Invalid Credentials!",
      [
        {
          text: "Try Again",
          onPress: () => {
            setShowBox(false);
          },
        },
      ]
    );
  };

  const loginBuyer = (user) => {
    if(email === null && password === null) {
      handleInputAlert();
    } else {
      fetch("https://sseoll.com/loginData.php", {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginData),
      }).then((response) => {
        return response.text();
      }).then((data) => {
        console.log(data);
        const parsed = parseInt(data);
        if(parsed === 104) {
          handleAuthAlert();
        } else {
          console.log("usertoken pre-login: " + parsed);
          signIn(user, parsed);
        }
      })
    }
  }


  // Alert Handler



  // const loginBuyer = (user, token) => {
  //   if(user !== null && token !== null) {
  //     signIn(user, token);
  //   } else {
  //     loginAlert();
  //   }
  // }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <LinearGradient
        colors={['#8FAB98', '#3E5A47']}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }} 
        end={{ x: 0, y: 0.5 }}
      >
        <Image style={styles.ellipse} source={require('../assets/img/ellipseBuyer.png')}></Image>
        
        <Text style={styles.signInAccLabel}>SIGN IN YOUR ACCOUNT</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={email => {setEmail(email)}}
            placeholder="Enter your email"
            autoCorrect={false}
            style={styles.input}
          />
          <Text style={styles.inputLabel}>Password</Text>
          
          <View>
            <TextInput
              value={password}
              onChangeText={password => {setPassword(password)}}
              placeholder="Password"
              style={styles.input}
              iconPosition="right"
              secureTextEntry={isSecuredEntry}
            />
            <TouchableOpacity style={{
              position: 'absolute',
              right: 0,
            }} onPress={() => {
              setSecuredEntry((prev) => !prev)
            }}>
              <Ionicons name="eye-outline" size={24} color="#F4F5F4" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.forgotPwButton}>
            <Text style={styles.forgotPasswordLabel}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <TouchableOpacity style={styles.signInButton} onPress={() => loginBuyer("buyer")}>
              <Text style={styles.signInLabel}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.outerButtonContainer}>
        <Text style={styles.authTextLabel}>Don't have an account?</Text>

        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("RegAuthBuyer")}>
          <Text style={styles.registerText}>Register Now!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    
  )
}

export default LoginAuth

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipse: {
    position: 'absolute',
    top: windowHeight * -20 / 100,
    top: 0,
    left: 0,
    right: 0
  },
  gradientContainer: {
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
  },
  signInAccLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#F4F5F4',
    textAlign: 'center',
    paddingTop: windowHeight * 25 / 100,
    marginBottom: 20,
  },
  inputContainer: {
    // backgroundColor: '#F4F5F4'
    paddingLeft: 25,
    paddingRight: 25,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#F4F5F4',
    marginTop: 20,
  },
  input: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#F4F5F4',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F4',
    paddingBottom: 3,
  },
  signInLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 25,
    color: '#365540',
  },
  forgotPasswordLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F4F5F4',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 40,
  },
  signInContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#F4F5F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 23,
    width: 163,
    height: 62,
    marginTop: 50,
    marginBottom: 30,
  },
  outerButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: windowHeight > 728 ? (windowHeight * 10 / 100) : (windowHeight * 5 / 100),
  },
  authTextLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#365540',
    width: 100,
    textAlign: 'center',
  },
  registerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#365540',
    textDecorationLine: 'underline',
  }
})