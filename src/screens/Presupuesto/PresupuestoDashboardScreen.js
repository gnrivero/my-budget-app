import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { presupuestos } from '../../data/presupuestos/presupuestosDataArray';
import AddPresupuestoButton from '../../components/PresupuestoButton/AddPresupuestoButton';
import AddCardButton from '../../components/CardButton/AddCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class PresupuestoDashboardScreen extends React.Component {

  static navigationOptions = {
      title: 'Presupuesto Dashboard'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  onPressCuenta = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('PresupuestoInfo');
  };

  renderPresupuesto = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCard(item)}>
        <View style={styles.cardItemContainer}>
          <Text style={styles.cardName}>{item.mes}</Text>
          <View style={styles.infoContainer}>
            {/* <View style={styles.info}>
              <Text style={styles.infoCard}>{item.mes}</Text>
            </View> */}
            <View style={styles.info}>
              <Text style={styles.infoCard}>Presupuesto Total:</Text><Text>{item.presupuestoTotal}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Presupuesto Consumido:</Text><Text>{item.presupuestoConsumido}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Inicio Periodo:</Text><Text>{item.startDate}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Cierre Periodo:</Text><Text>{item.closeDate}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Balance:</Text><Text>{item.balance}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );

  render() {

    return (
      <ScrollView>
        <View style={styles.infoContainer}>
         {/* <AddPresupuestoButton
           onPress={() => {
             let title = 'Agregar Presupuesto';
             this.props.navigation.navigate('PresupuestoInfo', {title});
           }}
         /> */}
         {/* <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'
          onPress={() => this.onPressCuenta()}
        >
          <View style={Dashboardstyles.container}>
          <Text style={Dashboardstyles.text}>Nuevo Presupuesto</Text>
          </View>
        </TouchableHighlight> */}

<Image style={styles.photoCards} source={require('../../data/budget.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nuevo Presupuesto'}
              onPress={() => {
                let title = 'Nuevo Presupuesto';
                this.props.navigation.navigate('PresupuestoInfo', {title});
              }}
            />
         </View>

        </View>
        <FlatList
           data={presupuestos}
           renderItem={this.renderPresupuesto}
           keyExtractor={item => `${item.id}`}
          />
        
      </ScrollView>

// <Text style={{fontSize: 30, color: 'white', textAlign:'center', backgroundColor:'rgba(73,182,77,0.9)'}}>+ Presupuesto</Text>
      
    );
  }
}

const Dashboardstyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    // backgroundColor: '#2cd18a'
  },
  text: {
    fontSize: 14,
    color: '#2cd18a'
  }
});