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
import {toModel, toView} from '../../utils/DateConverter';
import styles from './styles';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';


import LoanService from '../../service/LoanService';
import AccountService from '../../service/AccountService';

export default class AddLoanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.loanService = new LoanService();
    this.accountService = new AccountService();
    this.state = {
                  detail:'',            
                  lender:false,
                  date: '',
                  opcionCurrency:0,
                  currency:'ARS',
                  amount: '',
                  monthlyFee: '',
                  amountFees: '',
                  debit:false,
                  account:'',
                  expirationDate:''
                };
  }
/*
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
  */
  onChangeLender = ({ value }) =>{
    let lender = value
    this.setState({lender});
    if(lender==0){
      
    this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts,
        account: ''
      })
    });
    
    }else{
      this.setState({account:'',
          monthlyFee:'',
          amountFees:'',
          expirationDate:''});
    }
  }

  onChangeCurrency = ({ value }) =>{
    let currency = value
    this.setState({currency});
    this.accountService.getAccountBycurrencyCodeCombo(currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts,
        account: ''
      })
    });
  }

  onChangeDebit = ({ value }) =>{
    let debit = value
    this.setState({debit});
    if(debit){
      this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
      .then((accounts) => {
        this.setState({
          allAccount: accounts,
          account: ''
        })
      });
    }
  }

  
  componentDidMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    console.log("id investment");
    console.log(id);
    if( id != undefined ){
      /*
      this.investmentService.getInvestmentById(id)
      .then((investment) => {
        console.log(investment);
            this.setState({
                  id:investment.id,
                  detail: investment.detail,
                  type: investment.investmentTypeId,
                  opcionCurrency:investment.currencyCode == 'ARS' ? 0:1,
                  currency: investment.currencyCode,
                  amount:investment.amount,
                  amountCredited:investment.amountCredited,
                  dueDate:toView(investment.dueDate),
                  date:toView(investment.date),
                  account:investment.accountId,
                  symbol: investment.symbol
            });
        }
      );
      modificar
       */
    }

    this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts
      })
    });

 }

buttonPressed(){
  /*Alert.alert(this.state.detail +" - " + this.state.lender +" - "+ this.state.currency+" - " + this.state.amount +" - " +
  this.state.amountFees +" - " +this.state.monthlyFee +" - " +this.state.debit + " - "+this.state.account+ " - "+this.state.expirationDate); 
  console.log("lender");
  console.log(this.state.lender);
  console.log(this.state.lender==true);
  console.log(this.state.lender==false);
  console.log("debit");
  console.log(this.state.debit);
  console.log(this.state.debit==false);
  console.log(this.state.debit==true);
  */
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.detail|| this.state.detail=='') || (!this.state.currency || this.state.currency=='') ||
  (!this.state.amount || this.state.amount=='') || (!this.state.date || this.state.date=='') )
  {
    Alert.alert("Complete los campos faltantes del psestamo");
  }
  else{ 
    if(this.state.lender==false){
      if ((!this.state.amountFees || this.state.amountFees=='') || (!this.state.monthlyFee || this.state.monthlyFee=='') ||
      (!this.state.expirationDate || this.state.expirationDate=='')){
        Alert.alert("Complete los campos faltantes del prestamo")
      }else if(this.state.debit==true){
        if( (!this.state.account || this.state.account=='')){
          Alert.alert("Complete los campos faltantes del prestamo")
        }
        else if(!decimalreg.test(this.state.amount))
          Alert.alert("ingrese un valor valido en el monto"); 
        else if(!decimalreg.test(this.state.amountFees))
          Alert.alert("ingrese un valor valido en la cuota");
         else{

          this.loanService.createLoan(
            this.state.detail,
            (this.state.lender==true)?1:0,
            this.state.currency,
            toModel(this.state.date),
            this.state.amount,
            toModel(this.state.expirationDate),
            this.state.monthlyFee,
            this.state.amountFees,
            this.state.account);

          setTimeout(
            () => { this.props.navigation.navigate('Loans',{name: 'Prestamos'}); },
            1000
          )
        }
      }else{
        if(!numeroreg.test(this.state.monthlyFee))
          Alert.alert("ingrese un valor valido en la cantidad de cuotas"); 
        else if(!decimalreg.test(this.state.amount))
          Alert.alert("ingrese un valor valido en el monto"); 
        else if(!decimalreg.test(this.state.amountFees))
          Alert.alert("ingrese un valor valido en la cuota");
        else{
          this.loanService.createLoan(
            this.state.detail,
            (this.state.lender==true)?1:0,
            this.state.currency,
            toModel(this.state.date),
            this.state.amount,
            toModel(this.state.expirationDate),
            this.state.monthlyFee,
            this.state.amountFees);

          setTimeout(
            () => { this.props.navigation.navigate('Loans',{name: 'Prestamos'}); },
            1000
          )

        }
      }
    }else{
      if(!decimalreg.test(this.state.amount))
          Alert.alert("ingrese un valor valido en el monto"); 
      else{
        this.loanService.createLoan(
          this.state.detail,
          (this.state.lender==true)?1:0,
          this.state.currency,
          toModel(this.state.date),
          this.state.amount);

        setTimeout(
          () => { this.props.navigation.navigate('Loans',{name: 'Prestamos'}); },
          1000
        )
      }
    }
  }
}
  
