import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import LaunchVirtualizedList from './components/LaunchVirtualizedList'

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});


export default function App() {
  return (
    <View style={styles.container}>
     <ApolloProvider client={client}>
        <LaunchVirtualizedList/>
    </ApolloProvider>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
