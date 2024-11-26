import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedSubscription: string;
  onSelectSubscription: (value: string) => void;
};

export const SubscribeSetup: React.FC<Props> = ({
  selectedSubscription,
  onSelectSubscription,
}) => {
  console.log(
    "[SubscribeSetup] Rendering with selectedSubscription:",
    selectedSubscription
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Subscribe</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedSubscription}
          onValueChange={(value) => {
            console.log("[SubscribeSetup] Subscription selected:", value);
            onSelectSubscription(value);
          }}
          style={styles.dropdownPicker}
        >
          <Picker.Item label="Select from the dropdown" value="" />
          <Picker.Item label="Merrin School" value="merrin" />
          <Picker.Item
            label="New Brighton Seaside Market"
            value="new-brighton"
          />
          <Picker.Item label="Grace Vineyard Church" value="grace-vineyard" />
          <Picker.Item
            label="Christchurch Boys High"
            value="christchurch-boys"
          />
        </Picker>
      </View>
      <Text style={styles.redText}>
        You need at least 1 subscription to continue
      </Text>
      <Text style={styles.greyText}>
        Unsure? No worries, you can add or remove subscriptions at any time in
        the settings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxWidth: 360,
    width: "100%",
    paddingVertical: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 24,
    alignSelf: "center",
    fontFamily: "PoppinsSemiBold",
  },
  dropdownContainer: {
    height: 54,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC7C7",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dropdownPicker: {
    height: 54,
    width: "100%",
  },
  redText: {
    color: "red",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 12,
    textAlign: "center",
  },
  greyText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    textAlign: "center",
  },
});