render() {
  const { navigation } = this.props;
  const item = navigation.getParam('category');
  const accountsArray = [];//getAccounts();

  const optionsLender = [
    { label: 'Prestamista', value: true},
    { label: 'Prestatario', value: false }
  ];
  const optionsDebit = [
    { label: 'Si', value: true},
    { label: 'No', value: false }
  ];

  const optionsCurrency = [
    { label: 'Pesos', value: 1},
    { label: 'Dolares', value: 2 }
  ];

    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoLoans} source={require('../../data/loans.jpg')} />
        </View>
        <Text style={styles.cuentasInfo}>Nuevo Prestamo:</Text>
        <View style={{marginBottom: 40, padding:10}}>
          <TextInput 
              style ={styles.input}
              placeholder="Referencia"
              onChangeText={(detail) => this.setState({detail})}
              value={this.state.detail}
          />
          <View style={{flexDirection:'row'}}>
            <Text style={styles.cuentasInfo}>Fecha de inicio</Text>
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
          </View>
          <SwitchSelector options={optionsLender} initial={1} onPress={value => this.onChangeLender({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
          <View style={{padding:5}}></View>
          <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />

          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Importe total"
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
          />
          
          {!this.state.lender ? (
            <View>
              <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder="Cantidad de cuotas"
                onChangeText={(monthlyFee) => this.setState({monthlyFee})}
                value={this.state.monthlyFee}
              />
              <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder="Importe Cuota"
                onChangeText={(amountFees) => this.setState({amountFees})}
                value={this.state.amountFees}
              />
              <View>
                <View style={{flexDirection: 'row', flex:1, padding:10}}>
                <Text style={styles.cuentasInfo}>Fecha 1er cuota</Text>
                <DatePicker
                  style={{marginBottom: 10}}
                  date={this.state.expirationDate} //initial date from state
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
                  onDateChange={(date) => {this.setState({expirationDate: date})}}
                />
                </View>
              </View>
              <View style={{padding:10}}>
                <Text style={styles.cuentasInfo}>Debito en cuenta</Text>
                <SwitchSelector options={optionsDebit} initial={1} onPress={value => this.onChangeDebit({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
                {this.state.debit ? (
                  <View style={{padding:10}}>
                    <Dropdown
                      placeholder='Seleccione cuenta'
                      data={this.state.allAccount}
                      value={this.state.account}
                      onChangeText={(cuenta) => this.setState({account:cuenta})}
                      style ={styles.input}
                  />
                  </View>
                ) : null}
              </View>
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
