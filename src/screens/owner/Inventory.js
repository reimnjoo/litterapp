// Main Component Imports

import React, {
    Component, useEffect, useState
} from 'react'

import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    BackHandler,
    ImageBackground,
    SafeAreaView,
    ScrollView
} from 'react-native'

// Icon Component Imports

import { 
    Ionicons, 
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';

const Inventory = ({ navigation }) => {

    // Back Button + Back-Device Handler

    React.useEffect(() => {
        function handleBackButton() {
            navigation.goBack();
        return true;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();
    }, [navigation]);


    //* Fetch Inventory Data

    const [inventoryData, setInventoryData] = useState([]);

    const getInventoryData = () => {
        return (
            fetch("https://sseoll.com/scrapInventory.php")
            .then(data => {
                return data.json();
            })
            .then(scrapData => {
                console.log(scrapData);
                setInventoryData(scrapData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    useEffect(() => {
        getInventoryData();
    }, [])
    // Main Inventory Component

    return (
        <View>
            <SafeAreaView>
                <ScrollView>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
                    <TouchableOpacity onPress={() => { navigation.goBack();}}>
                        <Ionicons name="arrow-back" size={24} color="#3E5A47"/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 36, color: '#3E5A47'}}>Inventory</Text>
                    </View>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 30
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: 325,
                            }}>
                            <View style={{
                                alignItems: 'center',
                                borderLeftWidth: 1,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                width: '40%',
                                paddingBottom: 50
                            }}>
                                <Text style={{
                                    color: '#3E5A47',
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 12,
                                    marginTop: 20
                                }}>Types</Text>
                                {
                                    inventoryData !== null ? (
                                        inventoryData.map((inventory) => {
                                            return (
                                                <View style={{alignItems: 'center', height: 50, marginTop: 40}}>
                                                    <Image style={{width: 40, height: 40}} source={require("../assets/img/default_inventory_icon.png")}/>
                                                    <Text style={{
                                                        color: '#3E5A47',
                                                        fontFamily: 'Inter-Bold',
                                                        fontSize: 12,
                                                        textAlign: 'center',
                                                        width: 90,
                                                        marginTop: 2,
                                                    }}>{inventory.scrapCategory}</Text>
                                                </View>
                                            )
                                        })
                                    ) : (
                                        <Text style={{
                                            color: '#3E5A47',
                                            fontFamily: 'Inter-SemiBold',
                                            fontSize: 32,
                                            height: 50,
                                            marginTop: 40
                                        }}> - </Text>
                                    )
                                }
                            </View>
                            <View style={{
                                width: '60%',
                                paddingBottom: 50
                            }}>
                                <ImageBackground source={require("../assets/img/inventory_radial_bg.png")} style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                }}
                                imageStyle={{
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            color: '#F4F5F4',
                                            fontFamily: 'Inter-Medium',
                                            fontSize: 12,
                                            marginTop: 20
                                        }}>Total Weight (kg)</Text>
                                        {
                                            inventoryData !== null ? (
                                                inventoryData.map((inventory) => {
                                                    return (
                                                        <Text style={{
                                                            color: '#F4F5F4',
                                                            fontFamily: 'Inter-SemiBold',
                                                            fontSize: 32,
                                                            height: 50,
                                                            marginTop: 40
                                                        }}>{inventory.totalWeight}</Text>
                                                    )
                                                })
                                            ) : (
                                                <Text style={{
                                                    color: '#F4F5F4',
                                                    fontFamily: 'Inter-SemiBold',
                                                    fontSize: 32,
                                                    height: 50,
                                                    marginTop: 40
                                                }}> - </Text>
                                            )
                                        }
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

// Inventory Component Stylesheet

const styles = StyleSheet.create({
    table: {
        borderWidth: 1.2,
        borderRadius: 10,
    },
    tableHeader: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#DCDCDC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
    },
    tableContent: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#DCDCDC',
        borderBottomWidth: 1.2
    },
    tableContentLast: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#DCDCDC',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
});

export default Inventory
