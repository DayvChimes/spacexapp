import React from "react";
import {
  View,
  Text,
  VirtualizedList,
  Dimensions,
  ScrollView,
} from "react-native";
import LaunchItem from "../LaunchItem";

import styles from "./styles";

import { useQuery, gql } from "@apollo/client";

const checkItem = (renderItem, item) => {
  if (renderItem.includes(item)) return null;
  else return item;
};

const LAUNCHES_PAST = gql`
  query GetLaunchesPast {
    launchesPast(limit: 50) {
      mission_name
      links {
        article_link
        video_link
        flickr_images
        mission_patch_small
      }
      rocket {
        rocket_name
      }
      id
      launch_date_utc
    }
  }
`;

const getItem = (data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (data) => 1;

const LaunchesPast = (props) => {
  const { loading, error, data } = useQuery(LAUNCHES_PAST);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      <ScrollView
      snapToStart={true}
      >
        {data.launchesPast.map((launchlist) => {
          return (
            <View key={launchlist.id}>
              <VirtualizedList
                data={data.launchesPast}
                initialNumToRender={5}
                renderItem={({ item, index }) => (
                  <LaunchItem car={(item = launchlist)} />
                )}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
                getItemCount={getItemCount}
                getItem={getItem}
                showsVerticalScrollIndicator={false}
                snapToAlignment={"start"}
                decelerationRate={"normal"}
                snapToInterval={Dimensions.get("window").height}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LaunchesPast;
