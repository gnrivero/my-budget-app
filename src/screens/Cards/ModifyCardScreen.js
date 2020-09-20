import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import {
  getEntities,
} from '../../data/MockDataAPI';

import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

//import SaveCardButton from '../../components/CardButton/SaveCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class ModifyCardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontSize: 16
        }
      };
    };

  constructor(props) {
    super(props);
    this.state = {
                  name:'',
                  entity: '',
                  lastFourNumbers:'',
                  expiryDate:'',
                  dueDate:'',
                  closeDate:'',
    };
  }

  
buttonPressed(){
 /* Alert.alert(this.state.typeExpenses +" - "+this.state.date +" - " +this.state.detail +" - " +this.state.monthly +" - " + this.state.currency+" - " 
  + this.state.paymentMethod +" - " +this.state.value +" - " +this.state.account +" - " +this.state.card + " - "+this.state.installments); 
  */
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
    const entitiesArray = getEntities();
    return (
      <View>
        <ScrollView>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCards} source={require('../../data/cards.png')} />
          </View>
          <Text style={styles.cuentasInfo}>Nueva cuenta:</Text>
          <View style={{marginBottom: 40, padding:10}}>
            <TextInput
              style ={styles.input}
              placeholder="Nombre referencia tarjeta"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
            <Dropdown
              placeholder='Seleccione entidad'
              data={entitiesArray}
              value={this.state.entity}
              onChangeText={(entity) => this.setState({entity})}
              style ={styles.input}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', flex:1}}>
                <Text style={{height:30, paddingTop:5,}}>Ultimos 4 digitos: </Text>
                <TextInput 
                  keyboardType='decimal-pad'
                  maxLength ={4}
                  style ={styles.smallInput}
                  onChangeText={(lastFourNumbers) => this.setState({lastFourNumbers})}
                  value={this.state.lastFourNumbers}></TextInput>
              </View>
              <View style={{flexDirection: 'row', flex:1}}>
                <Text style={{height:30, paddingTop:5,}}>Vencimiento: </Text>
                <TextInput keyboardType='decimal-pad'
                      maxLength ={6}
                      style ={styles.mediumInput}
                      placeholder="MMAAAA"
                      onChangeText={(expiryDate) => this.setState({expiryDate})}
                      value={this.state.expiryDate}
                />
              </View>
            </View>
          <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}} >
                <Text>Vencimiento de Resumen:</Text>
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
                    onDateChange={(dueDate) => {this.setState({dueDate})}}
                />
              </View>
              <View style={{flex:1}} >
                <Text>Cierre de Resumen:</Text>
                <DatePicker
                    style={{marginBottom: 10}}
                    date={this.state.closeDate} //initial date from state
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
                    onDateChange={(closeDate) => {this.setState({closeDate})}}
                />
              </View>
            </View>
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
