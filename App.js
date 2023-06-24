import * as React from 'react';
import { useCallback } from 'react';
import { StyleSheet, BackHandler, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Screen Imports (Auth Stack)

import UserSelection from './src/screens/auth/UserSelection.js';
import Splash from './src/screens/auth/splash';

// Buyer

import PreAuthBuyer from './src/screens/auth/PreAuthBuyer.js';
import RegAuthBuyer from './src/screens/auth/RegAuthBuyer.js';
import LogAuthBuyer from './src/screens/auth/LogAuthBuyer.js';

// Owner

import PreAuthOwner from './src/screens/auth/PreAuthOwner';
import RegAuthOwner from './src/screens/auth/RegAuthOwner';
import LogAuthOwner from './src/screens/auth/LogAuthOwner';


// Screen Imports (Buyer Stack)

// Buyer

import OverviewBuyer from './src/screens/buyer/OverviewBuyer';
import ProfileBuyer from './src/screens/buyer/ProfileBuyer';

// Owner

import OverviewOwner from './src/screens/owner/OverviewOwner';
import ProfileOwner from './src/screens/owner/ProfileOwner.js';
import Scrap from './src/screens/owner/ScrapCat';
import Inventory from './src/screens/owner/Inventory';
import Analytics from './src/screens/owner/ReportALS';
import About from './src/screens/owner/About';

// Auth Import

import { AuthContext } from './src/screens/auth/context.js';

// const { withAppBuildGradle } = require('@expo/config-plugins');

// const withAndroidNamespace = (config) => {
//     return withAppBuildGradle(config, (config) => {
//         const buildGradle = config.modResults.contents;
//         const namespace = config.android.package.toString();
//         const newContents = buildGradle.replace(
//             /namespace (.*)\n/,
//             `namespace '${namespace}'\n`
//         );
//         config.modResults.contents = newContents;
//         console.log(`withAndroidNamespace: change namespace to ${namespace}`);
//         return config;
//     });
// };

// module.exports = withAndroidNamespace;

// Disable Scaling

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {

  // App Loading

  // SplashScreen.preventAutoHideAsync();

  // Auth State Hook

  const [userToken, setUserToken] = React.useState(null);
  const [userType, setUserType] = React.useState(null);

  // Auth Context Memo

  const authContext = React.useMemo(() => ({
    signIn: (user, token) => {
      setUserToken(token);
      setUserType(user);
    },
    signOut: () => {
      setUserToken(null);
      setUserType(null);
    }
  }));

  // Stack 

  const Stack = createNativeStackNavigator();

  // Font Generation Handlers

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./src/screens/assets/fonts/Inter-Regular.ttf'),
    'Inter-Black': require('./src/screens/assets/fonts/Inter-Black.ttf'),
    'Inter-SemiBold': require('./src/screens/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./src/screens/assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./src/screens/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./src/screens/assets/fonts/Inter-Regular.ttf'),
    'Inter-ExtraBold': require('./src/screens/assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Thin': require('./src/screens/assets/fonts/Inter-Thin.ttf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded) {
  //         await SplashScreen.hideAsync();
  //     }
  // });

  // App Loader and Authentication Flow

  console.log("usertoken (app.js): " + userToken);
  
  if(!fontsLoaded) {
    return (
      <Text>NULL</Text>
    )
  } else {
    return (
      <AuthContext.Provider value={authContext} userToken={userToken}>
        <NavigationContainer>
          { userToken !== null && userType === "owner" ? (
            <Stack.Navigator>
              <Stack.Screen initialParams={{userToken: userToken}} name="OwnerOverview" component={OverviewOwner} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="OwnerProfile" component={ProfileOwner} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="ScrapCat" component={Scrap} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="Inventory" component={Inventory} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="ReportALS" component={Analytics} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="About" component={About} options={{ headerShown: false }}/>
            </Stack.Navigator>
          )
          : userToken !== null && userType === "buyer" ? (
            <Stack.Navigator userToken={userToken}>
              <Stack.Screen initialParams={{userToken: userToken}} name="BuyerOverview" component={OverviewBuyer} options={{ headerShown: false }}/>
              <Stack.Screen initialParams={{userToken: userToken}} name="BuyerProfile" component={ProfileBuyer} options={{ headerShown: false }}/>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="UserSelection" component={UserSelection} options={{ headerShown: false }}/>
              <Stack.Screen name="PreAuthOwner" component={PreAuthOwner} options={{ headerShown: false }}/>
              <Stack.Screen name="LogAuthOwner" component={LogAuthOwner} options={{ headerShown: false }}/>
              <Stack.Screen name="RegAuthOwner" component={RegAuthOwner} options={{ headerShown: false }}/>
              <Stack.Screen name="PreAuthBuyer" component={PreAuthBuyer} options={{ headerShown: false }}/>
              <Stack.Screen name="LogAuthBuyer" component={LogAuthBuyer} options={{ headerShown: false }}/>
              <Stack.Screen name="RegAuthBuyer" component={RegAuthBuyer} options={{ headerShown: false }}/>
            </Stack.Navigator>
          )}

        </NavigationContainer>
      </AuthContext.Provider>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
