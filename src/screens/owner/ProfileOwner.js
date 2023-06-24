import React, { Component, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';

const ProfileBuyer = ({ navigation }) => {

  // Back Handler

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  // Input State Hooks

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Show/Hide Password State

  const [isSecuredEntry, setSecuredEntry] = useState(true);

  // Handle Image Upload

  // Handle Image State Hooks & Permission

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  
  // Alert Hook State

  const [showBox, setShowBox] = useState(true);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, [])

  const uploadImage = async (uploadStatus) => {

    if(uploadStatus === true) {
      storeImage(image);
      navigation.goBack();
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
  
      setImage(result.uri); // Initial upload
      setHasImage(true);
    }
    
  }

  if(hasGalleryPermission === false) {
    return <Text>No device permission!</Text>
  }

  // Back Button Handler & Profile Changes Handler

  const showConfirmDialog = () => {
    return Alert.alert(
      "Oops, you have unsaved changes!",
      "Changes will not be saved once you confirm.",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            navigation.goBack();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  // Update Handler

  const updateDialog = () => {
    return Alert.alert(
      "Profile Update",
      "Would you like to confirm your changes?",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            uploadImage(true);
          }
        },
        {
          text: "No",
          onPress: () => {
            setShowBox(false);
            navigation.goBack();
          }
        }
      ]
    );
  };

  function handleUpdateClick() {
    updateDialog();
    return true;
  }

  // Back Handler

  function handleBackButtonClick() {
    showConfirmDialog();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);


  // Temporary Async Storage (since there are no databases yet)

  // Save Image Data 

  const storeImage = async (data) => {
    try {
      console.log("Saving data: " + data);
      await AsyncStorage.setItem('imgData', data)
    } catch (error) {
      console.log("Error saving data: " + error);
    }
    console.log("Data saved: " + data);
  }

  // Fetch Image Data on Application Render


  const fetchData = async () => {
    // Temp solution (backend dev, also make use of this in integration with PHP)
    try {
      console.log("Fetching data...");
      const fetchedData = await AsyncStorage.getItem('imgData');
      if(fetchedData !== null) {
        console.log("Fetched Data: " + fetchedData);
        setImage(fetchedData);
        setHasImage(true);
      }
    } catch (error) {
      console.log("Error while fetching the data: " + error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.headerTabs}>
            <TouchableOpacity onPress={() => {showConfirmDialog();}}>
                <Ionicons name="arrow-back" size={24} color="#F4F5F4" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Edit Profile</Text>
            <Image source={require('../assets/img/edit.png')}></Image>
        </View>
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => {uploadImage();}}>
              {
                hasImage === true ? 
                (<Image style={styles.pfp} source={{uri: image}}></Image>) : 
                (<Image style={styles.pfp} source={require('../assets/img/pfp.jpg')}></Image>)
              }
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
            value={name}
            onChangeText={name => {setName(name)}}
            placeholder="Ex. Borgart Dela Cruz"
            autoCorrect={false}
            style={styles.input}
        />
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => {showConfirmDialog();}}>
            <Text style={styles.cancelLabel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={() => {handleUpdateClick();}}>
            <Text style={styles.saveLabel}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#3C4C42',
    paddingTop: 60,
    paddingBottom: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  headerTabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#F4F5F4'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  pfp: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  profileDetails: {
    paddingLeft: 30,
    paddingRight: 30
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    paddingBottom: 30
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#3E5A47',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 87,
    height: 47,
  },
  cancelLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#3E5A47'
  },
  saveButton: {
    backgroundColor: '#3E5A47',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 134,
    height: 47,
  },
  saveLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#F4F5F4'
  },
});

//make this component available to the app
export default ProfileBuyer;
