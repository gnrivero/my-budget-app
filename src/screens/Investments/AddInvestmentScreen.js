import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { getInvestmentTypes,getAccounts } from '../../data/investments/investmentsAPI';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';

const { width: viewportWidth } = Dimensions.get('window');

export default class AddInvestmentScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.state =  {id:'',
                  name: '',
                  type: '',
                  opcionCurrency:0,
                  currency:1,
                  amount:'',
                  amountCredited:'',
                  dueDate:'',
                  account:'',
      activeSlide: 0
    };
  }
  onChangeCurrency = ({ value }) =>{
    let currency = value
    //Alert.alert('Call onPress with value:' + currency==1?'Pesos':currency==2?'Dolares':null   );
    this.setState({currency});
    if(currency){
    
    }
  }

  onChangeType = ( value) =>{
    let type = value;
    //Alert.alert('Call onPress with value:' + currency==1?'Pesos':currency==2?'Dolares':null   );
    this.setState({type: type});
    if(type!=1){
      
      this.setState({ amountCredited:'',
                      dueDate:'',
                      account:'',
                    });
      
    }
  }


  buttonPressed(){
    Alert.alert(this.state.name +" - "+this.state.type +" - " +this.state.currency +" - " +this.state.amount 
    +" - " + this.state.amountCredited+" - " + this.state.dueDate+" - " + this.state.account ); 
    
    let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
    //let numeroreg=/^[0-9]*$/;
  
    if ((!this.state.name|| this.state.name=='') || (!this.state.type|| this.state.type=='') 
      || (!this.state.currency || this.state.currency=='') || (!this.state.amount || this.state.amount==''))
    {
      Alert.alert("Complete los campos faltantes de la inversion")
    }
    else{ 
      if(this.state.type!=1){
        if(!decimalreg.test(this.state.amount)){
          Alert.alert("ingrese un valor valido para el monto");   
        }else
          Alert.alert("Grabo inversion distinta a plazo fijo"); 
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
            Alert.alert("Grabo inversion en plazo fijo"); 
        }
      }
    }
  }
  

  render() {
    const typesArray = getInvestmentTypes();
    const accountsArray = getAccounts();
    const optionsCurrency = [
      { label: 'Pesos', value: 1},
      { label: 'Dolares', value: 2 }
    ];
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
                data={typesArray}
                value={this.state.type}
                onChangeText={(type) => this.onChangeType(type)}
                style ={styles.input}
              />
            <TextInput
                style ={styles.input}
                placeholder="Nombre referencia inversion"
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
            />
            <SwitchSelector /*disabled={this.state.id!=''?true:false} */options={optionsCurrency} initial={this.state.opcionCurrency} onPress={value => this.onChangeCurrency({value})} buttonColor='#2cd18a' backgroundColor='#cccccc' />
            <View style={{padding:5}}></View>
            <TextInput keyboardType='decimal-pad'
              style ={styles.input}
              placeholder="Monto"
              onChangeText={(amount) => this.setState({amount})}
              value={this.state.amount}
              //editable={this.state.id==''?true:false}
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
                data={accountsArray}
                value={this.state.account}
                onChangeText={(cuenta) => this.setState({account:cuenta})}
                style ={styles.input}
              />
              </View>
            ):(null)
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