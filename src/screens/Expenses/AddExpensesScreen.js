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
    getAllCardsCombo
} from '../../data/cards/cardsAPI';

import {
    getPaymentMethods, getTypeExpenses
} from '../../data/expenses/expensesAPI';
import {
    getAccounts
  } from '../../data/income/incomeAPI';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';

import TransactionTypeService from '../../service/TransactionTypeService';
import TransactionService from '../../service/TransactionService';
import AccountService from '../../service/AccountService';

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
    this.state = {
                  date: '',
                  typeExpenses: '',
                  account:'',
                  value: '',
                  monthly: true,
                  currency: 'ARS',
                  detail: '',
                  card: '',
                  paymentMethod: '',
                  installments: '',
                  showCard:false,
                  showAccount:false,
                  showInstallments:false,
                  allAccount: [],
                  allTransactionType: []
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

  }

  onChangeMonthly = ({ value }) =>{
    let monthly = value
    this.setState({monthly});
    if(monthly){
     /* 
      */
    }
  }

  /*
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
*/

  getValidOptions =({paymentMethod}) =>{
    this.setState({paymentMethod});
    if(paymentMethod=='CHASH'){
      this.setState({
        showCard:false,
        showInstallments:false,
        showAccount:false,
        card:'',
        installments:'',
        account:'',
      });
    }
    else if(paymentMethod=='CC'){
      this.setState({
        showCard:true,
        showInstallments:true,
        showAccount:false,
        card:'',
        installments:'',
        account:''
        })
    }else if (paymentMethod=='DC'){
      this.setState({
        showCard:true,
        showInstallments:false,
        showAccount:false,
        card:'',
        installments:'',
        account:''
        })
    }
    else{
      this.setState({
        showCard:false,
        showInstallments:false,
        showAccount:true,
        card:'',
        installments:'',
        account:''
      })
    }
  }

buttonPressed(){
  Alert.alert(this.state.typeExpenses +" - "+this.state.date +" - " +this.state.detail +" - " +this.state.monthly +" - " + this.state.currency+" - " 
  + this.state.paymentMethod +" - " +this.state.value +" - " +this.state.account +" - " +this.state.card + " - "+this.state.installments); 
  
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.typeExpenses|| this.state.typeExpenses=='') || (!this.state.date|| this.state.date=='') || (!this.state.detail || this.state.detail=='') ||
  (!this.state.paymentMethod || this.state.paymentMethod=='') || (!this.state.value || this.state.value==''))
  {
    Alert.alert("Complete los campos faltantes del egreso")
  }
  else if(!decimalreg.test(this.state.value))
    Alert.alert("ingrese un valor valido en el monto"); 
  else if(this.state.paymentMethod=='CC'){
    //Compra con Credito
    if((!this.state.card|| this.state.card=='') || (!this.state.installments|| this.state.installments=='')){
      Alert.alert("Complete los campos faltantes del egreso")
    }else if(!numeroreg.test(this.state.installments) || this.state.installments<1){
      Alert.alert("ingrese un valor valido en las cuotas"); 
    }else{
      Alert.alert("Grabar egreso con tarjeta Credito");
    }
  }else if (this.state.paymentMethod=='DC'){
    //Compra con Debito
    if((!this.state.card|| this.state.card=='')){
      Alert.alert("Complete los campos faltantes del egreso")
    }else{
      Alert.alert("Grabar egreso con tarjeta Debito");
    }
  }
  else if(this.state.paymentMethod!='CC' && this.state.paymentMethod!='DC'){
    //Compra con otro medio/// asumimos que va a una cuenta
    if((!this.state.account|| this.state.account=='')){
      Alert.alert("Complete los campos faltantes del egreso")
    }else{
      Alert.alert("Grabar egreso con medio distinto a Debito / credito");
    }
  }
}
  
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    
    const paymentMethods = getPaymentMethods();
    const cards = getAllCardsCombo();//Ver de pasar un parametro para que traiga las tarjetas de credito o debito
    const optionsMontly = [
      { label: 'Mensual', value: true},
      { label: 'Ocasional', value: false }
    ];
    const optionsCurrency = [
      { label: 'Pesos', value: 'ARS'},
      { label: 'Dolares', value: 'USD' }
    ];

  let  transactionTypeList  = this.state.allTransactionType.map( (v,k) => {
    return {value:v.id, label:v.name};
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
                placeholder="Seleccione una fecha"
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
                onChangeText={(value) => this.setState({value})}
                value={this.state.value}
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
                  data={cards}
                  value={this.state.card}
                  onChangeText={(card) => this.setState({card})}
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
