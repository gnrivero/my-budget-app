import React from 'react';
import {  Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight,TouchableOpacity, Image, Button, FlatList } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuButton from '../../components/MenuButton/MenuButton';
import AddCardButton from '../../components/CardButton/AddCardButton';
import { dataPie } from '../../data/home/dataArray';



import {
  LineChart,
  BarChart,
  PieChart, ProgressChart,
  ContributionGraph,
  StackedBarChart,
  } from 'react-native-chart-kit';

  const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};
const graphStyle = {
  marginVertical: 8,
  borderRadius: 16
}


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
  }

  onPressBudget = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('Presupuesto');
  };



render() {
  const { navigation } = this.props;
  return (
    <View style={{backgroundColor:"white"}} >
      <TouchableHighlight             onPress={() => {
             navigation.navigate('Cuentas',{name: 'Cuentas'});
            }}>
      <Image style={{width: 350, height:250 }}  source={require('../../data/bpayapp.jpeg')} />
      </TouchableHighlight>
      <View>
      <Image style={{width: 400, height:100 }}  source={require('../../data/budgetbanner.jpeg')} />
      <Text style={{fontWeight:"bold", fontSize: 15 }}>Gestiona tus productos </Text>
      </View>
      <View style={HomeStyles.buttonStyle}>

</View>
      <View style={{backgroundColor:'##EEEEEE', borderWidth: 3,borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
      <View style={{flexDirection: 'row'}}> 
         <Button
            title="CUENTAS"
            color="black"
            source={require('../../../assets/icons/account.png')}
            onPress={() => {
             navigation.navigate('Cuentas',{name: 'Cuentas'});
             navigation.closeDrawer();
             
            }}
          />
          <Button
              source={require('../../../assets/icons/tarjetas.png')}
              title="TARJETAS"
              color="black"
              source={require('../../../assets/icons/tarjetas.png')}
              onPress={() => {
                navigation.navigate('Cards',{name: 'Tarjetas'});
                navigation.closeDrawer();
              }}
            />
            <Button
            title="PRESTAMOS"
            color="black"
            source={require('../../../assets/icons/loan.jpg')}
            onPress={() => {
             navigation.navigate('Loans',{name: 'Prestamos'});
             navigation.closeDrawer();
            }}
          />
          </View>

          <View style={{flexDirection: 'row'}}> 
          <Button
            title="INGRESOS"
            color="black"
            source={require('../../../assets/icons/ingresos.png')}
            onPress={() => {
             navigation.navigate('Income',{name: 'Ingresos'});
             navigation.closeDrawer();
            }}
          />
            <Button
            title="EGRESOS"
            color="black"
            source={require('../../../assets/icons/expenses.png')}
            onPress={() => {
             navigation.navigate('Expenses',{name: 'Egresos'});
             navigation.closeDrawer();
            }}
          />
          <Button
            title="INVERSIONES"
            color="black"
            source={require('../../../assets/icons/inversiones.png')}
            onPress={() => {
             navigation.navigate('Investments',{name: 'Inversiones'});
             navigation.closeDrawer();
            }}
          />
          </View>


          
        </View>

        
      <View style={HomeStyles.buttonStyle}>

      </View>
    <Text>Tus consumos</Text>
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
{/* <View>
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
</View> */}
  </View>
  );
  }
  }
  
  const HomeStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    buttonStyle: {
      // backgroundColor:"darkorange",
      flexDirection: 'row',
      justifyContent: 'space-between',
      color:"black",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 25,
    },
  });