import React from 'react';
import {
  Switch,
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
    this.optionCurrency =false;
    this.optionLender =false;
    this.optionDebit =false;
    this.state = {
                  detail:'',            
                  lender:false,
                  optionLender:false,
                  date: '',
                  optionCurrency:false,
                  currency:'ARS',
                  amount: '',
                  monthlyFee: '',
                  amountFees: '',
                  debit:false,
                  optionDebit:false,
                  account:'',
                  expirationDate:''
                };
  }

  componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    console.log("id Loan");
    console.log(id);
    if( id != undefined ){
      this.loanService.getLoanById(id)
      .then((loan) => {
        console.log(loan);
        this.optionCurrency = loan.currencyCode == "ARS"? false:true;
        this.optionLender = loan.lender == 0? false:true;
        this.optionDebit = loan.accountId == null? false:true;
        console.log(this.optionCurrency);
            this.setState({
                  id:loan.id,    
                  detail:loan.detail, 
                  lender:this.optionLender,
                  optionLender:this.optionLender,
                  optionCurrency:this.optionCurrency,
                  date:toView(loan.date),
                  amount:loan.amount,
                  currency: loan.currencyCode,
                  monthlyFee: loan.monthlyFee,
                  amountFees: loan.amountFees,
                  optionDebit:this.optionDebit,
                  debit:this.optionDebit,

                  account:loan.accountId,
                  expirationDate:toView(loan.expirationDate)
            });

        this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
          .then((accounts) => {
            this.setState({
            allAccount: accounts
            })
          });
        }
      );
    }
  }

  onChangeLender = ({ value }) =>{
    let lender = value;
    this.setState({lender:lender,
                  optionLender:value});
    if(lender){
      
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
    console.log(this.state)
  }

  onChangeCurrency = ({ value }) =>{
    let currency = value?'USD':'ARS';
    this.setState({currency: currency,
                   optionCurrency: value});
    this.accountService.getAccountBycurrencyCodeCombo(currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts,
        account: ''
      })
    });
  }

  onChangeDebit = ({ value }) =>{
    let debit = value;
    this.setState({debit: debit,
                  optionDebit: debit});
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

buttonPressed(){
  
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
          if(!this.state.id || this.state.id==''){
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
          }else{
            this.loanService.updateLoan(
              this.state.id,
              this.state.detail,
              (this.state.lender==true)?1:0,
              this.state.currency,
              toModel(this.state.date),
              this.state.amount,
              toModel(this.state.expirationDate),
              this.state.monthlyFee,
              this.state.amountFees,
              this.state.account);
          }
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
          if(!this.state.id || this.state.id==''){
          this.loanService.createLoan(
            this.state.detail,
            (this.state.lender==true)?1:0,
            this.state.currency,
            toModel(this.state.date),
            this.state.amount,
            toModel(this.state.expirationDate),
            this.state.monthlyFee,
            this.state.amountFees);
          }else{
            this.loanService.updateLoan(
              this.state.id,
              this.state.detail,
              (this.state.lender==true)?1:0,
              this.state.currency,
              toModel(this.state.date),
              this.state.amount,
              toModel(this.state.expirationDate),
              this.state.monthlyFee,
              this.state.amountFees);
          }
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
          <View style={{flexDirection:'row'}}>
                <Text>Prestatario</Text>
                
                  <Switch
                    trackColor={{ false: "#565656;", true: "#565656;" }}
                    thumbColor={this.state.optionLender ? "#2cd18a" : "#2cd18a"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => this.onChangeLender({value})}
                    value={this.state.optionLender}
                  />
                      <Text>Prestamista</Text>
                </View>
          <View style={{padding:5}}></View>
          <View style={{flexDirection:'row'}}>
                <Text>Pesos</Text>
                  <Switch
                    trackColor={{ false: "#565656;", true: "#565656;" }}
                    thumbColor={this.state.optionCurrency ? "#2cd18a" : "#2cd18a"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => this.onChangeCurrency({value})}
                    value={this.state.optionCurrency}
                  />
                      <Text>Dolares</Text>
                </View>
          

          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder={(String(this.state.amount))==''?("Importe total"):(String(this.state.amount))}
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
          />
          
          {!this.state.lender ? (
            <View>
              <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder={(String(this.state.monthlyFee))==''?("Cantidad de cuotas"):(String(this.state.monthlyFee))}
                onChangeText={(monthlyFee) => this.setState({monthlyFee})}
                value={this.state.monthlyFee}
              />
              <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder={(String(this.state.amountFees))==''?("Importe Cuota"):(String(this.state.amountFees))}
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
                
                <View style={{flexDirection:'row'}}>
                <Text>No</Text>
                  <Switch
                    trackColor={{ false: "#565656;", true: "#565656;" }}
                    thumbColor={this.state.optionDebit ? "#2cd18a" : "#2cd18a"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => this.onChangeDebit({value})}
                    value={this.state.optionDebit}
                  />
                      <Text>Si</Text>
                </View>
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
