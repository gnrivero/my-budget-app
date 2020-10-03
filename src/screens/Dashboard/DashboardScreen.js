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
                  balances:[],
                  amountCash:0,
                  amountDC:0,
                  amountCC:0,
                  amountother:0,
                  amountTransfer:0,
                  amountAutoDebit:0
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

    this.dashboardService.getExpensesByPaymentMethodMonth()
    .then((expenses) => {
      this.setState({
        amountCash: expenses.amountCash,
        amountDC: expenses.amountDC,
        amountCC: expenses.amountCC,
        amountother: expenses.amountother,
        amountTransfer: expenses.amountTransfer,
        amountAutoDebit: expenses.amountAutoDebit
      })
    });

 }

render() {
  const { navigation } = this.props;
  
let pieChartData = [
  { name: 'Seoul', population: this.state.amountCash, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: this.state.amountCC, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: this.state.amountDC, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: this.state.amountAutoDebit, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: this.state.amountother, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];


  let pieData  = [
    { name: 'Efectivo', amount: this.state.amountCash, color: 'skyblue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Tarjeta Debito', amount: this.state.amountDC, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Tarjeta Credito', amount: this.state.amountCC,color: 'red', legendFontColor: '#7F7F7F',      legendFontSize: 15 },
    { name: 'Debito automatico', amount: this.state.amountAutoDebit, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Transferencia', amount: this.state.amountTransfer, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Otro', amount: this.state.amountother, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ];
 
  return (
    <View style={{backgroundColor:"white"}} >
      <ScrollView style={styles.mainContainer}>
      <Text>Estado Cuentas</Text>
      <View>
        <BarChart
          style={graphStyle}
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
          withHorizontalLabels= {false}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          showValuesOnTopOfBars = {true}
        />
      </View>
    <Text>Gastos del mes</Text>
    
    <View>
    <Text >Pie Chart</Text>
              <PieChart
                data={pieChartData}
                height={250}
                width={screenWidth}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
              

              </View>
              <View>
   <PieChart
      dataPie={pieData}
      width={250}
      height={220}
      chartConfig={chartConfig}
      accessor="amount"
      style={graphStyle}
      backgroundColor={"#ff4040"}
    />
  
    </View>
    
    
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
