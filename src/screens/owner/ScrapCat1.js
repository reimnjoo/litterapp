import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Pressable,
    TouchableOpacity,
    BackHandler
  } from "react-native";
  import "react-native-gesture-handler";
  import {
    FontAwesome,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Ionicons,
  } from "@expo/vector-icons";
  import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from "@gorhom/bottom-sheet";
  import React from "react";
  import { useRef, useState } from "react";
  import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
  
  
  
  const ScrapCat = ({ navigation }) => {
  
    // Modal States
  
    const bottomSheetModalRef = useRef(null);
    const editRef = useRef(null);
    const snapPoints = ["30%", "40%", "75%"];
    const [isOpen, setIsOpen] = useState(false);
    const [scrapInput, setScrapInput] = useState("");
  
    // Modal Handlers
  
    function handleAddModal() {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  
    function closeAddModal() {
      bottomSheetModalRef.current?.dismiss();
      setIsOpen(false);
    }
  
    function editModal() {
      editRef.current?.present();
      setIsOpen(true);
    }
  
    function closeEditModal() {
      editRef.current?.dismiss();
    }
  
  
    // Scrap Category and Content Input States
  
    const [newCategory, setNewCategory] = useState("");
    const [category, setCategory] = useState([]);
  
    //   const [scrapImage, setScrapImage] = useState(null); for later use
  
    const [scrapName, setScrapName] = useState("");
    const [scrapSize, setScrapSize] = useState("");
    const [scrapCost, setScrapCost] = useState("");
    const [scrapQuantity, setScrapQuantity] = useState("");
    const [scrapAddDate, setScrapAddDate] = useState("");
  
    // Back Handler
  
    React.useEffect(() => {
      function handleBackButton() {
          navigation.goBack();
      return true;
      }
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
      return () => backHandler.remove();
    }, [navigation]);
  
    function handleSubmitCategory() {
  
      setCategory(currentCategories => {
          return [
              ...currentCategories,
              { id: Math.floor(Math.random() * 100) + 1, category: newCategory }
          ]
      })
  
    }
  
  
    return (
      <GestureHandlerRootView style={{
          flex: 1,
          backgroundColor: isOpen ? 'rgba(52, 52, 52, 0.8)' : "white"
      }}>
        <BottomSheetModalProvider>
          <SafeAreaView>
            <ScrollView>
              <View style={styles.wrapper}>
                <View style={styles.headerContainer}>
                  <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.searchButton}>
                      <FontAwesome name="search" size={24} color="#3E5A47" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scrap Categories</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addCategoryButton}
                    onPress={handleAddModal}
                  >
                    <Entypo name="plus" size={24} color="#F4F5F4" />
                    <Text style={styles.addCategoryText}>Add Category</Text>
                  </TouchableOpacity>
                  <BottomSheetModal
                      ref={bottomSheetModalRef}
                      index={0}
                      snapPoints={snapPoints}
                      backgroundStyle={{ borderRadius: 50 }}
                      onDismiss={() => setIsOpen(false)}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          // justifyContent: 'center',
                      }}
                  >
                      <Text style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: 20,
                          color: '#3E5A47',
                          marginTop: 20,
                          textAlign: "center",
                          paddingLeft: 20,
                          paddingRight: 20,
                      }}>Add Category</Text>
                      <TextInput
                          value={newCategory}
                          onChangeText={newCategory => { setNewCategory(newCategory) }}
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
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
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
                          }} onPress={() => {closeAddModal();}}>
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
                          }} onPress={() => { handleSubmitCategory() }}>
                          <Text style={{
                                  fontFamily: 'Inter-Regular',
                                  fontSize: 20,
                                  color: '#F4F5F4'
                              }}>Save</Text>
                          </TouchableOpacity>
                      </View>
                  </BottomSheetModal>
  
                  {/* separate */}
  
                  <BottomSheetModal
                      ref={editRef}
                      index={0}
                      snapPoints={snapPoints}
                      backgroundStyle={{ borderRadius: 50 }}
                      onDismiss={() => setIsOpen(false)}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          // justifyContent: 'center',
                      }}
                  >
                      <Text style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: 20,
                          color: '#3E5A47',
                          marginTop: 20,
                          textAlign: "center",
                          paddingLeft: 20,
                          paddingRight: 20,
                      }}>Edit Entry</Text>
                      <TextInput
                          value={newCategory}
                          onChangeText={newCategory => { setNewCategory(newCategory) }}
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
                      <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
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
                          }} onPress={() => {closeAddModal();}}>
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
                          }} onPress={() => { handleSubmitCategory() }}>
                          <Text style={{
                                  fontFamily: 'Inter-Regular',
                                  fontSize: 20,
                                  color: '#F4F5F4'
                              }}>Save</Text>
                          </TouchableOpacity>
                      </View>
                  </BottomSheetModal>
                </View>
  
                <View style={styles.bodyContainer}>
                  <View style={styles.bodyContent}>
                    <View style={styles.categoryContainer}>
                      <View style={styles.categoryHeader}>
                        <TouchableOpacity>
                          <View style={styles.categoryHeaderLeft}>
                            <Text style={styles.categoryHeaderText}>
                              Plastics
                            </Text>
                            <SimpleLineIcons
                              name="pencil"
                              size={18}
                              color="#3E5A47"
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View style={styles.categoryHeaderRight}>
                            <Octicons name="trash" size={24} color="#3E5A47" />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <ScrollView
                          horizontal={true}
                          contentContainerStyle={{
                            flexGrow: 1,
                            paddingLeft: 20,
                            paddingRight: 20,
                          }}
                          showsHorizontalScrollIndicator={false}
                        >
                          <TouchableOpacity>
                            <View style={styles.categoryContent}>
                              <Image
                                style={styles.pfp}
                                source={require("E:/Files/TUPM-20-1824 2Y2S/Seol/Projects/LitterApp/assets/img/placeholder.png")}
                              ></Image>
                              <Text style={styles.categoryTitle}>
                                Plastic Bottles
                              </Text>
                              <View style={{ marginTop: 10, marginBottom: 30 }}>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Size:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    350 ml
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Cost:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    PHP 7 /kg
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Quantity:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    9 pieces
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "row",
                                }}
                              >
                                <TouchableOpacity>
                                  <SimpleLineIcons
                                    name="pencil"
                                    size={18}
                                    color="#3E5A47"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
  
                          <TouchableOpacity>
                            <View style={styles.categoryContent}>
                              <Image
                                style={styles.pfp}
                                source={require("E:/Files/TUPM-20-1824 2Y2S/Seol/Projects/LitterApp/assets/img/placeholder.png")}
                              ></Image>
                              <Text style={styles.categoryTitle}>
                                Plastic Container
                              </Text>
                              <View style={{ marginTop: 10, marginBottom: 30 }}>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Size:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    350 ml
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Cost:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    PHP 7 /kg
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Quantity:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    9 pieces
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "row",
                                }}
                              >
                                <TouchableOpacity onPress={() => {editModal()}}>
                                  <SimpleLineIcons
                                    name="pencil"
                                    size={18}
                                    color="#3E5A47"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
  
                          <TouchableOpacity>
                            <View style={styles.categoryContent}>
                              <Image
                                style={styles.pfp}
                                source={require("E:/Files/TUPM-20-1824 2Y2S/Seol/Projects/LitterApp/assets/img/placeholder.png")}
                              ></Image>
                              <Text style={styles.categoryTitle}>
                                Plastic Litters
                              </Text>
                              <View style={{ marginTop: 10, marginBottom: 30 }}>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Size:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    350 ml
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Cost:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    PHP 7 /kg
                                  </Text>
                                </View>
                                <View style={styles.categoryContentDesc}>
                                  <Text style={styles.categoryTextTitle}>
                                    Quantity:
                                  </Text>
                                  <Text style={styles.categoryTextDesc}>
                                    9 pieces
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "row",
                                }}
                              >
                                <TouchableOpacity>
                                  <SimpleLineIcons
                                    name="pencil"
                                    size={18}
                                    color="#3E5A47"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </ScrollView>
                      </View>
                    </View>
                  </View>
  
                  <View>
                      {category.map(categories => {
                          return (
                              <View style={styles.categoryContainer} key={categories.id}>
                                  <View style={styles.categoryHeader}>
                                      <TouchableOpacity>
                                          <View style={styles.categoryHeaderLeft}>
                                              <Text style={styles.categoryHeaderText}>{categories.category}</Text>
                                              <SimpleLineIcons
                                                  name="pencil"
                                                  size={18}
                                                  color="#3E5A47"
                                              />
                                          </View>
                                      </TouchableOpacity>
                                      <TouchableOpacity>
                                          <View style={styles.categoryHeaderRight}>
                                              <Octicons name="trash" size={24} color="#3E5A47" />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                  <View>
                                      <ScrollView
                                          horizontal={true}
                                          contentContainerStyle={{
                                          flexGrow: 1,
                                          paddingLeft: 20,
                                          paddingRight: 20,
                                          }}
                                          showsHorizontalScrollIndicator={false}
                                      >
                                          <TouchableOpacity>
                                              <View style={styles.addCategoryContent}>
                                                  <SimpleLineIcons
                                                      name="pencil"
                                                      size={18}
                                                      color="#3E5A47"
                                                  />
                                              </View>
                                          </TouchableOpacity>
                                          <TouchableOpacity>
                                              <View style={styles.categoryContent}>
                                                  <Image
                                                      style={styles.pfp}
                                                      source={require("E:/Files/TUPM-20-1824 2Y2S/Seol/Projects/LitterApp/assets/img/placeholder.png")}
                                                  ></Image>
                                                  <Text style={styles.categoryTitle}>
                                                      Plastic Container
                                                  </Text>
                                                  <View style={{ marginTop: 10, marginBottom: 30 }}>
                                                  <View style={styles.categoryContentDesc}>
                                                      <Text style={styles.categoryTextTitle}>
                                                          Size:
                                                      </Text>
                                                      <Text style={styles.categoryTextDesc}>
                                                          350 ml
                                                      </Text>
                                                  </View>
                                                  <View style={styles.categoryContentDesc}>
                                                      <Text style={styles.categoryTextTitle}>
                                                          Cost:
                                                      </Text>
                                                      <Text style={styles.categoryTextDesc}>
                                                          PHP 7 /kg
                                                      </Text>
                                                  </View>
                                                  <View style={styles.categoryContentDesc}>
                                                      <Text style={styles.categoryTextTitle}>
                                                          Quantity:
                                                      </Text>
                                                      <Text style={styles.categoryTextDesc}>
                                                          9 pieces
                                                      </Text>
                                                  </View>
                                                  </View>
                                                  <View
                                                      style={{
                                                          display: "flex",
                                                          justifyContent: "flex-end",
                                                          flexDirection: "row",
                                                      }}
                                                  >
                                                      <TouchableOpacity>
                                                          <SimpleLineIcons
                                                          name="pencil"
                                                          size={18}
                                                          color="#3E5A47"
                                                          />
                                                      </TouchableOpacity>
                                                  </View>
                                              </View>
                                          </TouchableOpacity>
                                      </ScrollView>
                                  </View>
                              </View>
                          )
                      })}
                  </View>
                </View>           
              </View>
            </ScrollView>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 45,
    },
    headerContainer: {
      marginLeft: 25,
      marginRight: 25,
    },
    headerContent: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 10,
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
    bodyContent: {
      // marginBottom: 20,
    },
    categoryContainer: {
      marginBottom: 20,
    },
    addCategoryContent: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#EAE9E9",
      borderRadius: 8,
      padding: 10,
      width: 140,
      height: 180,
      marginLeft: 20,
    },
    categoryContent: {
      backgroundColor: "#EAE9E9",
      borderRadius: 8,
      padding: 10,
      width: 140,
      marginLeft: 20,
    },
    categoryHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 20,
    },
    categoryHeaderText: {
      fontFamily: "Inter-Bold",
      fontSize: 20,
      fontWeight: 'bold',
      color: '#3E5A47',
      marginRight: 7,
      fontStyle: 'italic',
      textDecorationLine: "underline",
    },
    categoryHeaderLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    categoryTitle: {
      fontFamily: "Inter-Bold",
      fontSize: 9,
      textAlign: "center",
    },
    categoryContentDesc: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    categoryTextTitle: {
      fontFamily: "Inter-Regular",
      fontSize: 8,
    },
    categoryTextDesc: {
      fontFamily: "Inter-Bold",
      fontSize: 8,
    },
    pfp: {
      width: "100%",
      height: 70,
      borderRadius: 8,
      marginBottom: 5,
    },
  });
  
  export default ScrapCat;
  