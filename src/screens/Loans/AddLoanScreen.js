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
    getAccounts
  } from '../../data/loans/loansAPI';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';

export default class AddLoanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);

    this.state = {
                  reference:'',            
                  lender:false,
                  //date: new Date(),
                  currency: 1,
                  value: '',
                  monthlyFee: '',
                  amountFees: '',
                  debit:false,
                  account:'',
                };
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
  onChangeLender = ({ value }) =>{
    let lender = value
    //Alert.alert('Call onPress with value:' + monthly    );
    this.setState({lender});
    if(lender){
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

  onChangeDebit = ({ value }) =>{
    let debit = value
    //Alert.alert('Call onPress with value:' + currency==1?'Pesos':currency==2?'Dolares':null   );
    this.setState({debit});
    if(debit){
     /* 
      this.setState({vencimientoTarjeta:'',
                        numerosTarjeta:''});
      */
    }
  }

buttonPressed(){
  Alert.alert(this.state.reference +" - " + this.state.lender +" - "+/*this.state.date +" - " */ + this.state.currency+" - " 
  + this.state.value +" - " +this.state.amountFees +" - " +this.state.monthlyFee +" - " +this.state.debit + " - "+this.state.account); 
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
  const { navigation } = this.props;
  const item = navigation.getParam('category');
  const accountsArray = getAccounts();

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
              onChangeText={(reference) => this.setState({reference})}
              value={this.state.reference}
          />
          <SwitchSelector options={optionsLender} initial={1} onPress={value => this.onChangeLender({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
          <View style={{padding:5}}></View>
         {/*  <DatePicker
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
          */}
          <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />

          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Importe total"
              onChangeText={(value) => this.setState({value})}
              value={this.state.value}
          />
          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Cantidad de cuotas"
              onChangeText={(amountFees) => this.setState({amountFees})}
              value={this.state.amountFees}
          />
          
          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Importe Cuota"
              onChangeText={(monthlyFee) => this.setState({monthlyFee})}
              value={this.state.monthlyFee}
          />
          {!this.state.lender ? (
            <View style={{padding:10}}>
          
              <Text style={styles.cuentasInfo}>Debito en cuenta</Text>
              <SwitchSelector options={optionsDebit} initial={1} onPress={value => this.onChangeDebit({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
                
              {this.state.debit ? (
                <View style={{padding:10}}>
                  <Dropdown
                    placeholder='Seleccione cuenta'
                    data={accountsArray}
                    value={this.state.account}
                    onChangeText={(cuenta) => this.setState({account:cuenta})}
                    style ={styles.input}
                 />
                </View>
              ) : null}
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
