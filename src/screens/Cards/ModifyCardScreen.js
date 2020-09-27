import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import styles from './styles';
import {getCardId} from '../../data/cards/cardsAPI';

import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import { setLightEstimationEnabled } from 'expo/build/AR';
import CardService from '../../service/CardService';
import BankService from '../../service/BankService';

const { width: viewportWidth } = Dimensions.get('window');

export default class ModifyCardScreen extends React.Component {

  bankService;
  cardService;

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
    this.bankService = new BankService();
    this.cardService = new CardService();
    this.state = {
      //Cards
      id:'',
      name:'',
      entity: '',
      lastFourNumbers:'',
      expiryDate:'',
      dueDate:'',
      closeDate:'',
      //Banks
      allBanks: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    this.setCardToState(id);
    this.bankService.getAllBanks()
     .then((banks) => {
        this.setState({
            allBanks: banks
        });
     });
  }

  setCardToState(id){
    if(id!== undefined){
      this.cardService.getCardById(id)
        .then((card) => {
            this.setState({
                id: card.id,
                name: card.name,
                entity: card.bankId,
                lastFourNumbers: card.lastFourNumbers,
                expiryDate: card.expiryDate,
                dueDate: card.dueDate,
                closeDate: card.closeDate
            })
        });
    }
  }
  
buttonPressed(){

  //let decimalreg=/^[-+]?[0-9]*\.?[0-9]{0,2}$/;
  let numeroreg=/^[0-9]*$/;

  if ((!this.state.name|| this.state.name=='') || (!this.state.entity|| this.state.entity=='') 
    || (!this.state.lastFourNumbers || this.state.lastFourNumbers=='') || (!this.state.expiryDate || this.state.expiryDate=='')||
  (!this.state.dueDate || this.state.dueDate=='') || (!this.state.closeDate || this.state.closeDate==''))
  {
    Alert.alert("Complete los campos faltantes de la tarjeta")
  }
   else if(!numeroreg.test(this.state.lastFourNumbers) || this.state.lastFourNumbers.length!=4)
      Alert.alert("ingrese un valor valido para los ultimos 4 digitos"); 
   
    else if(!numeroreg.test(this.state.expiryDate) || this.state.expiryDate.length!=4 ||
    (this.state.expiryDate.slice(0, 2)>12)|| (this.state.expiryDate.slice(0, 2)<1) || (this.state.expiryDate.slice(2, 4)<20))
      Alert.alert("ingrese un valor valido para el vencimiento"); 
    else {
      if(!this.state.id || this.state.id==''){
        this.cardService.createCreditCard(
            this.state.name,
            this.state.entity,
            this.state.lastFourNumbers,
            this.state.expiryDate,
            this.state.closeDate,
            this.state.dueDate
        );
      } else {
        this.cardService.updateCard(
            this.state.id,
            this.state.name,
            this.state.entity,
            this.state.lastFourNumbers,
            this.state.expiryDate,
            this.state.closeDate,
            this.state.dueDate
        );
      }
    }
}

  render() {

    let banksList = this.state.allBanks.map( (v,k) => {
          return {value:v.id, label:v.name};
    });

    return (
      <View>
        <ScrollView>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCards} source={require('../../data/cards.png')} />
          </View>
          <Text style={styles.cuentasInfo}>Tarjeta:</Text>
          <View style={{marginBottom: 40, padding:10}}>
            <TextInput
              style ={styles.input}
              placeholder="Nombre referencia tarjeta"
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
            <Dropdown
              placeholder='Seleccione entidad'
              data={banksList}
              value={this.state.entity}
              onChangeText={(entity) => this.setState({entity})}
              style ={styles.input}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', flex:1}}>
                <Text style={{height:30, marginBottom:10}}>Ultimos 4 digitos: </Text>
                <TextInput 
                  keyboardType='decimal-pad'
                  maxLength ={4}
                  style ={styles.smallInput}
                  onChangeText={(lastFourNumbers) => this.setState({lastFourNumbers})}
                  value={this.state.lastFourNumbers}></TextInput>
              </View>
              <View style={{flexDirection: 'row', flex:1}}>
                <Text style={{height:30, marginBottom:10}}>Vencimiento: </Text>
                <TextInput keyboardType='decimal-pad'
                      maxLength ={4}
                      style ={styles.smallInput}
                      placeholder="MMAA"
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
