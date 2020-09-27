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
  getAccounts, getTypeIncome
} from '../../data/income/incomeAPI';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import transactionTypeService from '../../service/TransactionTypeService';
import TransactionTypeService from '../../service/TransactionTypeService';

export default class AddIncomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.transactionTypeService = new TransactionTypeService();
    this.state = {
                  date: new Date(),
                  typeIncome: '',
                  account:'',
                  value: '',
                  cash: true,
                  monthly: true,
                  currency: 1,
                  detail: '',
                  alltransactionType: []
                };
  }

  componentDidMount(){
    this.transactionTypeService.getTransactionTypeIncome()
      .then((transactionType) => {
        this.setState({
          alltransactionType: transactionType
        })
    });
 }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
  onChangeMonthly = ({ value }) =>{
    let monthly = value
    //Alert.alert('Call onPress with value:' + monthly    );
    this.setState({monthly});
    if(monthly){
     /* 
      this.setState({vencimientoTarjeta:'',
                        numerosTarjeta:''});
      */
    }
  }

  onChangeCash = ({ value }) =>{
    let cash = value
    //Alert.alert('Call onPress with value:' + cash    );
    this.setState({cash});
    if(cash){
      this.setState({account:''});
    }
  }

  onChangeCurrency = ({ value }) =>{
    let currency = value
    Alert.alert('Call onPress with value:' + currency    );
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
  Alert.alert(this.state.typeIncome +" - "+this.state.date +" - " +this.state.detail +" - " +this.state.monthly +" - "+this.state.cash +" - " + this.state.currency +" - " +this.state.value +" - " +this.state.account); 
    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.typeIncome|| this.state.typeIncome=='') || (!this.state.date|| this.state.date=='') || (!this.state.detail || this.state.detail=='') ||
  (!this.state.value || this.state.value==''))
  {
    Alert.alert("Complete los campos faltantes del ingreso")
  }
  else if(!decimalreg.test(this.state.value))
    Alert.alert("ingrese un valor valido para el monto"); 
  else if(!this.state.cash){
      if((!this.state.account  || this.state.account=='')){
      Alert.alert("Complete los campos faltantes del ingreso")
    }
    else
      Alert.alert("Grabar con Cuenta");
  }  
  else 
    Alert.alert("Grabar Efectivo");
}

  
  render() {
    const mes = new Date().getMonth();
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const accountsArray = getAccounts(); //TODO: FILTRAR POR TIPO DE CUENTA 
    let  typeIncomeList  = this.state.alltransactionType.map( (v,k) => {
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
    { label: 'Pesos', value: 1},
    { label: 'Dolares', value: 2 }
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
              data={typeIncomeList}
              value={this.state.typeIncome}
              onChangeText={(typeIncome) => this.setState({typeIncome})}
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
            <SwitchSelector options={optionsCash} initial={0} onPress={value => this.onChangeCash({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            
            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="importe"
              onChangeText={(value) => this.setState({value})}
              value={this.state.value}
            />
            {!this.state.cash?(
              <Dropdown
                placeholder='Seleccione cuenta'
                data={accountsArray}
                value={this.state.account}
                onChangeText={(cuenta) => this.setState({account:cuenta})}
                style ={styles.input}
              />
            ): null}
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
