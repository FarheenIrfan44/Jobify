import React from "react";
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Farheen</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searcContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
          style={styles.searchInput} />

        </View>

      </View>
    </View>
  );
};

export default Welcome;
