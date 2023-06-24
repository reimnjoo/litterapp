import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../auth/context";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
} from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "@rneui/themed";

// Backend Logic

// Login/Reg === Success ? (Database) : (Login/Reg)
// Overview/Buyer === Login Success? (Retrieve Login from DB to Display Data) : (Login/Reg)

const OverviewBuyer = ({ navigation, route }) => {

  // User Token

  const { userToken } = route.params;

  console.log("usertoken post-login: " + userToken);

  //Auth Context

  const { signOut } = React.useContext(AuthContext);

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

  // State Hooks

  const [showBox, setShowBox] = useState(true);

  // Alert Handler (Device Back button logout handler)

  const showConfirmDialog = () => {
    return Alert.alert(
      "Do wish to log out?",
      "Changes will be automatically be updated!",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            signOut();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  // Try

  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);

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

  // Stacked Bar Data

  const data = [
    { x: "sun", y: 3 },
    { x: "mon", y: 4 },
    { x: "tue", y: 2 },
    { x: "wed", y: 3 },
    { x: "thu", y: 4 },
    { x: "fri", y: 2 },
    { x: "sat", y: 3 },
  ];

  // Stats Breakdown

  const breakdown = [
    {
      id: 1,
      mm: "May",
      dd: 7,
      day: "Sunday",
      totalWeight: 31,
    },
    {
      id: 2,
      mm: "May",
      dd: 8,
      day: "Monday",
      totalWeight: 42,
    },
    {
      id: 3,
      mm: "May",
      dd: 9,
      day: "Tuesday",
      totalWeight: 11,
    },
    {
      id: 4,
      mm: "May",
      dd: 10,
      day: "Wednesday",
      totalWeight: 30,
    },
    {
      id: 5,
      mm: "May",
      dd: 11,
      day: "Thursday",
      totalWeight: 27,
    },
    {
      id: 6,
      mm: "May",
      dd: 12,
      day: "Friday",
      totalWeight: 17,
    },
    {
      id: 7,
      mm: "May",
      dd: 13,
      day: "Saturday",
      totalWeight: 28,
    },
  ];

  // Chart Legend Data

  const legend = [
    {
        itemId: 1,
        material: "plastic",
        color: "#E9D985"
    },
    {
        itemId: 2,
        material: "metal",
        color: "#FF7961"
    },
    {
        itemId: 3,
        material: "textile",
        color: "#FFC7C7"
    }
  ]

  // Note: All data used for the bar chart are temporary.

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={["#F2F2F2", "#3E5A47"]}
          style={styles.gradientContainer}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.9 }}
        >
          <View style={styles.header}>
            <View style={styles.profileHeader}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => {navigation.navigate("BuyerProfile")}}>
                  {
                    hasImage === true ? 
                      (<Image style={styles.pfp} source={{uri: image}}></Image>) : 
                      (<Image style={styles.pfp} source={require('../assets/img/pfp.jpg')}></Image>)
                  }
                </TouchableOpacity>
                <Text style={styles.profileName}>Hey, Aladiah</Text>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  handleBackButtonClick();
                }}
              >
                <LinearGradient
                  colors={["#F4F5F4", "#97C5A6"]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0.2 }}
                  end={{ x: 0, y: 0.8 }}
                >
                  <Image
                    source={require("../assets/img/logout.png")}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              paddingLeft: 30,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 15,
                color: "#627D6B",
              }}
            >
              Stats: Breakdown
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: "#3E5A47",
              borderBottomWidth: 0.5,
              width: "100%",
            }}
          />
          <View style={styles.statsContainer}>
            {breakdown.map((data) => {
              return (
                <View
                  style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}
                  key={data.id}
                >
                  <Text style={styles.statDate}>
                    {data.day}, {data.mm} {data.dd}
                  </Text>
                  <Text style={styles.statWeight}>{data.totalWeight} kg</Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              borderBottomColor: "#3E5A47",
              borderBottomWidth: 0.42,
              width: "100%",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              paddingLeft: 30,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 15,
                color: "#627D6B",
              }}
            >
              May 7 - May 13 Scrap Statistics
            </Text>
          </View>
          <View style={styles.graphContainer}>
            <Text style={{
                position: 'absolute',
                fontFamily: 'Inter-Medium',
                fontSize: 12,
                color: '#5E5E5E',
                transform: [{ rotate: '90deg'}],
                top: 160,
                left: 285
            }}>weight of scrap per type</Text>
            <VictoryChart
              style={styles.chart}
              theme={VictoryTheme.material}
              padding={60}
              domainPadding={20}
            >
              <VictoryStack
                style={styles.chartStack}
                colorScale={["#E9D985", "#FF7961", "#FFC7C7"]}
              >
                {data.map((dataGraph, index) => {
                  // console.log(data[index]);
                  return <VictoryBar key={index} data={data} />;
                })}
              </VictoryStack>
            </VictoryChart>
            <View style={styles.chartLegend}>
                {
                    legend.map((data) => {
                        return(
                            <View key={data.itemId}>
                                <View style={{
                                    width: 41,
                                    height: 13,
                                    backgroundColor: data.color,
                                    margin: 10
                                }}/>
                                <Text style={{textAlign: 'center'}}>{data.material}</Text>
                            </View>
                        )
                    })
                }
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 370,
    marginTop: 50,
    marginBottom: 20,
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#3E5A47",
    marginRight: 10,
  },
  profileName: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    fontStyle: "italic",
    color: "#3E5A47",
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: "#2c3e50",
    alignItems: "center",
  },
  gradientButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  logoutButton: {
    height: 34,
  },
  statsContainer: {
    display: "flex",
    flexWrap: "wrap",
    height: 320,
    paddingTop: 20,
  },
  statDate: {
    fontFamily: "Inter-Regular",
    fontSize: 17,
    color: "#627D6B",
  },
  statWeight: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: "#627D6B",
  },
  graphContainer: {
    backgroundColor: 'white',
    width: 380,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    background: {
      fill: "white",
    },
  },
  chartLegend: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '94%',
    borderColor: '#989E9A',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    padding: 5
  },
  chartStack: {
    data: { stroke: "black", strokeWidth: 1 },
  },
});

//make this component available to the app
export default OverviewBuyer;
