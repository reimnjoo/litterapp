import React, {
    Component, useState
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

    // Device Dimension

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    // Back Button + Back-Device Handler

    React.useEffect(() => {
        function handleBackButton() {
            navigation.goBack();
        return true;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => backHandler.remove();
    }, [navigation]);

    // Tab List 

    const tabList = [
        { status: 'Today', statusID: 1 },
        { status: 'This Week', statusID: 2},
    ];

    // Tab State

    const [status, setStatus] = useState("This Week");
    const setStatusFilter = status => {
        setStatus(status);
    }

    // Today Tab Handler

    const todayReport = [
        { id: 1, item: 'Plastic', weight: 5, unit: 'kg' },
        { id: 2, item: 'Paper/Cardboard', weight: 3, unit: 'kg' },
        { id: 3, item: 'Metal', weight: 12, unit: 'kg' },
        { id: 4, item: 'Glass', weight: 7, unit: 'kg' },
        { id: 5, item: 'Electronic Waste', weight: 2, unit: 'kg' },
        { id: 6, item: 'Textile', weight: 2, unit: 'kg' },
        { id: 7, item: 'Textile', weight: 2, unit: 'kg' },
        { id: 8, item: 'Textile', weight: 2, unit: 'kg' },
        { id: 9, item: 'Textile', weight: 2, unit: 'kg' },
    ]

    const weekReport = [
        { id: 1, day: 'Sunday', month: 'May', md: 7, weight: 31, unit: 'kg'},
        { id: 2, day: 'Monday', month: 'May', md: 8, weight: 42, unit: 'kg'}, 
        { id: 3, day: 'Tuesday', month: 'May', md: 9, weight: 11, unit: 'kg'}, 
        { id: 4, day: 'Wednesday', month: 'May', md: 10, weight: 30, unit: 'kg'}, 
        { id: 5, day: 'Thursday', month: 'May', md: 11, weight: 27, unit: 'kg'}, 
        { id: 6, day: 'Friday', month: 'May', md: 12, weight: 17, unit: 'kg'}, 
        { id: 7, day: 'Saturday', month: 'May', md: 13, weight: 28, unit: 'kg'},  
    ]

    const TodaysReport = () => {
        return (
            <View style={styles.reportContainer}>
                {
                    todayReport.map((report) => {
                        return (
                            <View style={styles.reportContent} key={report.id}>
                                <Text style={styles.reportItem}>{report.item}</Text>
                                <Text style={styles.reportWeight}>{report.weight} {report.unit}</Text>
                            </View>
                        )
                        })
                }
            </View>
        )
    }

    const WeekReport = () => {
        return (
            <View style={styles.reportContainer}>
                {
                    weekReport.map((report) => {
                        return (
                            <View style={styles.reportContent} key={report.id}>
                                <Text style={styles.reportItem}>{report.day}, {report.month} {report.md}</Text>
                                <Text style={styles.reportWeight}>{report.weight} {report.unit}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

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
                    <Text style={styles.totalWeightCount}>209</Text>
                </View>
                <View style={styles.totalBuyer}>
                    <Text style={styles.totalBuyerText}>Buyers</Text>
                    <Image style={styles.icons} source={require("../assets/img/buyerIcon1.png")}></Image>
                    <Text style={styles.totalBuyerCount}>19</Text>
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
        marginTop: 60, 
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
        justifyContent: 'space-evenly',
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

