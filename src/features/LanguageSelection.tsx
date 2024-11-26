import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedLanguage: string;
  onSelectLanguage: (value: string) => void;
};

export const LanguageSelection: React.FC<Props> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  console.log(
    "[LanguageSelection] Rendering with selectedLanguage:",
    selectedLanguage
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Language</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(value) => {
            console.log("[LanguageSelection] Language selected:", value);
            onSelectLanguage(value);
          }}
          style={styles.dropdownPicker}
        >
          <Picker.Item label="Select a language" value="" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Te Reo" value="te" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="German" value="de" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    maxWidth: 398,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
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
});
