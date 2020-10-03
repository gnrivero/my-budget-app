import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Alert,
  Switch
} from 'react-native';
import styles from './styles';

import { Dropdown } from 'react-native-material-dropdown';
import AccountService from '../../service/AccountService';
import BankService from '../../service/BankService';
import { searchStateError } from './validator/AccountScreenValidator';

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
    this.optionCurrency =false;
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
        optionCurrency:false,
        //Banks
        allBanks: []
    };
  }

  componentDidMount(){
     const { navigation } = this.props;
     const id = navigation.getParam('id');
     if( id != undefined ){
       this.accountService.getAccountById(id)
       .then((account) => {
        this.optionCurrency = account.currencyCode == "ARS"? false:true;
             this.setState({
                 id: account.id,
                 nombreCuenta: account.name,
                 cbuCvu: account.identificationNumber,
                 saldo: account.balance,
                 entidad: account.bankId,
                 currency: account.currencyCode,
                 numerosTarjeta: account.cardLastFourNumbers,
                 vencimientoTarjeta: account.cardExpiryDate,
                 optionCurrency:this.optionCurrency,
             });
         }
       );
     }


     this.bankService.getAllBanks()
       .then((banks) => {
         this.setState({
           allBanks: banks
         })
     });
  }

  onChangeCurrency = ({ value }) => {
    let currency = value?'USD':'ARS';
    this.setState({currency: currency,
                   optionCurrency: value});
    
  }

buttonPressed() {

    var error = searchStateError(this.state);

    console.log(this.state);

    if (error !== null) {
        Alert.alert(error);
        return;
    }

    if( this.state.id !== undefined && this.state.id != '' ) {

        this.accountService
            .updateAccountWithDebitCard(
                this.state.id,
                this.state.nombreCuenta,
                this.state.currency,
                this.state.entidad,
                this.state.cbuCvu,
                this.state.saldo,
                this.state.numerosTarjeta,
                this.state.vencimientoTarjeta
            );
    } else {

        this.accountService
            .createAccountWithDebitCard(
                this.state.nombreCuenta,
                this.state.currency,
                this.state.entidad,
                this.state.cbuCvu,
                this.state.saldo,
                this.state.numerosTarjeta,
                this.state.vencimientoTarjeta
            );
    }
    setTimeout(
      () => { this.props.navigation.navigate('Cuentas',{name: 'Cuentas'}); },
      1000
    )
  }

  render() {
    const { navigation } = this.props;
    const categoryName = navigation.getParam('title');

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

            <View style={{flexDirection:'row'}}>
              <Text>Pesos</Text>
              <Switch
                disabled={this.state.id!=''?true:false}
                trackColor={{ false: "#565656;", true: "#565656;" }}
                thumbColor={this.state.optionCurrency ? "#2cd18a" : "#2cd18a"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={value => this.onChangeCurrency({value})}
                value={this.state.optionCurrency}
              />
              <Text>Dolares</Text>
            </View>

            <View style={{padding:5}}></View>

            <Text style={{height:30}}>Tarjeta de debito</Text>
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