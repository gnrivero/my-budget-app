import React from 'react';
import {  Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight,TouchableOpacity, Image, Button, FlatList } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';

import DashboardService from '../../service/DashboardService';

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


export default class DashboardScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Resumen',
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


  componentDidMount(){
  
    this.dashboardService.getAccountBalance()
    .then((accountsBalance) => {
      this.setState({
        accounts: accountsBalance.accounts,
        balances: accountsBalance.balances,
      })
    });

 }





render() {
  const { navigation } = this.props;
  return (
    <View style={{backgroundColor:"white"}} >
      <ScrollView style={styles.mainContainer}>
              
      <View style={styles.buttonStyle}>

      </View>
      <Text>Cuentas</Text>
      <View>
<BarChart
  style={graphStyle}
  //data={data}
  data={{
    labels: this.state.accounts,
  datasets: [
    {
      data: this.state.balances
    }
  ]
  }}
  width={screenWidth}
  height={250}
  //yAxisLabel="$"
  withVerticalLabels= {false}
  chartConfig={chartConfig}
  verticalLabelRotation={0}
  showValuesOnTopOfBars = {true}

/>
</View>
    <Text>Tus consumos</Text>
    <View>
    <LineChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={110}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        // backgroundColor: "#e26a00",
        backgroundColor: "green",
        // backgroundGradientFrom: "#fb8c00",
        backgroundGradientFrom: "green",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
    </View>
    <View>
    <LineChart
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig1}
    />
    </View>

</ScrollView>
</View>

/*
<PieChart
  dataPie={dataPie}
  // width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>

  </View>
*/
  )
}
}
