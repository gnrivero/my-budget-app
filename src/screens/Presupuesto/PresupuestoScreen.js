import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import SaveCardButton from '../../components/CardButton/SaveCardButton';
import DatePicker from 'react-native-datepicker';

const { width: viewportWidth } = Dimensions.get('window');

export default class PresupuestoScreen extends React.Component {
  static navigationOptions = {
    title: 'Agregar Presupuesto'
};

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      typeIncome: '',
      account:'',
      value: '',
      cash: true,
      monthly: true,
      currency: 1,
      servicio: '',
      nacionales: '',
      provincial: '',
      municipal: '',
      educacion: '',
      viatico: '',
      comida: '',
      entretenimiento: '',
      periodo:'',
    };
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
    return (
      <ScrollView>
        <View style={{alignItems: 'center'}}>
            <View style={stylePresupuesto.itemContainer}>
            {/* <DatePicker
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
            /> */}
            <Text style={stylePresupuesto.infoRubro}>Ingrese Periodo</Text>
            <TextInput placeholder="MMAAAA" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(periodo) => this.setState({periodo})}
                  value={this.state.periodo}
                  >
                  </TextInput>

              <View style={stylePresupuesto.infoContainer}>
                {/* <View><Text fontWeight='bold'>Rubros</Text></View> */}
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Servicios</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(servicio) => this.setState({servicio})}
                  value={this.state.servicio}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Nacionales</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(nacionales) => this.setState({nacionales})}
                  value={this.state.nacionales}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Provinciales</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(provincial) => this.setState({provincial})}
                  value={this.state.provincial}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Municipales</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(municipal) => this.setState({municipal})}
                  value={this.state.municipal}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Educacion</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(educacion) => this.setState({educacion})}
                  value={this.state.educacion}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Salud</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Viaticos</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(viatico) => this.setState({viatico})}
                  value={this.state.viatico}
                  >
                  </TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Comida</Text>
                  <TextInput placeholder="Monto" textAlign="center" 
                  style={stylePresupuesto.mediumInput}
                  onChangeText={(comida) => this.setState({comida})}
                  value={this.state.comida}
                  ></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Entretenimiento</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}
                                    onChangeText={(entretenimiento) => this.setState({entrenimiento})}
                                    value={this.state.entretenimiento}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View style={stylePresupuesto.infoContainer}>
              <TouchableHighlight 
              onPress={() =>this.buttonPressed() }
              >
              <Text style={{fontSize: 40, color: 'white', textAlign:'center', backgroundColor:'green'}}>Guardar</Text>
              </TouchableHighlight>
             {/* <SaveCardButton
               onPress={() => {
                 //let ingredients = item.ingredients;
                 let title = 'Guardar';
                 //navigation.navigate('IngredientsDetails', { ingredients, title });
               }}
             /> */}
            </View>
           </View>
      </ScrollView>
    );
  }
}

const stylePresupuesto = StyleSheet.create({
    addBox: {
        marginBottom: 40,
        justifyContent:'space-around',
        flexDirection:'row',
        padding: 30,
    },
    textInput: {
        width:'25%',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 15
    },
    botonPeriodo: {
        fontSize: 30,
        color: 'white',
        textAlign:'center',
        backgroundColor: 'green',
    },
    itemContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: 500,
      width: 300,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
      padding: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
},
info: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    padding:10,
},
infoRubro: {
  fontSize: 14,
  fontWeight: 'bold',
  marginLeft: 5,
  width: 150,
},
smallInput: {
  height: 25,
  width: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginLeft: 10
},
mediumInput: {
  height: 25,
  width: 80,
  borderColor: 'gray',
  borderWidth: 1,
  marginLeft: 10,
},
largeInput: {
  height: 30,
  width: 100,
  borderColor: 'gray',
  borderWidth: 1,
  margin: 10
}
})