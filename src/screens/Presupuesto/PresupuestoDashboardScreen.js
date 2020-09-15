import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { presupuestos } from '../../data/presupuestos/presupuestosDataArray';
import AddPresupuestoButton from '../../components/PresupuestoButton/AddPresupuestoButton';

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

        </View>
        <FlatList
           data={presupuestos}
           renderItem={this.renderPresupuesto}
           keyExtractor={item => `${item.id}`}
          />
        <TouchableHighlight 
          onPress={() => this.onPressCuenta()}
        >
          <Text style={{fontSize: 30, color: 'white', textAlign:'center', backgroundColor:'green'}}>+ Presupuesto</Text>
        </TouchableHighlight>
      </ScrollView>
      
    );
  }
}