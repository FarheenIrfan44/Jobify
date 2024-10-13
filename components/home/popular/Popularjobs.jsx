import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();

  const {data, isLoading,error} = useFetch('search',{
    query: 'React developer',
    num_page: 1
    })

    console.log(data);
 

  const jobs = [1,2,3,4]; // Dummy job data (replace with your data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={jobs} // replace with your job data
            renderItem={({ item }) => (
              <PopularJobCard item={item} /> // Your custom job card component
            )}
            keyExtractor={item => item?.job_id} 
            horizontal
            contentContainerStyle={{columnGap: SIZES.medium}}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true} 
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;