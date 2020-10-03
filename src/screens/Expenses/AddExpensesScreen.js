import React from 'react';
import {  ScrollView,  Text,  View,  Image,  TouchableHighlight,  TextInput,  Alert,} from 'react-native';
import styles from './styles';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';
import {toModel} from '../../utils/DateConverter';

import { getPaymentMethods } from '../../data/expenses/expensesAPI';
import { searchStateError } from './validator/AddExpensesScreenValidator';

import TransactionTypeService from '../../service/TransactionTypeService';
import TransactionService from '../../service/TransactionService';
import AccountService from '../../service/AccountService';
import CardService from '../../service/CardService';

export default class AddExpensesScreen extends React.Component {
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
    this.CardService = new CardService();
    this.state = {
                  date: '',
                  typeExpenses: '',
                  account:'',
                  amount: '',
                  monthly: true,
                  currency: 'ARS',
                  detail: '',
                  card: '',
                  debitCard: '',
                  paymentMethod: '',
                  installments: '',
                  showCard:false,
                  showDebit:false,
                  showAccount:false,
                  showInstallments:false,
                  allAccount: [],
                  allTransactionType: [],
                  allDebitCards: [],
                  allCards: []
                };
  }



  componentDidMount(){
    this.transactionTypeService.getTransactionType('E')
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

    this.CardService.getAllDebitCardsByCurrencyCombo(this.state.currency)
    .then((cards) => {
      this.setState({
        allDebitCards: cards
      })
    });

    this.CardService.getAllCards()
    .then((cards) => {
      this.setState({
        allCards: cards
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

  onChangeCurrency = ({ value }) =>{
    let currency = value;
    this.setState({currency});
    this.accountService.getAccountBycurrencyCodeCombo(currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts
      })
    });
    this.CardService.getAllDebitCardsByCurrencyCombo(currency)
    .then((cards) => {
      this.setState({
        allDebitCards: cards
      })
    });
  }

  getValidOptions =({paymentMethod}) =>{
    this.setState({paymentMethod});
    let showCard;
    let showDebit; 
    let showInstallments;
    let showAccount;
    if(paymentMethod=="CASH"){
      showCard = false;
      showDebit = false;
      showInstallments = false;
      showAccount = false;
    }
    else if(paymentMethod=="CC"){
      showCard = true;
      showDebit = false;
      showInstallments = true;
      showAccount = false;
    }
    else if (paymentMethod=="DC"){
      showCard = false;
      showDebit = true;
      showInstallments = false;
      showAccount = false;  
      
      this.CardService.getAllDebitCardsByCurrencyCombo(this.state.currency)
      .then((cards) => {
        this.setState({
        allDebitCards: cards
        })
      });
    }
    else{
      showCard = false;
      showDebit = false;
      showInstallments = false;
      showAccount = true;  
      
      this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
      .then((accounts) => {
        this.setState({
          allAccount: accounts
        })
      });
    }
    this.setState({
      showCard:showCard,
      showDebit:showDebit,
      showInstallments:showInstallments,
      showAccount:showAccount,
      card:'',
      debitCard:'',
      installments:'',
      account:'',
    });

  }

  buttonPressed(){

    var error = searchStateError(this.state);

    if (error !== null) {
      Alert.alert(error);
      return;
    }

    if(this.state.paymentMethod=="CC"){
      //Compra con Credito      
      this.transactionService.createTransaction(
        'E',
        this.state.detail,
        false,
        this.state.currency,
        this.state.typeExpenses,
        toModel(this.state.date),
        parseFloat(this.state.amount/this.state.installments).toFixed(2),
        null,
        this.state.monthly,
        this.state.paymentMethod,
        this.state.card,
        this.state.installments
        );
    
      setTimeout(
        () => { this.props.navigation.navigate('Expenses',{name: 'Egresos'}); },
        1000
      )
    }else if (this.state.paymentMethod=='DC'){
      //Compra con Debito
      //busco el id de la cuenta para hacer el insert
      this.accountService.getAccountByCardId(this.state.debitCard)
      .then((account) => {
        this.transactionService.createTransaction(
          'E',
          this.state.detail,
          false,
          this.state.currency,
          this.state.typeExpenses,
          toModel(this.state.date),
          this.state.amount,
          account.id,
          this.state.monthly,
          this.state.paymentMethod,
          this.state.debitCard);
      
        setTimeout(
          () => { this.props.navigation.navigate('Expenses',{name: 'Egresos'}); },
          1000
        )
      });
    }
    else if(this.state.paymentMethod!='CC' && this.state.paymentMethod!='DC'){
      //Compra con otro medio/// asumimos que va a una cuenta
      var account = this.state.account;
      if(this.state.paymentMethod=="CASH")
        account=-1;

      this.transactionService.createTransaction(
        'E',
        this.state.detail,
        null,
        this.state.currency,
        this.state.typeExpenses,
        toModel(this.state.date),
        this.state.amount,
        this.state.account,
        this.state.monthly,
        this.state.paymentMethod);
    
      setTimeout(
        () => { this.props.navigation.navigate('Expenses',{name: 'Egresos'}); },
        1000
      )
    }
  }
    
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    
    const paymentMethods = getPaymentMethods();

    const optionsMontly = [
      { label: 'Mensual', value: true},
      { label: 'Ocasional', value: false }
    ];
    const optionsCurrency = [
      { label: 'Pesos', value: 'ARS'},
      { label: 'Dolares', value: 'USD' }
    ];

    let transactionTypeList = this.state.allTransactionType.map( (v,k) => {
      return {value:v.id, label:v.name};
    });
    
    let cardList = this.state.allCards.map( (v,k) => {
      return {value:v.id, label:(v.name + " - "+ v.lastFourNumbers)};
    });


    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoExpenses} source={require('../../data/expenses.jpg')} />
        </View>
        <Text style={styles.cuentasInfo}>Nuevo Egreso:</Text>
        <View style={{marginBottom: 40, padding:10}}>
            <Dropdown
                placeholder="Seleccione tipo de egreso"
                data={transactionTypeList}
                value={this.state.typeExpenses}
                onChangeText={(typeExpenses) => this.setState({typeExpenses})}
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
            <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <Dropdown
                placeholder="Seleccione medio de pago"
                data={paymentMethods}
                value={this.state.paymentMethod}
                onChangeText={(paymentMethod) => this.getValidOptions({paymentMethod})}
                style ={styles.input}
            />
            <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder="Importe total"
                onChangeText={(amount) => this.setState({amount})}
                value={this.state.amount}
            />
            {this.state.showAccount?(
              <Dropdown
                  placeholder='Seleccione cuenta'
                  data={this.state.allAccount}
                  value={this.state.account}
                  onChangeText={(cuenta) => this.setState({account:cuenta})}
                  style ={styles.input}
              />
            ):null}
            {this.state.showCard?(
              <Dropdown
                  placeholder="Seleccione Tarjeta"
                  data={cardList}
                  value={this.state.card}
                  onChangeText={(card) => this.setState({card})}
                  style ={styles.input}
              />
            ):null}
            {this.state.showDebit?(
              <Dropdown
                  placeholder="Seleccione Tarjeta Debito"
                  data={this.state.allDebitCards}
                  value={this.state.debitCard}
                  onChangeText={(debitCard) => this.setState({debitCard})}
                  style ={styles.input}
              />
            ):null}
            {this.state.showInstallments?(
              <TextInput keyboardType='decimal-pad'
                  style ={styles.installments}
                  placeholder="Cantidad de cuotas"
                  onChangeText={(installments) => this.setState({installments})}
                  value={this.state.installments}
              />
            ):null}
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
