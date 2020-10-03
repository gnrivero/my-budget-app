import React from 'react';
import {  Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight,TouchableOpacity, Image, Button, FlatList } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';

import DashboardService from '../../service/DashboardService';

import ButtonHome from './Buttons'

import {
  BarChart,
  LineChart,
  PieChart, ProgressChart,
  ContributionGraph,
  StackedBarChart,
  } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundColor: '#136616',
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: '#9edba0',
  backgroundGradientToOpacity: 0.5,
  backgroundGradientTo: '#4ce651',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};
const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
}
const chartConfig1 = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  showBarTops: true,
  useShadowColorFromDataset: false // optional
};
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};


export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
    this.dashboardService = new DashboardService();
    this.state =  {
                  accounts:[],
                  balances:[]
    };
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:"white"}} >
        <ScrollView style={styles.mainContainer}>
        <TouchableHighlight             onPress={() => {
              navigation.navigate('Cuentas',{name: 'Cuentas'});
              }}>
        <Image style={{width: 350, height:250 }}  source={require('../../data/bpayapp.jpeg')} />
        </TouchableHighlight>
        <View>
        <Image style={{width: 400, height:100 }}  source={require('../../data/budgetbanner.jpeg')} />
        <Text style={{fontWeight:"bold", fontSize: 15 }}>Gestiona tus productos </Text>
        </View>
        <View style={styles.buttonStyle}>
      </View>
      <ButtonHome></ButtonHome>
      </ScrollView>
      </View>
    )
  }
}
