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

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';
import {toModel} from '../../utils/DateConverter';

import TransactionTypeService from '../../service/TransactionTypeService';
import TransactionService from '../../service/TransactionService';
import AccountService from '../../service/AccountService';

export default class AddIncomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.transactionTypeService = new TransactionTypeService();
    this.accountService = new AccountService();
    this.transactionService = new TransactionService();
    this.state = {
                  id:'',
                  date: '',
                  typeIncome: '',
                  account:'',
                  amount: 0,
                  cash: true,
                  monthly: true,
                  currency: 'ARS',
                  detail: '',
                  allAccount: [],
                  allTransactionType: []
                };
  }
 
  componentDidMount(){
    this.transactionTypeService.getTransactionType('I')
      .then((transactionType) => {
        this.setState({
          allTransactionType: transactionType
        })
    });
    
    this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts
      })
    });
 }
 
  onChangeMonthly = ({ value }) =>{
    let monthly = value
    this.setState({monthly});
    if(monthly){
     /* 
      */
    }
  }

  onChangeCash = ({ value }) =>{
    let cash = value;
    this.setState({cash});
    if(cash){
      this.setState({account:''});
    }else{
      this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
      .then((accounts) => {
        this.setState({
          allAccount: accounts
        })
      });
      
    }
  }

  onChangeCurrency = ({ value }) =>{
    let currency = value;
    this.setState({currency});
    this.accountService.getAccountBycurrencyCodeCombo(currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts
      })
    });
  }

buttonPressed(){
  //Alert.alert(this.state.typeIncome +" - "+this.state.date +" - " +this.state.detail +" - " +this.state.monthly +" - "+this.state.cash +" - " + this.state.currency +" - " +this.state.amount +" - " +this.state.account); 
    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.typeIncome|| this.state.typeIncome=='') || (!this.state.date|| this.state.date=='') || (!this.state.detail || this.state.detail=='') ||
  (!this.state.amount || this.state.amount==0))
  {
    Alert.alert("Complete los campos faltantes del ingreso")
  }
  else if(!decimalreg.test(this.state.amount))
    Alert.alert("ingrese un valor valido para el monto"); 
  else if(!this.state.cash){
      if((!this.state.account  || this.state.account=='')){
      Alert.alert("Complete los campos faltantes del ingreso")
    }
    else{
      Alert.alert("Grabar con Cuenta");
      this.transactionService.createTransaction('I',
        this.state.detail,
        this.state.cash,
        this.state.currency,
        this.state.typeIncome,
        toModel(this.state.date),
        this.state.amount,
        this.state.account,
        this.state.monthly);
      
        setTimeout(
          () => { this.props.navigation.navigate('Income',{name: 'Ingresos'}); },
          1000
        )
    }
  } else {
    Alert.alert("Grabar Efectivo");
    this.transactionService.createTransaction('I',
      this.state.detail,
      this.state.cash,
      this.state.currency,
      this.state.typeIncome,
      toModel(this.state.date),
      this.state.amount,
      this.state.account,
      this.state.monthly);

      setTimeout(
        () => { this.props.navigation.navigate('Income',{name: 'Ingresos'}); },
        1000
      )
    }
  }

  
  render() {
    //const mes = new Date().getMonth();
    const { navigation } = this.props;
    const item = navigation.getParam('category');

    let  transactionTypeList  = this.state.allTransactionType.map( (v,k) => {
      return {value:v.id, label:v.name};
    });

    const optionsMontly = [
      { label: 'Mensual', value: true},
      { label: 'Ocasional', value: false }
    ];
  const optionsCash = [
    { label: 'En Efectivo', value: true},
    { label: 'En Cuenta', value: false }
  ];

  const optionsCurrency = [
    { label: 'Pesos', value: 'ARS'},
    { label: 'Dolares', value: 'USD' }
  ];

    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoIncome} source={require('../../data/income.jpg')} />
          </View>
          <Text style={styles.cuentasInfo}>Nuevo ingreso:</Text>
          <View style={{marginBottom: 40, padding:10}}>
          <Dropdown
              placeholder="Seleccione tipo de ingreso"
              data={transactionTypeList}
              value={this.state.typeIncome}
              onChangeText={(typeIncome) => this.setState({typeIncome})}
              style ={styles.input}
            />
            <DatePicker
              style={{marginBottom: 10}}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="Fecha"
              format="DD-MM-YYYY"
              minDate="01-01-2020"
              
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
             <TextInput 
              style ={styles.input}
              placeholder="Detalle"
              onChangeText={(detail) => this.setState({detail})}
              value={this.state.detail}
            />
            <SwitchSelector options={optionsMontly} initial={0} onPress={value => this.onChangeMonthly({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <SwitchSelector options={optionsCash} initial={0} onPress={value => this.onChangeCash({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            
            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="importe"
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
            />
            {!this.state.cash?(
              <Dropdown
                placeholder='Seleccione cuenta'
                data={this.state.allAccount}
                value={this.state.account}
                onChangeText={(cuenta) => this.setState({account:cuenta})}
                style ={styles.input}
              />
              
            ): null
            }
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
