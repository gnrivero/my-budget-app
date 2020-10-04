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
const chartExpensesConfig = {
  
  backgroundColor: '#a6241f',
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: '#e26863',
  backgroundGradientToOpacity: 0.5,
  backgroundGradientTo: '#ea928e',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};


export default class DashboardScreen extends React.Component {
     
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Resumen'
    };
  };
  
  constructor(props) {
    super(props);
    this.dashboardService = new DashboardService();
    this.state =  {
                  accounts:[],
                  balances:[],
                  amount:[],
                  categories:[],
                  amountCash:0,
                  amountDC:0,
                  amountCC:0,
                  amountother:0,
                  amountTransfer:0,
                  amountAutoDebit:0
    };
  }


  componentDidMount(){
  
    this.dashboardService.nextMaturities();

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

    
    this.dashboardService.nextMaturities()
    .then((maturities) => {
      this.setState({
        categories: maturities.categories,
        amount: maturities.amount,
      })
    });

 }

render() {
  const { navigation } = this.props;

  let pieData  = [
    { name: 'Efectivo', amount: this.state.amountCash, color: '#00bfff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Tarjeta Debito', amount: this.state.amountDC, color: '#0040ff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Tarjeta Credito', amount: this.state.amountCC,color: '#00ffc0', legendFontColor: '#7F7F7F',      legendFontSize: 15 },
    { name: 'Debito automatico', amount: this.state.amountAutoDebit, color: '#00ff40', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Transferencia', amount: this.state.amountTransfer, color: '#00b386', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Otro', amount: this.state.amountother, color: '#', legendFontColor: '#7F7F7F', legendFontSize: 15 }
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
      <PieChart
        data={pieData}
        height={250}
        width={screenWidth}
        chartConfig={chartConfig}
        accessor="amount"
        style={graphStyle}
        backgroundColor={"#ff7373"}
      />
  </View>
  <Text>Vencimientos de la semana</Text>
      <View>
        <BarChart
          style={graphStyle}
          data={{
            labels: this.state.categories,
          datasets: [
            {
              data: this.state.amount
            }
          ]
          }}
          width={screenWidth}
          height={250}
          //yAxisLabel="$"
          withHorizontalLabels= {false}
          chartConfig={chartExpensesConfig}
          verticalLabelRotation={0}
          showValuesOnTopOfBars = {true}
        />
      </View>
</ScrollView>
</View>

  )
}
}
