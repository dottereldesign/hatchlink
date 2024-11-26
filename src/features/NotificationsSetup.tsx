import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

type Notifications = {
  newsletters: boolean;
  events: boolean;
  groupAlerts: boolean;
  publications: boolean;
  articles: boolean;
  notices: boolean;
  appUpdates: boolean;
};

type Props = {
  notifications: Notifications;
  onToggleNotification: (type: keyof Notifications) => void;
};

export const NotificationsSetup: React.FC<Props> = ({
  notifications,
  onToggleNotification,
}) => {
  console.log(
    "[NotificationsSetup] Rendering with notifications:",
    notifications
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      {Object.keys(notifications).map((type) => {
        const notificationKey = type as keyof Notifications;

        return (
          <View key={type} style={styles.notificationContainer}>
            <View style={styles.notificationItem}>
              <Text style={styles.notificationLabel}>
                {notificationKey.charAt(0).toUpperCase() +
                  notificationKey.slice(1).replace(/([A-Z])/g, " $1")}
              </Text>
              <Switch
                value={notifications[notificationKey]}
                onValueChange={() => {
                  console.log(
                    `[NotificationsSetup] Toggling notification: ${notificationKey}`
                  );
                  onToggleNotification(notificationKey);
                }}
                thumbColor={notifications[notificationKey] ? "#fff" : "#fff"}
                trackColor={{
                  true: "green",
                  false: "red",
                }}
              />
            </View>
            <View style={styles.separator} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxWidth: 360,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    alignSelf: "center",
    fontFamily: "PoppinsSemiBold",
  },
  notificationContainer: {
    width: "100%",
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#CCC",
    width: "100%",
  },
});
