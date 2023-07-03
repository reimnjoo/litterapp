import React, {
    Component, useState, useEffect
} from 'react'

import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    BackHandler,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native'

import { 
    Ionicons, 
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';



const ReportALS = ({ navigation }) => {

    //* Device Dimension

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    //* Back Button + Back-Device Handler

    React.useEffect(() => {
        function handleBackButton() {
            navigation.goBack();
        return true;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();
    }, [navigation]);

    //*Tab List 

    const tabList = [
        { status: 'Today', statusID: 1 },
        { status: 'This Week', statusID: 2},
    ];

    //* Tab State

    const [status, setStatus] = useState("Today");
    const setStatusFilter = status => {
        setStatus(status);
    }

    //* Weekdays Data

    const weekdays = [
        { id: 1, day: 'Sunday'},
        { id: 2, day: 'Monday'}, 
        { id: 3, day: 'Tuesday'}, 
        { id: 4, day: 'Wednesday'}, 
        { id: 5, day: 'Thursday'}, 
        { id: 6, day: 'Friday'}, 
        { id: 7, day: 'Saturday'},  
    ]

    const months = [
        { id: '01', month: 'January'},
        { id: '02', month: 'February'}, 
        { id: '03', month: 'March'}, 
        { id: '04', month: 'April'}, 
        { id: '05', month: 'May'}, 
        { id: '06', month: 'June'}, 
        { id: '07', month: 'July'},
        { id: '08', month: 'August'},
        { id: '09', month: 'September'},
        { id: '10', month: 'October'},
        { id: '11', month: 'November'},
        { id: '12', month: 'December'},  
    ]

    const TodaysReport = () => {
        return (
            <View style={styles.reportContainer}>
                {
                    currentData !== null ? (
                        currentData.map((report) => {
                            return (
                                <View style={styles.reportContent} key={report.scrapID}>
                                    <Text style={styles.reportItem}>{report.scrapCategory}</Text>
                                    <Text style={styles.reportWeight}>{report.totalWeight} kg</Text>
                                </View>
                            )
                            })
                    ) : (
                        <Text style={styles.reportItem}> (There are no current data for today yet!) </Text>
                    )
                }
            </View>
        )
    }

    const WeekReport = () => {
        return (
            <View style={styles.reportContainer}>
                {
                    weekData !== null ? (
                        weekData.map((report) => {
                            return (
                                <View style={styles.reportContent} key={report.scrapID}>
                                    <Text style={styles.reportItem}>{
                                       report.scrapAddDate.slice(5, 7) === months[Number(report.scrapAddDate.slice(6, 7) - 1)].id ? (
                                            <Text>{months[Number(report.scrapAddDate.slice(6, 7) - 1)].month}</Text>
                                        ) : (
                                            <Text>No Data</Text>
                                        )
                                    }, {report.scrapAddDate.slice(8, 10)}</Text>
                                    <Text style={styles.reportWeight}>{report.totalWeight} kg</Text>
                                </View>
                            )
                        })
                    ) : (
                        <Text style={styles.reportItem}> (There are no current data for this week yet!) </Text>
                    )
                }
            </View>
        )
    }

    //* Fetch Total Overall Weight of the Scraps

    const [totalScrapWeight, setTotalScrapWeight] = useState([]);
    
    const getOverallWeight = () => {
        return (
            fetch("https://sseoll.com/scrapWeightData.php")
            .then(data => {
                return data.json();
            })
            .then(scrapData => {
                console.log(scrapData);
                setTotalScrapWeight(scrapData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    //* Fetch Total Buyers

    const [totalBuyer, setTotalBuyer] = useState([]);

    const getTotalBuyers = () => {
        return (
            fetch("https://sseoll.com/buyerData.php")
            .then(data => {
                return data.json();
            })
            .then(buyerData => {
                setTotalBuyer(buyerData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    //* Fetch Total Scrap per Category of the Current Day

    const [currentData, setCurrentData] = useState([]);

    const getCurrentData = () => {
        return (
            fetch("https://sseoll.com/currentAnalytics.php")
            .then(data => {
                return data.json();
            })
            .then(scrapData => {
                setCurrentData(scrapData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    //* Fetch Total Scrap per Category of the Current Week

    const [weekData, setWeekData] = useState([]);

    const getWeekData = () => {
        return (
            fetch("https://sseoll.com/weekAnalytics.php")
            .then(data => {
                return data.json();
            })
            .then(scrapData => {
                console.log(scrapData);
                setWeekData(scrapData);
            })
            .catch(err => {
                console.log(err);
            }) 
            )
    }

    useEffect(() => {
        getOverallWeight();
        getTotalBuyers();
        getCurrentData();
        getWeekData();
    }, []);

    return (
        <View style={{flex: 1}}>
            <ImageBackground style={styles.background} source={require("../assets/img/sbg1.png")}></ImageBackground>
            <View style={styles.navbarContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack();}}>
                        <Ionicons name="arrow-back" size={24} color="#3E5A47" />
                    </TouchableOpacity>
                <Text style={styles.sectionTitle}>Reports & Analytics</Text>
            </View>
            <View style={styles.topStats}>
                <View style={styles.totalWeight}>
                    <Text style={styles.totalWeightText}>Total Weight (kg)</Text>
                    <Image style={styles.icons} source={require("../assets/img/package.png")}></Image>
                    {
                        totalScrapWeight !== "" ? (
                            totalScrapWeight.map(totaldata => {
                                return (
                                    <Text style={styles.totalWeightCount}>{totaldata.totalScrapWeight}</Text>
                                )
                            })
                        ) : (
                            <Text style={styles.totalWeightCount}>0</Text>
                        )
                    }
                </View>
                <View style={styles.totalBuyer}>
                    <Text style={styles.totalBuyerText}>Buyers</Text>
                    <Image style={styles.icons} source={require("../assets/img/buyerIcon1.png")}></Image>
                    {
                        totalBuyer !== null ? (
                            totalBuyer.map(totaldata => {
                                return (
                                    <Text style={styles.totalBuyerCount}>{totaldata.totalBuyer}</Text>
                                )
                            })
                        ) : (
                            <Text style={styles.totalBuyerCount}> - </Text>
                        )
                    }
                </View>
            </View>
            <View style={styles.tablistContainer}>
                {
                    tabList.map((tab) => {
                        return (
                            <View style={styles.tabs}>
                                <TouchableOpacity style={[styles.tab, status === tab.status && styles.tabActive]} onPress={() => {setStatusFilter(tab.status)}} key={tab.statusID}>
                                    <Text style={[styles.tabText, status === tab.status && styles.tabtextActive]}>{tab.status}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                </View>
            <View
                style={{
                borderBottomColor: "#3E5A47",
                borderBottomWidth: 0.42,
                width: "100%",
                marginTop: 20
                }}
            />
            <ScrollView>
                <View>
                    {
                        status === "Today" ? (
                            <TodaysReport></TodaysReport>
                        ) : (
                            <WeekReport></WeekReport>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 20, 
        paddingLeft: 25, 
        paddingRight: 25
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    sectionTitle: {
        fontFamily: 'Inter-SemiBold', 
        fontSize: 36, 
        width: 172, 
        textAlign: 'right', 
        color: '#3E5A47'
    },
    icon: {
        width: 40,
        height: 40,
    },
    topStats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    totalWeight: {
        backgroundColor: '#3E5A47',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 157,
        height: 164,
    },
    totalWeightText: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: '#F4F5F4',
        marginBottom: 20
    },
    totalWeightCount: {
        fontFamily: 'Inter-Bold',
        fontSize: 32,
        color: '#F4F5F4',
        marginTop: 5
    },
    totalBuyer: {
        backgroundColor: '#3E5A47',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        width: 157,
        height: 164,
    },
    totalBuyerText: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: '#F4F5F4',
        marginBottom: 20
    },
    totalBuyerCount: {
        fontFamily: 'Inter-Bold',
        fontSize: 32,
        color: '#F4F5F4',
        marginTop: 5
    },
    tablistContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 106,
        height: 35,
        marginTop: 20
    },
    tabActive: {
        backgroundColor: '#3E5A47',
        borderRadius: 36,
        width: 106,
        height: 35,
        zIndex: 2,
        elevation: 2,
    },
    tabText: {
        fontFamily: 'Inter-Bold',
        fontSize: 15,
        color: '#627D6B',
    },
    tabtextActive: {
        fontFamily: 'Inter-Bold',
        fontSize: 15,
        color: '#F4F5F4',
    },
    reportContainer: {
        padding: 20,
        flex: 1
    },
    reportItem: {
        color: '#627D6B',
        fontFamily: 'Inter-Regular',
        fontStyle: 'italic',
        fontSize: 17,
        marginTop: 10
    },
    reportWeight: {
        color: '#627D6B',
        fontFamily: 'Inter-Bold',
        fontSize: 20,
    }
});

export default ReportALS

