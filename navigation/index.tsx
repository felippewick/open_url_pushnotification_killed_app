/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import * as Linking from 'expo-linking';

export default function Navigation({
  colorScheme,
  token,
  url,
}: {
  colorScheme: ColorSchemeName;
}) {
  // const [url, setUrl] = React.useState(null);
  // const [expoToken, setExpoToken] = React.useState(null);
  // const notificationListener = React.useRef();
  // const responseListener = React.useRef();

  // React.useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  // async function registerForPushNotificationsAsync() {
  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log('Expo push token:', token);
  //     setExpoToken(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  // }

  return (
    <NavigationContainer
      linking={{
        ...LinkingConfiguration,
        subscribe(listener) {
          // Listen to incoming links from deep linking
          const onReceiveURL = ({ url }: { url: string }) => listener(url);
          Linking.addEventListener('url', onReceiveURL);

          // notificationListener.current =
          //   Notifications.addNotificationReceivedListener((notification) => {
          //     console.log('notification', notification);
          //     setUrl(notification.request.content.data.url);
          //   });
          // // const subscription1 =
          // responseListener.current =
          //   Notifications.addNotificationResponseReceivedListener(
          //     (response) => {
          //       const url = response.notification.request.content.data.url;
          //       console.log('url from push notification ', url);
          //       //  Linking.openURL(url).catch((err) => console.log('error ', err));
          //       listener(url);
          //     }
          //   );
          // return () => {
          //   // subscription1.remove();
          //   // subscription2.remove();
          //   Notifications.removeNotificationSubscription(
          //     notificationListener.current
          //   );
          //   Notifications.removeNotificationSubscription(
          //     responseListener.current
          //   );
          // };
        },
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator url={url} token={token} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ url, token }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {() => <BottomTabNavigator url={url} token={token} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ url, token }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One1',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      >
        {() => <TabOneScreen url={url} token={token} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
