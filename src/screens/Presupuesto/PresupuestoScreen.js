import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {
  getIngredientUrl,
  getCuentas,
  getCategoryName, getMovimientos
} from '../../data/MockDataAPI';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import { presumocks } from '../../data/presupuestos/presupuestosDataArray';

export default class PresupuestoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  onPressCuenta = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('Cuenta');
  };

  renderCuentas = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.CuentasItemContainer}>
        <Image source={require('../../../assets/icons/cuenta.png')} style={styles.CuentasItemIcon} /> 
        <Text style={styles.CuentaItemText}>{item.alias}</Text>
        <Text style={styles.CuentaItemTextDetail}>{item.entidad}</Text>
        <Text style={styles.CuentaItemText}>$ {item.saldo}</Text>
      </View>
    </TouchableHighlight>
);


renderPresupuesto = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCard(item)}>
      <View style={styles.cardItemContainer}>
        <Text style={styles.cardName}>{item.Periodo}</Text>
        <View style={styles.infoContainer}>
          {/* <View style={styles.info}>
            <Text style={styles.infoCard}>{item.mes}</Text>
          </View> */}
          <View style={styles.info}>
            <Text style={styles.infoCard}>Periodo:</Text><Text>{item.presupuestoTotal}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoCard}>Movimiento:</Text><Text>{item.presupuestoConsumido}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoCard}>Rubro:</Text><Text>{item.startDate}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoCard}>Monto:</Text><Text>{item.closeDate}</Text>
          </View>
          {/* <View style={styles.info}>
            <Text style={styles.infoCard}>Balance:</Text><Text>{item.balance}</Text>
          </View> */}
        </View>
      </View>
    </TouchableHighlight>
  );


  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    // const movimientosArray = getMovimientos();
    const categoryName = navigation.getParam('title');
    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
          </View>
         
          <View style={{marginBottom: 40, padding: 10}}>
          <Text style={styles.cuentasInfo}>Nuevo Presupuesto:</Text>
          </View>
          <View style={stylePresupuesto.addBox}>
          <TextInput  placeholder="Periodo" style={stylePresupuesto.textInput}></TextInput> 
          <TextInput placeholder="Movimiento" style={stylePresupuesto.textInput}></TextInput>
          <TextInput placeholder="Rubro" style={stylePresupuesto.textInput}></TextInput>
          <TextInput placeholder="Monto" style={stylePresupuesto.textInput}></TextInput>
          <Button title="Agregar"></Button>
          </View>
          <View style={{marginBottom: 40, padding: 10}}>
          <Text style={styles.cuentasInfo}>Presupuesto:</Text>
          </View>
          <View style={{marginBottom: 40, padding: 10}}>
          <FlatList
           data={presumocks}
           renderItem={this.renderPresupuesto}
           keyExtractor={item => `${item.id}`}
          />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          onPress={() => this.onPressCuenta()}
        >
          <Text style={stylePresupuesto.botonPeriodo}>Guardar</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}

const stylePresupuesto = StyleSheet.create({
    addBox: {
        marginBottom: 40,
        justifyContent:'space-around',
        flexDirection:'row',
        padding: 30,
    },
    textInput: {
        width:'25%',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 15
    },
    botonPeriodo: {
        fontSize: 30,
        color: 'white',
        textAlign:'center',
        backgroundColor: 'green',
    }
})