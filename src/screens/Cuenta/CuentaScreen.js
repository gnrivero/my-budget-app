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

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';


export default class CuentaScreen extends React.Component {

  accountService;
  bankService;

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.accountService = new AccountService();
    this.bankService = new BankService();
    this.state = {
        //Accounts
        id:'',
        nombreCuenta: '',
        cbuCvu: '',
        saldo: '0',
        numerosTarjeta: '',
        vencimientoTarjeta:'',
        entidad: '',
        currency: 'ARS',
        opcionCurrency:0,
        agregarTarjeta: false,
        opcionDebito:1,
        //Banks
        allBanks: []
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    if( id != undefined ){
      this.accountService.getAccountById(id)
      .then((account) => {
            this.setState({
                id: account.id,
                nombreCuenta: account.name,
                cbuCvu: account.identificationNumber,
                saldo: account.balance,
                entidad: account.bankId,
                currency: account.currencyCode,
                //numerosTarjeta:account.numerosTarjeta
                //vencimientoTarjeta: account.vencimientoTarjeta,
                //opcionDebito:account.numerosTarjeta!=''?0:1,
                //opcionCurrency:account.currency=='ARS'?0:1,
                //agregarTarjeta:account.numerosTarjeta!=''?true:false
            });
        }
      );
    }
  }

  componentDidMount(){
     this.bankService.getAllBanks()
       .then((banks) => {
         this.setState({
           allBanks: banks
         })
     });

  onChangeCard = ({ value }) =>{
    let agregarTarjeta = value
    this.setState({agregarTarjeta});
    if(agregarTarjeta){
      this.setState({vencimientoTarjeta:'',
                        numerosTarjeta:''});
    }
  }

  onChangeCurrency = ({ value }) => {
    let currency = value
    this.setState({currency});
  }

buttonPressed() {

  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;

  if ((!this.state.entidad|| this.state.entidad=='')
        || (!this.state.cbuCvu || this.state.cbuCvu=='')
        || (!this.state.nombreCuenta || this.state.nombreCuenta == '')
        || (!this.state.saldo || this.state.saldo=='')) {

        Alert.alert("Complete los campos faltantes de la cuenta")

  } else if (!decimalreg.test(this.state.saldo)) {

        Alert.alert("ingrese un valor valido en el saldo");

  } else if (this.state.agregarTarjeta) {
       if((!this.state.numerosTarjeta || this.state.numerosTarjeta=='')
            || (!this.state.vencimientoTarjeta || this.state.vencimientoTarjeta=='')) {
        Alert.alert("Complete los campos faltantes de la cuenta")
      } else if (!numeroreg.test(this.state.numerosTarjeta)
                    || this.state.numerosTarjeta.length!=4 ) {
        Alert.alert("ingrese un valor valido en el numero de tarjeta");  
      } else if (!numeroreg.test(this.state.vencimientoTarjeta)
                    || this.state.vencimientoTarjeta.length!=4
                    || (this.state.vencimientoTarjeta.slice(0, 2)>12)
                    || (this.state.vencimientoTarjeta.slice(0, 2)<1)
                    || (this.state.vencimientoTarjeta.slice(2, 4)<20)) {
        Alert.alert("ingrese un valor valido en el vencimiento de tajeta");  
      } else {
        Alert.alert("Grabar con tarjeta");
      }
    } else {

      if( this.state.id !== undefined ){
        console.log("Im Editing");
        console.log(this.state);
        this.accountService.updateAccount(
                        this.state.id,
                        this.state.nombreCuenta,
                        this.state.currency,
                        this.state.entidad,
                        this.state.cbuCvu,
                        null,
                        this.state.saldo);
      } else {
        console.log("Im Creating a New One");
        this.accountService.createAccount(
                this.state.nombreCuenta,
                this.state.currency,
                this.state.entidad,
                this.state.cbuCvu,
                null,
                this.state.saldo);
      }



        this.props.navigation.navigate('Cuentas');
    }
 }

  render() {
    const { navigation } = this.props;
    const categoryName = navigation.getParam('title');

    const options = [
      { label: 'SI', value: true},
      { label: 'NO', value: false }
    ];

    const optionsCurrency = [
      { label: 'Pesos', value: 'ARS' },
      { label: 'Dólares', value: 'USD' }
    ];

    let banksList = this.state.allBanks.map( (v,k) => {
      return {value:v.id, label:v.name};
    });

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
              placeholder="Nombre de referencia la Cuenta"
              onChangeText={(nombreCuenta) => this.setState({nombreCuenta})}
              value={this.state.nombreCuenta}
            />

            <Dropdown
              placeholder='Seleccione Entidad'
              data={banksList}
              value={this.state.entidad}
              onChangeText={(entidad) => this.setState({entidad})}
              style ={styles.input}
            />

            <TextInput
              style ={styles.input}
              placeholder="CBU/CVU"
              onChangeText={(cbuCvu) => this.setState({cbuCvu})}
              value={this.state.cbuCvu}
            />

            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Saldo Inicial"
              onChangeText={(saldo) => this.setState({saldo})}
              value={String(this.state.saldo)}
              editable={this.state.id==''?true:false}
            />
            {/*<SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />*/}
            <SwitchSelector disabled={this.state.id!=''?true:false} options={optionsCurrency} initial={this.state.opcionCurrency} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <Text style={{height:30}}>Tarjeta de debito</Text>
            <SwitchSelector  options={options} initial={this.state.opcionDebito} onPress={value => this.onChangeCard({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
           
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
        <TouchableHighlight onPress={() =>this.buttonPressed() } >
          <Text style={{fontSize: 40, color: 'white', textAlign:'center'}}>Guardar</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}