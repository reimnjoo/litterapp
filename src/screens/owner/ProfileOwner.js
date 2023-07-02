import React, { Component, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, BackHandler, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ProfileBuyer = ({ navigation, route }) => {

  // Owner Data State Hooks

  // Input State Hooks

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState([]);
  const [image, setImage] = useState("");
  const [finalImage, setFinalImage] = useState("");

  // User Token

  const { userToken } = route.params;

  console.log("usertoken post-login (profile page): " + userToken)

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


  useEffect(() => {
    getProfileData();
  }, [])

  // Show/Hide Password State

  const [isSecuredEntry, setSecuredEntry] = useState(true);

  // Handle Image Upload State
  
  // Alert Hook State

  const [showBox, setShowBox] = useState(true);


  //* Image Uploading and Fetch

  const pickImage = async () => {

    // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        let finalResult = {...result.assets[0], fileName: "image/profileImg/" + result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length)}
        let imageUri = "https://www.sseoll.com/image/profileImg/" + result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setFinalImage(imageUri);
            setImageFile(finalResult);
        } 
    };

    const uploadImage = () => {
        // console.log("Image Data : ", imagedata)

        let dataImage = {
            method: 'POST',
            body: JSON.stringify({
                image: imageFile,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        return fetch('https://sseoll.com/imageUpload.php', dataImage)
               .then(response => response.json())
               .then(json => {
                    console.log('Result: ', json)
               })
               .catch(err => {
                    console.log('Error: ', err);
               })
    }

    const getImage = () => {
      return image
    };

  
  //* Back Button Handler & Profile Changes Handler

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

  //* Update Dialogue Handler

  const updateDialog = () => {
    return Alert.alert(
      "Profile Update",
      "Would you like to confirm your changes?",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            updateProfile();
            uploadImage();
            navigation.navigate("OwnerOverview");
            // navigation.goBack();
          }
        },
        {
          text: "No",
          onPress: () => {
            setShowBox(false);
            navigation.navigate("OwnerOverview");
            // navigation.goBack();
          }
        }
      ]
    );
  };

  function handleUpdateClick() {
    updateDialog();
    return true;
  }

  //* Back Button Handler

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




  //* Fetch Profile Data

  const getProfileData = () => {
    return (
      fetch("https://sseoll.com/fetchOwnerProfile.php", {
          method: 'POST',
          headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
          },
      body: JSON.stringify({readcode: 1, userID: userToken}),
      }).then((response) => {
          return response.json();
      }).then((data) => {
          console.log("Profile Data: ", data);
          setFirstName(data[0].firstName);
          setLastName(data[0].lastName);
          setStoreName(data[0].storeName);
          setLocation(data[0].location);
          setEmail(data[0].email);
          setPassword(data[0].password);
          setImage(data[0].profileImage);
          setFinalImage(data[0].profileImage);
      }).catch(err => {
          console.log(err);
      })
    ) 
  }

  //* Update Profile

  const profileEditForm = {
    userID: userToken,
    firstName: firstName,
    lastName: lastName,
    storeName: storeName,
    location: location,
    email: email,
    password: password,
    image: finalImage,
  }

  const updateProfile = () => {
    console.log(profileEditForm);
    fetch("https://sseoll.com/updateOwnerProfile.php", {
        method: 'POST',
        headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
        },
    body: JSON.stringify(profileEditForm),
    }).then((response) => {
        return response.text();
    }).then((data) => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    }) 
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.headerTabs}>
              <TouchableOpacity onPress={() => {showConfirmDialog();}}>
                  <Ionicons name="arrow-back" size={24} color="#F4F5F4" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Edit Profile</Text>
              <Image source={require('../assets/img/edit.png')}></Image>
          </View>
          <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => {pickImage();}}>
                {
                  image === null ?
                  (<Image style={styles.pfp} source={require('../assets/img/pfp.jpg')}></Image>) :
                  (<Image style={styles.pfp} source={{uri: getImage()}}></Image>)
                }
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
              value={firstName}
              onChangeText={name => {setFirstName(name)}}
              placeholder="Ex. Borgart"
              autoCorrect={false}
              style={styles.input}
          />
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
              value={lastName}
              onChangeText={name => {setLastName(name)}}
              placeholder="Ex. Dela Cruz"
              autoCorrect={false}
              style={styles.input}
          />
          <Text style={styles.inputLabel}>Store Name</Text>
          <TextInput
              value={storeName}
              onChangeText={storename => {setStoreName(storename)}}
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
      </ScrollView>
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
