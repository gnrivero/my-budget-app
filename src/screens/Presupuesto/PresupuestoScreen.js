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

    this.state = {periodo: '',
                  movimiento: '',
                  rubro: '',
                  monto: '',
                }
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
          <Text >Nuevo Presupuesto:</Text>
          </View>
          <View>
          <Text>Ingrese Periodo</Text>   
          <TextInput  placeholder="MMAAAA" style={stylePresupuesto.textInput}></TextInput> 
          </View>
          <View>
          <Text style={stylePresupuesto.addBox}>Rubros</Text>
          <View style={styles.cuentasInfo}> 
          <Text>Educacion</Text>       
          <TextInput  placeholder="MMAAAA" style={stylePresupuesto.textInput}></TextInput> 
          </View>
          </View>
          <View style={stylePresupuesto.addBox}>
          <TextInput  placeholder="MMAAAA" style={stylePresupuesto.textInput}></TextInput> 
          {/* <TextInput placeholder="Movimiento" style={stylePresupuesto.textInput}></TextInput> */}
          <TextInput placeholder="Rubro" style={stylePresupuesto.textInput}></TextInput>
          <TextInput placeholder="Monto" style={stylePresupuesto.textInput}></TextInput>
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