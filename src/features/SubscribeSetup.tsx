import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedOption: string;
  onOptionChange: (value: string) => void;
};

export const SubscribeSetup: React.FC<Props> = ({
  selectedOption,
  onOptionChange,
}) => {
  console.log(
    "[SubscribeSetup] Rendering with selectedOption:",
    selectedOption
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>HatchLink</Text>
          <Text style={styles.subtitle}>Your world, one nest</Text>
        </View>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/hatchlink-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Subscribe Heading */}
      <Text style={styles.heading}>Subscribe</Text>

      {/* Dropdown Picker */}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(value) => {
            console.log("[SubscribeSetup] Option selected:", value);
            onOptionChange(value);
          }}
          style={styles.picker}
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

      {/* Info Text */}
      <Text style={styles.errorText}>
        You need at least 1 subscription to continue
      </Text>
      <Text style={styles.infoText}>
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 32,
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "PoppinsBold",
    color: "#000",
    lineHeight: 32,
    paddingTop: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#6B6B6B",
  },
  logo: {
    width: 80,
    height: 80,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    alignSelf: "center",
    fontFamily: "PoppinsSemiBold",
  },
  pickerWrapper: {
    height: 54,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC7C7",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  picker: {
    height: 54,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 12,
    textAlign: "center",
  },
  infoText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    textAlign: "center",
  },
});
