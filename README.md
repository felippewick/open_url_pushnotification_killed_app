# OpenPushForKilledApp
Open Link with addNotificationResponseReceivedListener with Delay


Example that shows that the addNotificationResponseReceivedListener callback is correctly triggered when app was killed.

The problem in my case was that Linking.openUrl didn't open the url correctly. I added setTimeout to delay opening the url and it solved my problem.
Perhaps this workaround applies to other environments as well.


Environment
"expo": "~45.0.0",
"expo-notifications": "~0.15.4",


