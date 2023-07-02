import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'

// Auth Context Import

import { AuthContext } from './context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RegAuthBuyer = ({ navigation }) => {

  // Input State

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Backend Data

  const registerData = {
    firstName: firstName,
    lastName: lastName,
    company: company,
    location: location,
    email: email,
    password: password,
  }

  const registerBuyer = () => {

    // Input Handler

    if(firstName === '' || lastName === '' || company === '' || location === '' || email === '' || password === '') {
      handleInputAlert();
    } else {
      fetch("https://sseoll.com/registerData.php", {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(registerData),
      }).then((response) => {
        return response.text();
      }).then((data) => {
        console.log(data);
        handleRegisterAlert();
      })
    }

  }

  // Alert Handler

  const [showBox, setShowBox] = useState(true);

  function handleInputAlert() {
    inputError();
    return false;
  }

  function handleRegisterAlert() {
    registerSuccess();
    return false;
  }

  const inputError = () => {
    return Alert.alert(
      "Registration Failed",
      "Please fill out all of the required fields!",
      [
        {
          text: "Okay",
          onPress: () => {
            setShowBox(false);
          },
        },
      ]
    );
  };

  const registerSuccess = () => {
    return Alert.alert(
      "Registration, Success!",
      "You are now a registered affiliated buyer of LitterApp!",
      [
        {
          text: "Okay",
          onPress: () => {
            setShowBox(false);
          },
        },
      ]
    );
  };

  // Show/Hide Password State

  const [isSecuredEntry, setSecuredEntry] = useState(true);

  // Login Auth 

  // const { signIn } = React.useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.inputContainer}>

          <Text style={styles.regLabel}>CREATE YOUR ACCOUNT</Text>

          <View style={{flexDirection: 'row',}}>
            <Text style={[styles.inputLabel, {width: '50%'}]}>First Name</Text>
            <Text style={[styles.inputLabel, {width: '50%'}]}>Last Name</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
                value={firstName}
                onChangeText={firstName => {setFirstName(firstName)}}
                placeholder="Bogart"
                autoCorrect={false}
                style={[styles.input, {width: '45%', marginRight: 20}]}
            />
            <TextInput
                value={lastName}
                onChangeText={lastName => {setLastName(lastName)}}
                placeholder="Dela Cruz"
                autoCorrect={false}
                style={[styles.input, {width: '50%'}]}
            />
          </View>

          <Text style={styles.inputLabel}>Company</Text>
          <TextInput
              value={company}
              onChangeText={company => {setCompany(company)}}
              placeholder="Your company"
              autoCorrect={false}
              style={styles.input}
          />

          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
              value={location}
              onChangeText={location => {setLocation(location)}}
              placeholder="Enter your address"
              autoCorrect={false}
              style={styles.input}
          />

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
                <Ionicons name="eye-outline" size={24} color="#3E5A47" />
              </TouchableOpacity>
          </View>

          <View style={styles.regContainer}>
              <TouchableOpacity style={styles.regButton} onPress={() => {registerBuyer();}}>
                  <Text style={styles.signInLabel}>Register Now</Text>
              </TouchableOpacity>
          </View>

          </View>


          {/* <LinearGradient
          colors={['#8FAB98', '#3E5A47']}
          style={styles.gradientContainer}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 0.5 }}
          >


          </LinearGradient> */}

          <View style={styles.outerButtonContainer}>
            <Text style={styles.authTextLabel}>Already have an account?</Text>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("LogAuthBuyer")}>
                <Text style={styles.registerText}>Sign-In!</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default RegAuthBuyer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#365540'
  },
  regLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#3E5A47',
    textAlign: 'center',
    paddingTop: windowHeight * 10 / 100,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#F4F5F4',
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#6B8072',
    marginTop: 20,
    marginBottom: 10
  },
  input: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#3E5A47',
    borderBottomWidth: 1,
    borderBottomColor: '#3E5A47',
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
  regContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  regButton: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 23,
    width: 200,
    height: 62,
    marginTop: 50,
    marginBottom: 30,
    elevation: 5,
  },
  outerButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: windowHeight * 7 / 100,
    marginBottom: 40,
  },
  authTextLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F4F5F4',
    width: 140,
    textAlign: 'center',
  },
  registerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#F4F5F4',
    textDecorationLine: 'underline',
  }
})