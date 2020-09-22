import React from 'react';
import {
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
  getEntities, getCuentadId
} from '../../data/MockDataAPI';
import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';


export default class CuentaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);

    this.state = {id:'',
                  nombreCuenta: '',
                  cbu: '',
                  saldoInicial: '',
                  numerosTarjeta: '',
                  vencimientoTarjeta:'',
                  entidad: '',
                  currency:1,
                  agregarTarjeta: false};
  }

  
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    if(id!= undefined){
      this.getCuenta(id);
    }
    /*
    let id = this.props.navigation.state.params.category
    let result;
    try {
      result = await axios.request({
        method: 'GET',
        url: `https://developers.zomato.com/api/v2.1/search?category=${id}`,
        headers: {
          'Content-Type': 'application/json',
          'user-key': "a31bd76da32396a27b6906bf0ca707a2",
        },
      })
    } catch (err) {
      err => console.log(err)
    }
    this.setState({
      isLoading: false,
      data: result.data.restaurants
    })
    */
  }
  
  getCuenta(id){
  console.log('GetCuenta');
  let cuenta =getCuentadId(id);
  console.log(cuenta);
  this.setState({id: cuenta.id,
                  nombreCuenta: cuenta.nombreCuenta,
                  cbu: cuenta.cbu,
                  saldoInicial: cuenta.saldoInicial,
                  numerosTarjeta: cuenta.numerosTarjeta,
                  entidad: cuenta.entidad,
                  currency: cuenta.currency,
                  agregarTarjeta:cuenta.agregarTarjeta
                });
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
  onChangeCard = ({ value }) =>{
    let agregarTarjeta = value
    //Alert.alert('Call onPress with value:' + {agregarTarjeta}    );
    this.setState({agregarTarjeta});
    if(agregarTarjeta){
      this.setState({vencimientoTarjeta:'',
                        numerosTarjeta:''});
    }
  }
  onChangeCurrency = ({ value }) =>{
    let currency = value
    //Alert.alert('Call onPress with value:' + currency==1?'Pesos':currency==2?'Dolares':null   );
    this.setState({currency});
    if(currency){
     /* 
      this.setState({vencimientoTarjeta:'',
                        numerosTarjeta:''});
      */
    }
  }

buttonPressed(){
  //Alert.alert(this.state.entidad +" - "+this.state.cbu +" - " +this.state.nombreCuenta +" - "+this.state.saldoInicial +" - " + this.state.numerosTarjeta +" - " +this.state.vencimientoTarjeta); 
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.entidad|| this.state.entidad=='') || (!this.state.cbu|| this.state.cbu=='') || (!this.state.nombreCuenta || this.state.nombreCuenta=='') ||
  (!this.state.saldoInicial || this.state.saldoInicial==''))
  {
    Alert.alert("Complete los campos faltantes de la cuenta")
  }
   else if(!decimalreg.test(this.state.saldoInicial))
    Alert.alert("ingrese un valor valido en el saldo"); 
   
    else if(this.state.agregarTarjeta){
       if((!this.state.numerosTarjeta  || this.state.numerosTarjeta=='') || (!this.state.vencimientoTarjeta || this.state.vencimientoTarjeta=='')){
        Alert.alert("Complete los campos faltantes de la cuenta")
      }
      else if(!numeroreg.test(this.state.numerosTarjeta) || this.state.numerosTarjeta.length!=4 )
        Alert.alert("ingrese un valor valido en el numero de tarjeta");  
      else if(!numeroreg.test(this.state.vencimientoTarjeta) || this.state.vencimientoTarjeta.length!=4 || 
      (this.state.vencimientoTarjeta.slice(0, 2)>12)|| (this.state.vencimientoTarjeta.slice(0, 2)<1) || (this.state.vencimientoTarjeta.slice(2, 4)<20))
        Alert.alert("ingrese un valor valido en el vencimiento de tajeta");  
      else
        Alert.alert("Grabar con tarjeta");
    }  
    else 
      Alert.alert("Grabar");
 }
  
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const categoryName = navigation.getParam('title');
    const entitiesArray = getEntities();
    const options = [
      { label: 'SI', value: true},
      { label: 'NO', value: false }
  ];
  const optionsCurrency = [
    { label: 'Pesos', value: 1},
    { label: 'Dolares', value: 2 }
  ];

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
            <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <Text style={{height:30}}>Tarjeta de debito</Text>
            <SwitchSelector options={options} initial={1} onPress={value => this.onChangeCard({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
           
            {this.state.agregarTarjeta ? (
            <View style={{padding:10}}>
              <TextInput keyboardType='decimal-pad'
                maxLength ={4}
                style ={styles.input}
                placeholder="Ultimos 4 numeros de la tarjeta de debito"
                onChangeText={(numerosTarjeta) => this.setState({numerosTarjeta})}
                value={this.state.numerosTarjeta}
              />
              <TextInput keyboardType='decimal-pad'
                maxLength ={4}
                style ={styles.input}
                placeholder="Vencimiento MMAA"
                onChangeText={(vencimientoTarjeta) => this.setState({vencimientoTarjeta})}
                value={this.state.vencimientoTarjeta}
              />
            </View>
            ) : null}
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
