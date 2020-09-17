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

export default class AddExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);

    this.state = {
                  date: new Date(),
                  typeExpenses: '',
                  account:'',
                  value: '',
                  monthly: true,
                  currency: 1,
                  detail: '',
                  typeIncome: '',
                  card: '',
                  paymentMethod: '',
                  installments: ''
                };
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

  onChangeCurrency = ({ value }) =>{
    let currency = value
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
  Alert.alert(this.state.typeExpenses +" - "+this.state.date +" - " +this.state.detail +" - " +this.state.monthly +" - " + this.state.currency+" - " 
  + this.state.paymentMethod +" - " +this.state.value +" - " +this.state.account +" - " +this.state.card + " - "+this.state.installments); 
  /*
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.entidad|| this.state.entidad=='') || (!this.state.cbu|| this.state.cbu=='') || (!this.state.nombreCuenta || this.state.nombreCuenta=='') ||
  (!this.state.saldoInicial || this.state.saldoInicial==''))
  {
    Alert.alert("Complete los campos faltantes de la cuenta")
  }
   else if(!decimalreg.test(this.state.saldoInicial))
    Alert.alert("ingrese un valor valido en el saldo"); 
   
    else if(this.state.agregarTarjeta){
       if((!this.state.numerosTarjeta  || this.state.numerosTarjeta=='') || (!this.state.vencimientoTarjeta || this.state.vencimientoTarjeta=='')){
        Alert.alert("Complete los campos faltantes de la cuenta")
      }
      else if(!numeroreg.test(this.state.numerosTarjeta) || this.state.numerosTarjeta.length!=4 )
        Alert.alert("ingrese un valor valido en el numero de tarjeta");  
      else if(!numeroreg.test(this.state.vencimientoTarjeta) || this.state.vencimientoTarjeta.length!=6 )
        Alert.alert("ingrese un valor valido en el vencimiento de tajeta");  
      else
        Alert.alert("Grabar con tarjeta");
    }  
    else 
      Alert.alert("Grabar");
 */
}
  
  render() {
    const mes = new Date().getMonth();
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const accountsArray = getAccounts();
    const paymentMethods = getPaymentMethods();
    const typeExpensesList = getTypeExpenses();
    const cards = getAllCardsCombo();//Ver de pasar un parametro para que traiga las tarjetas de credito o debito
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
            <Image style={styles.photoExpenses} source={require('../../data/expenses.jpg')} />
        </View>
        <Text style={styles.cuentasInfo}>Nuevo Egreso:</Text>
        <View style={{marginBottom: 40, padding:10}}>
            <Dropdown
                placeholder="Seleccione tipo de egreso"
                data={typeExpensesList}
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
                onChangeText={(paymentMethod) => this.setState({paymentMethod})}
                style ={styles.input}
            />
            <TextInput keyboardType='decimal-pad'
                style ={styles.input}
                placeholder="Importe total"
                onChangeText={(value) => this.setState({value})}
                value={this.state.value}
            />
            <Dropdown
                placeholder='Seleccione entidad'
                data={accountsArray}
                value={this.state.account}
                onChangeText={(cuenta) => this.setState({account:cuenta})}
                style ={styles.input}
            />
            <Dropdown
                placeholder="Seleccione Tarjeta"
                data={cards}
                value={this.state.card}
                onChangeText={(card) => this.setState({card})}
                style ={styles.input}
            />
            <TextInput keyboardType='decimal-pad'
                style ={styles.installments}
                placeholder="Cantidad de cuotas"
                onChangeText={(installments) => this.setState({installments})}
                value={this.state.installments}
            />
          {/* 
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
                maxLength ={6}
                style ={styles.input}
                placeholder="Vencimiento MMAAAA"
                onChangeText={(vencimientoTarjeta) => this.setState({vencimientoTarjeta})}
                value={this.state.vencimientoTarjeta}
              />
            </View>
            ) : null}
            */}
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