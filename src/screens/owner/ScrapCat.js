// Component Imports

import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, useWindowDimensions, ScrollView, TextInput, Image, SectionList, BackHandler, FlatList, Alert } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";

// Icon Imports

import {
    FontAwesome,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Ionicons,
    AntDesign,
    Feather,
} from "@expo/vector-icons";

// Custom Modal Component 

import ScrapAddModal from "./ScrapAddModal";
import { makeStyles } from '@rneui/base';

const ScrapCat = ({ navigation }) => {

    // Get Device Height

    const {height} = useWindowDimensions();

    // Modal Reference Point

    const addModalRef = useRef(null);
    const editModalRef = useRef(null);
    const addScrapModalRef = useRef(null);

    // Modal Handlers

    const openAddHandler = useCallback(() => {
        addModalRef.current.expand()
    }, []);

    const closeAddHandler = useCallback(() => {
        addModalRef.current.close()
    }, []);

    const openEditHandler = useCallback(() => {
        editModalRef.current.expand()
    }, []);

    const closeEditHandler = useCallback(() => {
        editModalRef.current.close()
    }, []);

    const openAddScrapHandler = useCallback(() => {
        addScrapModalRef.current.expand()
    }, []);

    const closeAddScrapHandler = useCallback(() => {
        addScrapModalRef.current.close()
    }, []);

    //  const [scrapImage, setScrapImage] = useState(null); for later use
  
    const [scrapName, setScrapName] = useState("");
    const [itemize, setitemize] = useState("");
    const [scrapCost, setScrapCost] = useState("");
    const [scrapQuantity, setScrapQuantity] = useState("");
    const [scrapAddDate, setScrapAddDate] = useState("");
    const [scrapCategory, setScrapCategory] = useState("");
    const [categoryCount, setCategoryCount] = useState("");
 
    // state
    // array map (from database)
    // array-length
    // mapped array data (state) // onpress
    // mapped array data onpress state -> php -> database update/delete

    // Back Button + Back-Device Handler

    const [showBox, setShowBox] = useState(true);

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


    function handleBackButton() {
        navigation.goBack();
        return true;
    }

    React.useEffect(() => {

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();

    }, []);


    // Fetch Scrap Data

    const [data, setData] = useState([]);
    const [tempCategory, setTempCategory] = useState("");
    const [category, setCategoryData] = useState([]);

    // Category Temporary Data

    const tempCatData = {
        category: tempCategory,
    }
    

    // Scrap Count 

    const scrapCount = Object.keys(data).length;

    console.log("Scrap Count: " + scrapCount);

    // Group Fetched Data

    // const scrapCategoriesData = data.reduce((categoryData, item) => {
    //     if(categoryData.find(i => i.scrapCategory == item.scrapCategory)) {
    //         return categoryData.map(i => i.scrapCategory == item.scrapCategory ? {...i, data: [...i.data, item]} : i)
    //     } else {
    //         return [...categoryData, { scrapCategory: item.scrapCategory, data: [item]}]
    //     }
    // }, []);

    // Fetch Scrap Categories Data

    const getScrapCategories = () => {
        return (
            fetch("https://sseoll.com/scrapCategoryRead.php")
            .then(data => {
                return data.json();
            })
            .then(scrapCategory => {
                console.log(scrapCategory);
                setCategoryData(scrapCategory);
            })
            .catch(err => {
                console.log(err);
            }) 
        )
    }

    useEffect(() => {
        getScrapCategories();
    }, [])
    

    // Write Scrap Categories Data

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
            console.log("test: " + data);
            getScrapCategories();
        }).catch(err => {
            console.log(err);
        }) 
    }

    // Fetch Scrap Data

    useEffect(() => {
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
    }, [])

    // console.log('scrapdata: ' + data);
    // console.log('scrapcategory: ' + categorySample);

    // console.log(typeof data);
    
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#EFEFEF'}}>
                <LinearGradient
                    colors={["#F4F5F4", "#A0B5A6"]}
                    style={{
                        flex: 1,
                        paddingTop: 60,
                    }}
                    start={{ x: 0, y: 0.2 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity style={styles.searchButton}>
                                <FontAwesome name="search" size={24} color="#3E5A47" />
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
                                category.map(categories => {
                                    return (
                                        <View>
                                            <View style={styles.categoryHeader}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text style={styles.categoryTitle}>{ categories.categoryTitle }</Text>
                                                    <TouchableOpacity>
                                                        <Image style={{width: 16, height: 15,}} source={require("../assets/img/pencil.png")}/>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity>
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
                                                        onPress={() => {openAddScrapHandler();}}
                                                    >
                                                        <Feather name="plus" size={28} color="#3E5A47"/>
                                                    </TouchableOpacity>
                                                    {
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
                                                                    }}>
                                                                        <Image style={{
                                                                                width: "100%",
                                                                                height: 70,
                                                                                borderRadius: 8,
                                                                                marginBottom: 5,
                                                                        }} source={require("../assets/img/placeholder.png")}></Image>
                                                                        <Text style={styles.categoryScrap}>{scrapdata.scrapName}</Text>
                                                                        <View style={styles.categoryContent}>
                                                                                <Text style={styles.categoryLabel}>Size: </Text>
                                                                            <Text style={styles.categoryText}>{scrapdata.scrapSize} {scrapdata.scrapSizeUnit}</Text>
                                                                        </View>
                                                                        <View style={styles.categoryContent}>
                                                                            <Text style={styles.categoryLabel}>Cost: </Text>
                                                                            <Text style={styles.categoryText}>{scrapdata.scrapCost} / {scrapdata.scrapWeightUnit}</Text>
                                                                        </View>
                                                                        <View style={styles.categoryContent}>
                                                                            <Text style={styles.categoryLabel}>Quantity: </Text>
                                                                            <Text style={styles.categoryText}>{scrapdata.scrapQuantity} pieces </Text>
                                                                        </View>
                                                                        <TouchableOpacity style={styles.categoryEdit} onPress={() => {openEditHandler();}}>
                                                                            <Image style={{width: 16, height: 15,}}source={require("../assets/img/pencil.png")}></Image>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            }
                                                        })
                                                    } 
                                                </ScrollView>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <ScrapAddModal activeHeight={height * 0.3} ref={addModalRef} backgroundColor={'white'} backDropColor={'black'}>
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
                    <ScrapAddModal activeHeight={height * 0.5} ref={editModalRef} backgroundColor={'white'} backDropColor={'black'}>
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
                                        width: 177,
                                        paddingBottom: 10,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: '#3E5A47',
                                        marginTop: 25,
                                        textAlign: 'left',
                                    }}
                                />
                                <TextInput
                                    value={itemize}
                                    onChangeText={itemize => { setitemize(itemize) }}
                                    placeholder="Size"
                                    style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        width: 116,
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
                                        width: 177,
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
                                        width: 116,
                                        paddingBottom: 10,
                                        borderBottomWidth: 0.7,
                                        borderBottomColor: '#3E5A47',
                                        marginTop: 25,
                                        textAlign: 'left',
                                    }}
                                />
                            </View>
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
                            }} onPress={() => {handleSubmitCategory(); setCategoryCount("set");}}>
                            <Text style={{
                                    fontFamily: 'Inter-Regular',
                                    fontSize: 20,
                                    color: '#F4F5F4'
                                }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrapAddModal>
                    <ScrapAddModal activeHeight={height * 0.5} ref={addScrapModalRef} backgroundColor={'white'} backDropColor={'black'}>
                        <Text style={{
                            color: '#3E5A47',
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                        }}>Add Entry</Text>
                    </ScrapAddModal>
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