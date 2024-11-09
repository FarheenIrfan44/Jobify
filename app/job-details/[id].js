import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // New import for route params

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { data } from "../../data/data.js";
import { useEffect } from "react";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const route = useRoute(); // Get route object
  const { id } = route.params; // Extract 'id' from route params
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const fetchJobDetails = () => {
    try {
      // Find job by job_id in the static data list
      const result = data.find((job) => job.job_id === id);
      if (result) {
        setSelectedData([result]);
        setError(null);
      } else {
        throw new Error("Job not found");
      }
    } catch (err) {
      setError("Failed to load job details");
      setSelectedData(null);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={selectedData[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout
            info={
              selectedData[0].job_description ?? "No selectedData[0] provided"
            }
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={selectedData[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {selectedData.length === 0 ? (
            <Text>No selectedData available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={selectedData[0].employer_logo}
                jobTitle={selectedData[0].job_title}
                companyName={selectedData[0].employer_name}
                location={selectedData[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            selectedData[0]?.job_apply_link ??
            "https://www.google.com/search?q=linkedin+jobs&oq=linkedin+jobs&gs_lcrp=EgZjaHJvbWUyDwgAEEUYORixAxjJAxiABDIKCAEQABiSAxiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCTEyMDA1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&jbr=sep:0"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
