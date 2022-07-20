import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Share } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({
  token,
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  useEffect(() => {
    const checkForUpdates = async () => {
      const { isAvailable, manifest } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        setUpdateAvailable(true);
      }
    };

    checkForUpdates();
  }, []);

  const fetchUpdate = async () => {
    const result = await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        subject: 'test',
        message:
          'React Native | A framework for building native apps using React',

        url: `${Constants.manifest?.scheme}://events/123`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async function sendPushNotifcation() {
    console.log('sending push notification');

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        sound: 'default',
        title: `Updates on upto`,
        body: `View relevant updates from your friends`,
        'content-available': 1,
        data: {
          url: `${Constants.manifest?.scheme}://events/123`,
        },
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={{ fontSize: 16 }}>Instruction:</Text>
      <View style={{ height: 10 }} />
      <Text>1. Send push notification</Text>
      <Text>2. Kill app</Text>
      <Text>3. Tap push notification</Text>
      <View style={{ height: 10 }} />
      <Text>
        Result: - Tap push notification, does open the app but doesn't openURL.
        It does work when openUrl is delayed by 100 ms with setTimeout.
      </Text>

      <View style={{ height: 20 }} />
      <Pressable onPress={sendPushNotifcation}>
        <Text style={{ color: 'blue' }}>Send Push</Text>
      </Pressable>
      <View style={{ height: 20 }} />
      <Pressable onPress={onShare}>
        <Text style={{ color: 'blue' }}>Share Url</Text>
      </Pressable>
      <View style={{ height: 20 }} />
      <Text>Expo token {token}</Text>
      <View style={{ height: 20 }} />
      <Text>Update Available {updateAvailable.toString()}</Text>
      <View style={{ height: 20 }} />
      <Pressable onPress={fetchUpdate}>
        <Text style={{ color: 'blue' }}>Fetch Update</Text>
      </Pressable>
      <View style={{ flex: 1 }} />
      <Text>V16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
