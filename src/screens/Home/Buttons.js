import React from 'react';
import {  Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight,TouchableOpacity, Image, Button, FlatList } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuButton from '../../components/MenuButton/MenuButton';
import AddCardButton from '../../components/CardButton/AddCardButton';
//import { dataPie } from '../../data/home/dataArray';

  const screenWidth = Dimensions.get("window").width;


export default class Buttons extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    )
  }
}
