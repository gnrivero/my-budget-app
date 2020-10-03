import React from 'react';
import {
  ScrollView,
  Switch,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import {toModel, toView} from '../../utils/DateConverter';
import styles from './styles';


import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

import InvestmentService from '../../service/InvestmentService';
import InvestmentTypeService from '../../service/InvestmentTypeService';
import AccountService from '../../service/AccountService';


const { width: viewportWidth } = Dimensions.get('window');

export default class AddInvestmentScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.investmentService = new InvestmentService();
    this.investmentTypeService = new InvestmentTypeService();
    this.accountService = new AccountService();
    this.optionCurrency =false;
    this.state =  {id:'',
                  detail: '',
                  type: '',
                  optionCurrency:false,
                  currency:'ARS',
                  amount:'',
                  amountCredited:'',
                  date:'',
                  dueDate:'',
                  account:'',
                  symbol:'',
                  allAccount:[],
                  allType:[]
    };
  }

  
  componentWillMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    console.log("id investment");
    console.log(id);
    if( id != undefined ){
      this.investmentService.getInvestmentById(id)
      .then((investment) => {
        console.log(investment);
        this.optionCurrency = investment.currencyCode == "ARS"? false:true;
        console.log(this.optionCurrency);
            this.setState({
                  id:investment.id,
                  detail: investment.detail,
                  type: investment.investmentTypeId,
                  optionCurrency:this.optionCurrency,
                  currency: investment.currencyCode,
                  amount:investment.amount,
                  amountCredited:investment.amountCredited,
                  dueDate:toView(investment.dueDate),
                  date:toView(investment.date),
                  account:investment.accountId,
                  symbol: investment.symbol
            });
            
      console.log("state")
      console.log(this.state);
        }
      );
    }

    
    this.investmentTypeService.getAllInvestmentType()
      .then((InvestmentType) => {
        this.setState({
          allType: InvestmentType
        })
    });

    this.accountService.getAccountBycurrencyCodeCombo(this.state.currency)
    .then((accounts) => {
      this.setState({
        allAccount: accounts
      })
    });

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

  onChangeType = ( value) =>{
    let type = value;
    this.setState({type: type});
    if(type!=1){
      this.setState({ amountCredited:'',
                      dueDate:'',
                      account:'',
                    });
    }
  }

  buttonPressed(){
    /*Alert.alert(this.state.detail +" - "+this.state.type +" - " +this.state.currency +" - " +this.state.amount 
    +" - " + this.state.amountCredited+" - " + this.state.dueDate+" - " + this.state.account ); 
    */
    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
      
    if ((!this.state.detail|| this.state.detail=='') || (!this.state.type|| this.state.type=='') 
      || (!this.state.currency || this.state.currency=='') || (!this.state.amount || this.state.amount==''))
    {
      Alert.alert("Complete los campos faltantes de la inversion")
    }
    else{ 
      if(this.state.type!=1){
        if(!decimalreg.test(this.state.amount)){
          Alert.alert("ingrese un valor valido para el monto");   
        }else if (!this.state.symbol || this.state.symbol==''){
          Alert.alert("ingrese una sigla");   
        }else{
          if(!this.state.id || this.state.id==''){
            this.investmentService.createInvestment(
            this.state.detail,
            this.state.type,
            this.state.currency,
            toModel(this.state.date),
            this.state.amount,
            this.state.symbol);
          }
          else
          {
            this.investmentService.updateInvestment(
              this.state.id,
              this.state.detail,
              this.state.type,
              this.state.currency,
              toModel(this.state.date),
              this.state.amount,
              this.state.symbol);
          }
          setTimeout(
            () => { this.props.navigation.navigate('Investments',{name: 'Inverisones'}); },
            1000
          )
        }
      }else{
        if ((!this.state.amountCredited|| this.state.amountCredited=='') || (!this.state.dueDate|| this.state.dueDate=='') 
        || (!this.state.account || this.state.account==''))
        {
          Alert.alert("Complete los campos faltantes de la inversion")
        }else{
          if(!decimalreg.test(this.state.amount)){
            Alert.alert("ingrese un valor valido para el monto");   
          }else  if(!decimalreg.test(this.state.amountCredited)){
            Alert.alert("ingrese un valor valido para el monto recuperado");   
          }else
          {  
            if(!this.state.id || this.state.id==''){

            this.investmentService.createInvestment(
              this.state.detail,
              this.state.type,
              this.state.currency,
              toModel(this.state.date),
              this.state.amount,
              null,
              toModel(this.state.dueDate),
              this.state.amountCredited,
              this.state.account);
            }else
            {
            this.investmentService.updateInvestment(
              this.state.id,
              this.state.detail,
              this.state.type,
              this.state.currency,
              toModel(this.state.date),
              this.state.amount,
              null,
              toModel(this.state.dueDate),
              this.state.amountCredited,
              this.state.account);
            }
              setTimeout(
                () => { this.props.navigation.navigate('Investments',{name: 'Inversiones'}); },
                1000
              )
          }
        }
      }
    }
  }
  

  render() {
    
    let typeList = this.state.allType.map( (v,k) => {
      return {value:v.id, label:v.name};
    });
    
    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoInvestment} source={require('../../data/investments.jpg')} />
          </View>
          <Text style={styles.cuentasInfo}>Nueva inversión:</Text>
          <View style={{marginBottom: 40, padding:10}}>
            <Dropdown
                placeholder='Seleccione tipo inversion'
                data={typeList}
                value={this.state.type}
                onChangeText={(type) => this.onChangeType(type)}
                style ={styles.input}
              />
            <TextInput
                style ={styles.input}
                placeholder="Nombre referencia inversion"
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
            <View style={{padding:5}}></View>
            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder={(String(this.state.amount))==''?("Monto"):(String(this.state.amount))}

              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}

            />
            {(this.state.type==1)?(
              <View>
              <View style={{padding:5}}></View>
                <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder="Monto recuperado"
                onChangeText={(amountCredited) => this.setState({amountCredited})}
                value={this.state.amountCredited}
                //editable={this.state.id==''?true:false}
              />
              <View style={{flexDirection:'row'}}>
                <Text style={styles.cuentasInfo}>Fecha de vencimiento</Text>
                <DatePicker
                  style={{marginBottom: 10}}
                  date={this.state.dueDate} //initial date from state
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
                  onDateChange={(date) => {this.setState({dueDate: date})}}
                />
              </View>
              <Dropdown
                placeholder='Seleccione cuenta para acreditar'
                data={this.state.allAccount}
                value={this.state.account}
                onChangeText={(cuenta) => this.setState({account:cuenta})}
                style ={styles.input}
              />
              </View>
            ):(
              <View>
              <View style={{padding:5}}></View>
                <TextInput 
                  style ={styles.input}
                  maxLength={8}
                  placeholder="sigla"
                  onChangeText={(symbol) => this.setState({symbol})}
                  value={this.state.symbol}
                />
              </View>
            )
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