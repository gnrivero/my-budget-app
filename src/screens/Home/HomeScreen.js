import React from 'react';
import {  Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight,TouchableOpacity, Image, Button, FlatList } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';

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
    console.log(props);
    this.state =  {
        accounts:[],
        balances:[]
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:"#EBEDEB"}} >
        <ScrollView style={styles.mainContainer}>
        <View style={{alignItems: 'center', justifyContent: 'center', height: 150, backgroundColor: 'white'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>¡Bienvenido a My Budget!</Text>
            <Text style={{fontSize: 20, margin: 10 }}>Comenzá a administrar tu economía personal de la forma más fácil</Text>
        </View>
        <View>
              <View style={styles.buttonContainer}>
                  <View style={styles.largeButton}>
                    <TouchableHighlight
                        onPress={ () => {
                            navigation.navigate('Dashboard');
                        } }>
                        <View>
                            <Image source={require('../../../assets/icons/home-button-dashboard.jpg')} style={styles.homeButtonLargeImage}/>
                            <Text style={styles.homeButtonText}>RESUMEN GENERAL</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.squareButton}>
                    <TouchableHighlight
                        onPress={ () => {
                            navigation.navigate('Income',{name: 'Ingresos'});
                        } }>
                        <View>
                            <Image source={require('../../../assets/icons/home-button-income.png')} style={{height:64, width: 64}} />
                            <Text style={styles.homeButtonText}>INGRESOS</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.squareButton}>
                    <TouchableHighlight
                        onPress={ () => {
                            navigation.navigate('Expenses',{name: 'Egresos'});
                        } }>
                        <View>
                            <Image source={require('../../../assets/icons/home-button-expense.png')} style={{height:64, width: 64}} />
                            <Text style={styles.homeButtonText}>EGRESOS</Text>
                        </View>
                    </TouchableHighlight>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                  <View style={styles.largeButton}>
                    <TouchableHighlight
                    onPress={ () => {
                        navigation.navigate('Presupuesto');
                    } }>
                        <View>
                            <Image source={require('../../../assets/icons/home-button-budget.jpg')} style={styles.homeButtonLargeImage}/>
                            <Text style={styles.homeButtonText}>PRESUPUESTO</Text>
                        </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>
      </ScrollView>
      </View>
    )
  }
}
