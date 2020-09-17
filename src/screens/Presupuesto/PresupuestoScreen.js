import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet
} from 'react-native';
import styles from './styles';
import SaveCardButton from '../../components/CardButton/SaveCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class PresupuestoScreen extends React.Component {
  static navigationOptions = {
    title: 'Agregar Presupuesto'
};

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={{alignItems: 'center'}}>
            <View style={stylePresupuesto.itemContainer}>
              <Text>Ingrese Periodo</Text>
              <TextInput style={stylePresupuesto.largeInput}
                placeholder="MMAAAA" textAlign="center"
              ></TextInput>
              <View style={stylePresupuesto.infoContainer}>
                {/* <View><Text fontWeight='bold'>Rubros</Text></View> */}
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Servicios</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Nacionales</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Provinciales</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Imp Municipales</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Educacion</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Salud</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Viaticos</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Comida</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
                <View style={stylePresupuesto.info}>
                  <Text style={stylePresupuesto.infoRubro}>Entretenimiento</Text>
                  <TextInput placeholder="Monto" textAlign="center" style={stylePresupuesto.mediumInput}></TextInput>
                </View>
              </View>
            </View>
            <View style={stylePresupuesto.infoContainer}>
             <SaveCardButton
               onPress={() => {
                 //let ingredients = item.ingredients;
                 let title = 'Guardar';
                 //navigation.navigate('IngredientsDetails', { ingredients, title });
               }}
             />
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
    margin: 15
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