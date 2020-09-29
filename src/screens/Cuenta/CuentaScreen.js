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
             this.setState({
                 id: account.id,
                 nombreCuenta: account.name,
                 cbuCvu: account.identificationNumber,
                 saldo: account.balance,
                 entidad: account.bankId,
                 currency: account.currencyCode,
                 numerosTarjeta: account.cardLastFourNumbers,
                 vencimientoTarjeta: account.cardExpiryDate,
                 opcionCurrency: account.currencyCode == 'ARS' ? 0:1,
                 agregarTarjeta: account.cardLastFourNumbers != '' ? true : false
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

  onChangeCard = ({ value }) =>{
    let agregarTarjeta = value
    this.setState({agregarTarjeta});
    if(agregarTarjeta){
      this.setState({vencimientoTarjeta:'', numerosTarjeta:''});
    }
  }

  onChangeCurrency = ({ value }) => {
    let currency = value
    this.setState({currency});
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
      2000
    )
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