import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import {
  getEntities,
  getCategoryName
} from '../../data/MockDataAPI';
import { Dropdown } from 'react-native-material-dropdown';

export default class CuentaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);

    this.state = {nombreCuenta: '',
                  cbu: '',
                  saldoInicial: '',
                  numerosTarjeta: '',
                  vencimientoTarjeta:'',
                  entidad: ''};
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

buttonPressed(){
  Alert.alert(this.state.entidad +" - "+this.state.cbu +" - " +this.state.nombreCuenta +" - "+this.state.saldoInicial +" - " + this.state.numerosTarjeta +" - " +this.state.vencimientoTarjeta); 
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.entidad|| this.state.entidad=='') || (!this.state.cbu|| this.state.cbu=='') || (!this.state.nombreCuenta || this.state.nombreCuenta=='') ||
  (!this.state.saldoInicial || this.state.saldoInicial=='') || (!this.state.numerosTarjeta  || this.state.numerosTarjeta=='') || (!this.state.vencimientoTarjeta || this.state.vencimientoTarjeta==''))
  {
    Alert.alert("Complete los campos faltantes")
  }else{
    if(!decimalreg.test(this.state.saldoInicial))
    Alert.alert("ingrese un valor valido en el saldo");  
    else if(!numeroreg.test(this.state.numerosTarjeta) || this.state.numerosTarjeta.length!=4 )
      Alert.alert("ingrese un valor valido en el numero de tarjeta");  
    else if(!numeroreg.test(this.state.vencimientoTarjeta) || this.state.vencimientoTarjeta.length!=6 )
      Alert.alert("ingrese un valor valido en el vencimiento de tajeta");  
    else 
    Alert.alert("Grabar");
    
  }

} 
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const categoryName = navigation.getParam('title');
    const entitiesArray = getEntities();
   
    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
          </View>
          <Text style={styles.cuentasInfo}>Nueva cuenta:</Text>
          <View style={{marginBottom: 40, padding:10}}>
            <TextInput
              style ={styles.input}
              placeholder="Nombre referencia cuenta"
              onChangeText={(nombreCuenta) => this.setState({nombreCuenta})}
              value={this.state.nombreCuenta}
            />
            <Dropdown
              placeholder='Seleccione entidad'
              data={entitiesArray}
              value={this.state.entidad}
              onChangeText={(entidad) => this.setState({entidad})}
              style ={styles.input}
            />
          
            <TextInput
              style ={styles.input}
              placeholder="CBU/CVU"
              onChangeText={(cbu) => this.setState({cbu})}
              value={this.state.cbu}
            />

            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Saldo inicial"
              onChangeText={(saldoInicial) => this.setState({saldoInicial})}
              value={this.state.saldoInicial}
            />
            <TextInput style={{height:30}}>Tarjeta de debito</TextInput>
            <TextInput keyboardType='decimal-pad'
              maxLength ={4}
              style ={styles.input}
              placeholder="Ultimos 4 numeros de la tarjeta de debito"
              onChangeText={(numerosTarjeta) => this.setState({numerosTarjeta})}
              value={this.state.numerosTarjeta}
            />
            <TextInput keyboardType='decimal-pad'
              maxLength ={6}
              style ={styles.input}
              placeholder="Vencimiento MMAAAA"
              onChangeText={(vencimientoTarjeta) => this.setState({vencimientoTarjeta})}
              value={this.state.vencimientoTarjeta}
            />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          
          onPress={() =>this.buttonPressed() }
        >
          <Text style={{fontSize: 40, color: 'white', textAlign:'center'}}>Guardar</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}
