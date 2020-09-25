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
      title: navigation.getParam('title')
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
                  expirationDay:''
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
  Alert.alert(this.state.reference +" - " + this.state.lender +" - "+ this.state.currency+" - " + this.state.value +" - " +
  this.state.amountFees +" - " +this.state.monthlyFee +" - " +this.state.debit + " - "+this.state.account+ " - "+this.state.expirationDay); 
  
  let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;
  if ((!this.state.reference|| this.state.reference=='') || (!this.state.lender|| this.state.lender=='') || (!this.state.currency || this.state.currency=='') ||
  (!this.state.value || this.state.value=='') )
  {
    Alert.alert("Complete los campos faltantes del prestamo");
  }
  else{ 
    if(!this.state.lender){
      if ((!this.state.amountFees || this.state.amountFees=='') || (!this.state.monthlyFee || this.state.monthlyFee=='') ||
      (!this.state.debit || this.state.debit=='') || (!this.state.expirationDay || this.state.expirationDay=='')){
        Alert.alert("Complete los campos faltantes del prestamo")
      }else if(this.state.debit){
        if( (!this.state.account || this.state.account=='')){
          Alert.alert("Complete los campos faltantes del prestamo")
        }
        else if(!numeroreg.test(this.state.amountFees))
          Alert.alert("ingrese un valor valido en la cantidad de cuotas"); 
        else if(!decimalreg.test(this.state.value))
          Alert.alert("ingrese un valor valido en el monto"); 
        else if(!decimalreg.test(this.state.monthlyFee))
          Alert.alert("ingrese un valor valido en la cuota");
        else if(!numeroreg.test(this.state.expirationDay) || this.state.expirationDay.length!=2 ||
        (this.state.expirationDay.slice(0, 2)>31)|| (this.state.expiryDate.slice(0, 2)<1))
          Alert.alert("ingrese un valor valido dia vencimineto");
        else
          Alert.alert("Graba prestamo Tomado y devitado");
      }else{
        if(!numeroreg.test(this.state.amountFees))
          Alert.alert("ingrese un valor valido en la cantidad de cuotas"); 
        else if(!decimalreg.test(this.state.value))
          Alert.alert("ingrese un valor valido en el monto"); 
        else if(!decimalreg.test(this.state.monthlyFee))
          Alert.alert("ingrese un valor valido en la cuota");
        else if(!numeroreg.test(this.state.expirationDay) || this.state.expirationDay.length!=2 ||
        (this.state.expirationDay.slice(0, 2)>31)|| (this.state.expiryDate.slice(0, 2)<1))
          Alert.alert("ingrese un valor valido dia vencimineto");
        else
          Alert.alert("Graba prestamo Tomado sin debito");
      }
    }else{
      if(!decimalreg.test(this.state.value))
          Alert.alert("ingrese un valor valido en el monto"); 
      else
        Alert.alert("Graba prestamo dado");
    }
  }
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
          <SwitchSelector options={optionsCurrency} initial={0} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />

          <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Importe total"
              onChangeText={(value) => this.setState({value})}
              value={this.state.value}
          />
          
          {!this.state.lender ? (
            <View>
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
              <View>
                <View style={{flexDirection: 'row', flex:1, padding:10}}>
                  <Text style={{height:30, marginBottom:10}}>Día de vencimiento: </Text>
                  <TextInput keyboardType='decimal-pad'
                    maxLength ={4}
                    style ={styles.smallInput}
                    placeholder="DD"
                    onChangeText={(expirationDay) => this.setState({expirationDay})}
                    value={this.state.expirationDay}
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
                      data={accountsArray}
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
