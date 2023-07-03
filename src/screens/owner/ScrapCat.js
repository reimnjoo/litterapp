// *Component Imports

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, useWindowDimensions, ScrollView, TextInput, Image, SectionList, BackHandler, FlatList, Alert, Dimensions, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

// *Icon Imports

import {
    FontAwesome,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Ionicons,
    AntDesign,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

// *Custom Modal Component 

import ScrapAddModal from "./ScrapAddModal";
import { makeStyles } from '@rneui/base';

// *Device Width x Height

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ScrapCat = ({ navigation }) => {

    // *Get Device Height

    const {height} = useWindowDimensions();

    // *Modal Reference Point

    const addModalRef = useRef(null);
    const editModalRef = useRef(null);
    const addScrapModalRef = useRef(null);
    const editCategoryModalRef = useRef(null);

    // *Modal Handlers

    const openAddHandler = useCallback(() => {
        addModalRef.current.expand()
    }, []);

    const closeAddHandler = useCallback(() => {
        addModalRef.current.close()
        clearForm();
    }, []);

    const openEditHandler = useCallback(() => {
        editModalRef.current.expand()
    }, []);

    const closeEditHandler = useCallback(() => {
        editModalRef.current.close()
        clearForm();
    }, []);

    const openAddScrapHandler = useCallback(() => {
        addScrapModalRef.current.expand()
    }, []);

    const closeAddScrapHandler = useCallback(() => {
        addScrapModalRef.current.close()
        clearForm();
    }, []);

    const openEditCategoryHandler = useCallback(() => {
        editCategoryModalRef.current.expand()
    }, []);

    const closeEditCategoryHandler = useCallback(() => {
        editCategoryModalRef.current.close()
        clearForm();
    }, []);

    // *UseState Hook for Scrap Data
  
    const [scrapID, setScrapID] = useState(0);
    const [categoryID, setCategoryID] = useState(0);
    const [scrapName, setScrapName] = useState("");
    const [scrapSize, setScrapSize] = useState("");
    const [scrapWeight, setScrapWeight] = useState("");
    const [scrapCost, setScrapCost] = useState("");
    const [scrapQuantity, setScrapQuantity] = useState("");
    const [scrapAddDate, setScrapAddDate] = useState(new Date());
    const [scrapFinalDate, setScrapFinalDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [hasImage, setHasImage] = useState(false);
    const [scrapCategory, setScrapCategory] = useState("");
    const [scrapColor, setScrapColor] = useState("");
    const [categoryCount, setCategoryCount] = useState("");
    const [finalScrapImage, setFinalScrapImage] = useState([]);
    const [scrapImage, setScrapImage] = useState([]);
    const [temporaryCategory, setTemporaryCategory] = useState("");

    //* Random Color Generator Function

    const colorGenerator = () => {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    console.log("Sample Color: " + colorGenerator());

    //* Back Button + Back-Device Handler

    //* Calendar Modal Handler

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const [dayOfDate, setDayOfDate] = useState("");
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const formatDate = (rawdate) => {
        const date = new Date(rawdate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setDayOfDate(daysOfWeek[date.getDay()]);

        console.log("Day: ", dayOfDate);

        return `${year}-${month}-${day}`;
    }

    console.log('Scrap Add Date: ' + scrapAddDate);

    const onChange = ({ type }, selectedDate) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setScrapAddDate(currentDate);

            if(Platform.OS === "android") {
                toggleDatePicker();
                setScrapFinalDate(formatDate(currentDate));
            }
        } else {
            toggleDatePicker();
        }
    };

    //* Back Handler & Dialog Box Handler

    const [showBox, setShowBox] = useState(true);

    //* Scrap Category Confirmation Dialog

    const showConfirmDialog = () => {
        return Alert.alert(
            "Category created",
            `You have successfully created the category "${tempCategory}".`,
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

    const editSuccessDialog = () => {
        return Alert.alert(
            "Category Edited!",
            `You have successfully edited the category "${tempCategory}".`,
            [
              {
                text: "Okay",
                onPress: () => {
                  setShowBox(false);
                },
              },
            ]
        );
    }

    const confirmDeleteDialog = (categorydata, categorytitle) => {
        return Alert.alert(
            "Are you sure?",
            `Do you wish to delete the category? "${categorytitle}" all scrap data content with the category will also be deleted.`,
            [
              {
                text: "Delete Category",
                onPress: () => {
                  deleteScrapCategory(categorydata);
                  deleteSuccessDialog(categorytitle);
                  setShowBox(false);
                },
              },
              {
                text: "Cancel",
                onPress: () => {
                    setShowBox(false);
                }
              }
            ]
        );
    };

    const deleteSuccessDialog = (categorytitle) => {
        return Alert.alert(
            "Category Deleted",
            `You have successfully deleted the category "${categorytitle}". All related scrap data within the category are also removed!.`,
            [
              {
                text: "Okay",
                onPress: () => {
                  deleteScrapCategory();
                  setShowBox(false);
                },
              },
            ]
        );
    }


    function handleBackButton() {
        navigation.goBack();
        return true;
    }

    React.useEffect(() => {

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();

    }, []);


    // Keyboard Handler

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const detectKeyboard = () => {

        useEffect(() => {
            const keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                () => {
                    setKeyboardVisible(true);
                },
            );
            const keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () => {
                    setKeyboardVisible(false);
                },
            );

            return () => {
                keyboardDidHideListener.remove();
                keyboardDidShowListener.remove();
            };
        }, []);

        return isKeyboardVisible;
    }


    // Fetch Scrap Data

    const [data, setData] = useState([]);
    const [tempCategory, setTempCategory] = useState("");
    const [category, setCategoryData] = useState([]);

    // Category Temporary Data

    const tempCatData = {
        category: tempCategory,
    }
    

    // Scrap Count 

    // const scrapCount = Object.keys(data).length;

    // console.log("Scrap Count: " + scrapCount);

    // Group Fetched Data

    // const scrapCategoriesData = data.reduce((categoryData, item) => {
    //     if(categoryData.find(i => i.scrapCategory == item.scrapCategory)) {
    //         return categoryData.map(i => i.scrapCategory == item.scrapCategory ? {...i, data: [...i.data, item]} : i)
    //     } else {
    //         return [...categoryData, { scrapCategory: item.scrapCategory, data: [item]}]
    //     }
    // }, []);

    // Fetch Scrap Categories and Scrap Data

    const getScrapCategories = () => {
        return (
            fetch("https://sseoll.com/scrapCategoryRead.php")
            .then(data => {
                return data.json();
            })
            .then(scrapCategory => {
                console.log(scrapCategory);
                setCategoryData(scrapCategory);
                console.log("Device Height: " + Height);
            })
            .catch(err => {
                console.log(err);
            }) 
        )
    }

    const getScrapData = () => {
        return (
            fetch("https://sseoll.com/scrapDataRead.php")
            .then(data => {
                return data.json();
            })
            .then(scrapData => {
                console.log(scrapData);
                setData(scrapData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    useEffect(() => {
        getScrapCategories();
        getScrapData();
    }, [])

    // Scrap Image Handler

    const pickImage = async () => {

    // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        let finalResult = {...result.assets[0], fileName: "image/scrapAsset/" + result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length)}
        let imageUri = "https://www.sseoll.com/image/scrapAsset/" + result.uri.substring(result.uri.lastIndexOf('/') + 1, result.uri.length);

        if (!result.canceled) {
            setFinalScrapImage(finalResult);
            setScrapImage(imageUri);
            console.log("Image Location: " + imageUri);
            setHasImage(true);
        } 
    };

    const uploadImage = () => {
        // console.log("Image Data : ", imagedata)

        let dataImage = {
            method: 'POST',
            body: JSON.stringify({
                image: finalScrapImage,
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

    // Write + Edit Scrap Categories Data

    const scrapDataForm = {
        scrapName: scrapName,
        scrapSize: scrapSize,
        scrapCost: scrapCost,
        scrapQuantity: scrapQuantity,
        scrapWeight: parseInt(scrapWeight),
        scrapAddDate: scrapFinalDate,
        scrapDayAdded: dayOfDate,
        scrapCategory: temporaryCategory,
        scrapImage: scrapImage,
        scrapColor: colorGenerator(),
    }

    const editedScrapDataForm = {
        scrapID: parseInt(scrapID),
        scrapName: scrapName,
        scrapSize: scrapSize,
        scrapCost: scrapCost,
        scrapQuantity: scrapQuantity,
        scrapWeight: parseInt(scrapWeight),
        scrapAddDate: scrapFinalDate,
        scrapDayAdded: dayOfDate,
        scrapCategory: temporaryCategory,
        scrapImage: scrapImage,
    }
   
    const clearForm = () => {
        setScrapID(0);
        setScrapName("");
        setScrapSize("");
        setScrapCost("");
        setScrapQuantity("");
        setScrapWeight(0);
        setScrapFinalDate("");
        setDayOfDate("");
        setScrapCategory("");
        setScrapImage("");
        setScrapColor("");
        setHasImage(false);
    }

    // Submit Scrap Data

    const submitScrapData = () => {
        console.log("pre-post: " + scrapDataForm.scrapName);
        fetch("https://sseoll.com/scrapDataWrite.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify(scrapDataForm),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            getScrapData();
            console.log("test submit for scrapdata: " + data);
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Submit Edited Scrap Data
    
    const setEditState = (scrapID, scrapName, scrapSize, scrapCost, scrapQuantity, scrapWeight, scrapDate, scrapCategory, scrapImage) => {
        setScrapID(scrapID);
        setScrapName(scrapName);
        setScrapSize(scrapSize);
        setScrapCost(scrapCost);
        setScrapQuantity(scrapQuantity);
        setScrapWeight(scrapWeight);
        setScrapFinalDate(scrapDate);
        setTemporaryCategory(scrapCategory);
        setScrapImage(scrapImage);

        console.log(JSON.stringify(editedScrapDataForm));
    }

    const submitScrapEdit = () => {
        console.log("pre-post: " + editedScrapDataForm.scrapID);
        fetch("https://sseoll.com/scrapDataEdit.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify(editedScrapDataForm),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            getScrapData();
            console.log("edit result: " + data);
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Delete Scrap Data

    const scrapDeleteForm = {
        scrapID: parseInt(scrapID)
    }

    const deleteScrapData = () => {
        console.log("pre-post delete: " + editedScrapDataForm.scrapID);
        fetch("https://sseoll.com/scrapDataDelete.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify(scrapDeleteForm),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            getScrapData();
            console.log("delete result: " + data);
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Add Scrap Category

    const addCategory = () => {
        fetch("https://sseoll.com/scrapCategoryWrite.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(tempCatData),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log("data: " + data);
            if(data === "101") {
                console.log("Result: Category already exists!");
            } else {
                getScrapCategories();
                getScrapData();
            }
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Edit Scrap Category

    const categoryEditForm = {
        categoryID: categoryID,
        categoryTitle: tempCategory,
    }

    const editCategory = () => {
        fetch("https://sseoll.com/scrapCategoryEdit.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(categoryEditForm),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log("test: " + data);
            getScrapCategories();
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Delete Scrap Category

    // const categoryDeleteForm = {
    //     categoryID: categoryID
    // }

    const deleteScrapCategory = (categorydata) => {
        console.log("im executed!");
        console.log("pre-post delete: " + categorydata);

        const categoryData = {
            categoryID: categorydata
        }

        fetch("https://sseoll.com/scrapCategoryDelete.php", {
            method: 'POST',
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify(categoryData),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log("delete result: " + data);
            getScrapCategories();
            getScrapData();
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Set Sample Scrap Data
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#EFEFEF'}}>
                <LinearGradient
                    colors={["#F4F5F4", "#A0B5A6"]}
                    style={{
                        flex: 1,
                        paddingTop: 20,
                    }}
                    start={{ x: 0, y: 0.2 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => { navigation.goBack();}}>
                                <Ionicons name="arrow-back" size={24} color="#3E5A47" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Scrap Categories</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addCategoryButton}
                            onPress={() => {openAddHandler();}}
                        >
                            <Entypo name="plus" size={24} color="#F4F5F4" />
                            <Text style={styles.addCategoryText}>Add Category</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView>
                            {
                                category !== null ? (
                                    category.map(categories => {
                                        return (
                                            <View key={categories.categoryID}>
                                                <View style={styles.categoryHeader}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text style={styles.categoryTitle}>{ categories.categoryTitle }</Text>
                                                        <TouchableOpacity onPress={() => {openEditCategoryHandler(); setCategoryID(categories.categoryID); setTempCategory(categories.categoryTitle);}}>
                                                            <Image style={{width: 16, height: 15,}} source={require("../assets/img/pencil.png")}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity onPress={() => {confirmDeleteDialog(categories.categoryID, categories.categoryTitle);}}>
                                                            <Octicons name="trash" size={24} color="#3E5A47" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <ScrollView
                                                        horizontal={true}
                                                        contentContainerStyle={{paddingLeft: 20, paddingRight: 40}}
                                                        showsHorizontalScrollIndicator={false}
                                                    >
                                                        <TouchableOpacity
                                                            style={{
                                                                alignItems: 'center',
                                                                backgroundColor: "#FFFFFF",
                                                                borderRadius: 10,
                                                                justifyContent: 'center',
                                                                padding: 10,
                                                                width: 160,
                                                                height: 230,
                                                                marginLeft: 30,
                                                            }}
                                                            onPress={() => {openAddScrapHandler(); setTemporaryCategory(categories.categoryTitle)}}
                                                        >
                                                            <Feather name="plus" size={28} color="#3E5A47"/>
                                                        </TouchableOpacity>
                                                        {
                                                            data !== null ? (
                                                                data.map(scrapdata => {
                                                                    if(categories.categoryTitle === scrapdata.scrapCategory) {
                                                                        return (
                                                                            <View style={{
                                                                                backgroundColor: "#FFFFFF",
                                                                                borderRadius: 10,
                                                                                padding: 10,
                                                                                width: 160,
                                                                                height: 230,
                                                                                marginLeft: 30,
                                                                            }} key={scrapdata.scrapID}>
                                                                                {
                                                                                    scrapdata.scrapImage !== "" ? (
                                                                                        <Image style={{
                                                                                            width: "100%",
                                                                                            height: 70,
                                                                                            borderRadius: 8,
                                                                                            marginBottom: 5,
                                                                                        }} source={{uri: scrapdata.scrapImage}}></Image>
                                                                                    ) : (
                                                                                        <Image style={{
                                                                                            width: "100%",
                                                                                            height: 70,
                                                                                            borderRadius: 8,
                                                                                            marginBottom: 5,
                                                                                        }} source={require("../assets/img/placeholder.png")}></Image>
                                                                                    )
                                                                                }
                                                                                <Text style={styles.categoryScrap}>{scrapdata.scrapName}</Text>
                                                                                <View style={styles.categoryContent}>
                                                                                        <Text style={styles.categoryLabel}>Size: </Text>
                                                                                    <Text style={styles.categoryText}>{scrapdata.scrapSize}</Text>
                                                                                </View>
                                                                                <View style={styles.categoryContent}>
                                                                                    <Text style={styles.categoryLabel}>Cost: </Text>
                                                                                    <Text style={styles.categoryText}>{scrapdata.scrapCost}</Text>
                                                                                </View>
                                                                                <View style={styles.categoryContent}>
                                                                                    <Text style={styles.categoryLabel}>Weight: </Text>
                                                                                    <Text style={styles.categoryText}>{scrapdata.scrapWeight} kg </Text>
                                                                                </View>
                                                                                <View style={styles.categoryContent}>
                                                                                    <Text style={styles.categoryLabel}>Quantity: </Text>
                                                                                    <Text style={styles.categoryText}>{scrapdata.scrapQuantity} pieces </Text>
                                                                                </View>
                                                                                <TouchableOpacity style={styles.categoryEdit} onPress={() => {setEditState(scrapdata.scrapID, scrapdata.scrapName, scrapdata.scrapSize, scrapdata.scrapCost, scrapdata.scrapQuantity, scrapdata.scrapWeight, scrapdata.scrapAddDate, scrapdata.scrapCategory, scrapdata.scrapImage); openEditHandler();}}>
                                                                                    <Image style={{width: 16, height: 15,}}source={require("../assets/img/pencil.png")}></Image>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        )
                                                                    }
                                                                })
                                                            ) : (
                                                                <View></View>
                                                            )
                                                        } 
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        )
                                    })
                                ) : (
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{
                                            color: '#3E5A47',
                                            fontFamily: 'Inter-SemiBold',
                                            fontSize: 18,
                                            marginTop: 50,
                                            textAlign: 'center',
                                            width: 300
                                        }}>You can add a new data by selecting the "Add Category" button above me!</Text>
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                    <ScrapAddModal activeHeight={Height * 35 / 100} ref={addModalRef} backgroundColor={'white'} backDropColor={'black'}>
                        <Text style={{
                            color: '#3E5A47',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                            textAlign: 'center',
                            marginTop: 10,
                        }}>Add Category</Text>
                        <View style={{alignItems: 'center'}}>
                            <TextInput
                                value={tempCategory}
                                onChangeText={tempCategory => { setTempCategory(tempCategory); }}
                                placeholder="Scrap Type"
                                style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 16,
                                    textAlign: 'center',
                                    width: 320,
                                    paddingBottom: 10,
                                    borderBottomWidth: 0.7,
                                    borderBottomColor: '#3E5A47',
                                    marginTop: 25,
                                }}
                            />
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 50,
                        }}>
                            <TouchableOpacity style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: '#3E5A47',
                                width: 100,
                                height: 39
                            }} onPress={() => {closeAddHandler();}}>
                                <Text style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 20,
                                    color: '#3E5A47'
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#3E5A47',
                                borderRadius: 16,
                                width: 82,
                                height: 39
                            }} onPress={() => {addCategory(); closeAddHandler(); showConfirmDialog();}}>
                            <Text style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 20,
                                    color: '#F4F5F4'
                                }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrapAddModal>
                    <ScrapAddModal activeHeight={Height * 35 / 100} ref={editCategoryModalRef} backgroundColor={'white'} backDropColor={'black'}>
                        <Text style={{
                            color: '#3E5A47',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                            textAlign: 'center',
                            marginTop: 10,
                        }}>Edit Category</Text>
                        <View style={{alignItems: 'center'}}>
                            <TextInput
                                value={tempCategory}
                                onChangeText={tempCategory => { setTempCategory(tempCategory); }}
                                placeholder="Scrap Type"
                                style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 16,
                                    textAlign: 'center',
                                    width: 320,
                                    paddingBottom: 10,
                                    borderBottomWidth: 0.7,
                                    borderBottomColor: '#3E5A47',
                                    marginTop: 25,
                                }}
                            />
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 50,
                        }}>
                            <TouchableOpacity style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: '#3E5A47',
                                width: 100,
                                height: 39
                            }} onPress={() => {closeEditCategoryHandler();}}>
                                <Text style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 20,
                                    color: '#3E5A47'
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#3E5A47',
                                borderRadius: 16,
                                width: 82,
                                height: 39
                            }} onPress={() => {editCategory(); closeEditCategoryHandler(); editSuccessDialog();}}>
                            <Text style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 20,
                                    color: '#F4F5F4'
                                }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrapAddModal>
                    <ScrapAddModal activeHeight={Height > 728 ? (Height * 58 / 100) : (Height * 65 / 100)} ref={editModalRef} backgroundColor={'white'} backDropColor={'black'}>
                        <Text style={{
                                color: '#3E5A47',
                                fontFamily: 'Inter-SemiBold',
                                fontSize: 20,
                                textAlign: 'center',
                                marginTop: 10,
                            }}>Edit Entry</Text>
                            <View style={{alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                                    <TextInput
                                        value={scrapName}
                                        onChangeText={scrapname => { setScrapName(scrapname) }}
                                        placeholder="Item Name"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 50 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                    <TextInput
                                        value={scrapSize}
                                        onChangeText={size => { setScrapSize(size) }}
                                        placeholder="Size"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 20 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                                    <TextInput
                                        value={scrapCost}
                                        onChangeText={scrapcost => { setScrapCost(scrapcost) }}
                                        placeholder="Cost / kg"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 50 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                    <TextInput
                                        value={scrapQuantity}
                                        onChangeText={scrapquantity => { setScrapQuantity(scrapquantity) }}
                                        placeholder="Quantity"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 20 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                </View>
                                <TextInput
                                    value={scrapWeight}
                                    keyboardType = 'number-pad'
                                    onChangeText={scrapweight => { setScrapWeight(scrapweight) }}
                                    placeholder="Accumulated Weight in kg"
                                    style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        width: Width * 50 / 100,
                                        paddingBottom: 10,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: '#3E5A47',
                                        marginTop: 25,
                                        textAlign: 'center',
                                    }}
                                />
                            </View>
                            <View style={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 40,
                                marginRight: 40,
                                marginTop: 50,
                            }}>
                                {showPicker && (
                                    <DateTimePicker
                                        mode="date"
                                        display="calendar"
                                        value={scrapAddDate}
                                        onChange={onChange}
                                    />
                                )}
                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10}} onPress={pickImage}>
                                    {
                                        hasImage === true ? (
                                            <>
                                                <Text style={{
                                                    color: '#3E5A47',
                                                    fontFamily: 'Inter-SemiBold',
                                                    fontSize: 18,
                                                }}>Image Uploaded</Text>
                                                <AntDesign name="checkcircle" size={24} color="#3E5A47" />
                                            </>
                                        ) : (
                                            <>
                                                <MaterialCommunityIcons name="file-image-plus-outline" size={32} color="#3E5A47" />
                                                <Text style={{fontFamily: 'Inter-Regular', fontSize: 18, textDecorationLine: 'underline', color: '#3E5A47'}}>Upload Image</Text>
                                            </>
                                        )
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {toggleDatePicker();}}>
                                    <MaterialCommunityIcons name="calendar-plus" size={34} color="#3E5A47" />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 40,
                            }}>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: '#3E5A47',
                                    width: 100,
                                    height: 39
                                }} onPress={() => {closeEditHandler(); deleteScrapData();}}>
                                    <Text style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 20,
                                        color: '#3E5A47'
                                    }}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#3E5A47',
                                    borderRadius: 16,
                                    width: 82,
                                    height: 39
                                }} onPress={() => {closeEditHandler(); submitScrapEdit(); uploadImage(); clearForm();}}>
                                <Text style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 20,
                                        color: '#F4F5F4'
                                    }}>Save</Text>
                                </TouchableOpacity>
                        </View>
                    </ScrapAddModal>

                    {/* Height > 728 ? (Height * 55 / 100) : (Height * 65 / 100) */}
                    {/* <KeyboardAvoidingView
                        behavior='height'
                    > */}
                        <ScrapAddModal activeHeight={Height > 728 ? (Height * 55 / 100) : (Height * 65 / 100)} ref={addScrapModalRef} backgroundColor={'white'} backDropColor={'black'}>
                            <Text style={{
                                color: '#3E5A47',
                                fontFamily: 'Inter-SemiBold',
                                fontSize: 20,
                                textAlign: 'center',
                                marginTop: 10,
                            }}>Add Entry</Text>
                            <View style={{alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                                    <TextInput
                                        value={scrapName}
                                        onChangeText={scrapname => { setScrapName(scrapname) }}
                                        placeholder="Item Name"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 50 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                    <TextInput
                                        value={scrapSize}
                                        onChangeText={size => { setScrapSize(size) }}
                                        placeholder="Size"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 20 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                                    <TextInput
                                        value={scrapCost}
                                        onChangeText={scrapcost => { setScrapCost(scrapcost) }}
                                        placeholder="Cost / kg"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 50 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                    <TextInput
                                        value={scrapQuantity}
                                        onChangeText={scrapquantity => { setScrapQuantity(scrapquantity) }}
                                        placeholder="Quantity"
                                        style={{
                                            fontFamily: 'Inter-Regular',
                                            fontSize: 16,
                                            textAlign: 'center',
                                            width: Width * 20 / 100,
                                            paddingBottom: 10,
                                            borderBottomWidth: 0.7,
                                            borderBottomColor: '#3E5A47',
                                            marginTop: 25,
                                            textAlign: 'left',
                                        }}
                                    />
                                </View>
                                <TextInput
                                    value={scrapWeight}
                                    keyboardType = 'number-pad'
                                    onChangeText={scrapweight => { setScrapWeight(scrapweight) }}
                                    placeholder="Accumulated Weight in kg"
                                    style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        width: Width * 50 / 100,
                                        paddingBottom: 10,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: '#3E5A47',
                                        marginTop: 25,
                                        textAlign: 'center',
                                    }}
                                />
                            </View>
                            <View style={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 40,
                                marginRight: 40,
                                marginTop: 50,
                            }}>
                                {showPicker && (
                                    <DateTimePicker
                                        mode="date"
                                        display="calendar"
                                        value={scrapAddDate}
                                        onChange={onChange}
                                    />
                                )}
                                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10}} onPress={pickImage}>
                                    {
                                        hasImage === true ? (
                                            <>
                                                <Text style={{
                                                    color: '#3E5A47',
                                                    fontFamily: 'Inter-SemiBold',
                                                    fontSize: 18,
                                                }}>Image Uploaded</Text>
                                                <AntDesign name="checkcircle" size={24} color="#3E5A47" />
                                            </>
                                        ) : (
                                            <>
                                                <MaterialCommunityIcons name="file-image-plus-outline" size={32} color="#3E5A47" />
                                                <Text style={{fontFamily: 'Inter-Regular', fontSize: 18, textDecorationLine: 'underline', color: '#3E5A47'}}>Upload Image</Text>
                                            </>
                                        )
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {toggleDatePicker();}}>
                                    <MaterialCommunityIcons name="calendar-plus" size={34} color="#3E5A47" />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 30,
                                marginRight: 30,
                                marginTop: 40,
                            }}>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 16,
                                    borderWidth: 1,
                                    borderColor: '#3E5A47',
                                    width: 100,
                                    height: 39
                                }} onPress={() => {closeAddScrapHandler();}}>
                                    <Text style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 20,
                                        color: '#3E5A47'
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#3E5A47',
                                    borderRadius: 16,
                                    width: 82,
                                    height: 39
                                }} onPress={() => {closeAddScrapHandler(); submitScrapData(); uploadImage(); clearForm();}}>
                                <Text style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 20,
                                        color: '#F4F5F4'
                                    }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrapAddModal>
                    {/* </KeyboardAvoidingView> */}
                </LinearGradient>
                
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginLeft: 25,
        marginRight: 25,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    headerTitle: {
        color: "#3E5A47",
        fontFamily: "Inter-SemiBold",
        fontSize: 36,
        width: 200,
        textAlign: "right",
    },
    searchButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderColor: "#3E5A47",
        borderWidth: 1,
        padding: 5,
        width: 40,
    },
    addCategoryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3E5A47",
        borderRadius: 8,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    addCategoryText: {
        color: "#F4F5F4",
        fontFamily: "Inter-Medium",
        fontSize: 12,
    },
    bodyContainer: {
        flex: 1,
        paddingBottom: 30
    },
    categoryHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 25,
        marginBottom: 20,
        marginTop: 20,
    },
    categoryTitle: {
        fontFamily: "Inter-Bold",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3E5A47',
        marginLeft: 25,
        marginRight: 8,
        fontStyle: 'italic',
        textDecorationLine: "underline",
    },
    categoryContent: {
        flexDirection: 'row',
    },
    categoryScrap: {
        color: '#3E5A47',
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    categoryLabel: {
        width: '45%',
        color: '#3E5A47',
        fontFamily: 'Inter-Regular',
        fontSize: 12,
    },
    categoryText: {
        width: '50%',
        color: '#3E5A47',
        fontFamily: 'Inter-Regular',
        fontWeight: 'bold',
        fontSize: 12,
    },
    categoryEdit: {
        position: 'absolute',
        right: 12,
        bottom: 12,
    }

})

export default ScrapCat;

