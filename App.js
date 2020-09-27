import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import DBInit from './src/data/access/DBInit';

export default function App() {
  DBInit.run();
  return (
     <AppContainer />
  );
}
