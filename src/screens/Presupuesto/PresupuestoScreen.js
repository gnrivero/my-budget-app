import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  Alerts,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {
  getCuentas,
  getCategoryName
} from '../../data/MockDataAPI';
import { TextInput } from 'react-native-gesture-handler';

// const [enteredRubro, setEnteredRubro] = useState(0);
// const [enteredIngEgre, setEnteredIngreEgre] = useState('');
// const [enteredMonto, setEnteredMonto] = useState('');



// const ingreEgreInputHandler = (enteredText) => {
//     setEnteredIngreEgre(enteredText);
// };

// const montoInputHandler = (enteredText) => {
//     setEnteredMonto(enteredText);
// };


// const rubroInputHandler = (enteredText) => {
//     setEnteredRubro(enteredText);
// };

// const agregarInputHandler = () => {
//     console.log(enteredIngEgre);
//     console.log(enteredRubro);
//     console.log(enteredMonto);
// };




export default class PresupuestoScreen extends React.Component {


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };



  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
/*
  renderCuentas = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.CuentasItemContainer}>
        <Image source={require('../../../assets/icons/cuenta.png')} style={styles.CuentasItemIcon} /> 
        <Text style={styles.CuentaItemText}>{item.alias}</Text>
        <Text style={styles.CuentaItemTextDetail}>{item.entidad}</Text>
      </View>
    </TouchableHighlight>

  );
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };
*/
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const cuentasArray = getCuentas();
    const categoryName = navigation.getParam('title');

  


    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
          </View>
          <Text style={styles.cuentasInfo}>Tu {categoryName}:</Text>
          {/* Comienza la vista para agregar información */}
          <View style={[stylePresupuesto.addBox]}>
            <TextInput placeholder="Ingreso/Egreso" 
            style={stylePresupuesto.textInput} 
            onChangeText={rubroInputHandler}
            value={enteredRubro}
            />
            <TextInput placeholder="Rubro" 
            style={stylePresupuesto.textInput}
            onChangeText={ingreEgreInputHandler}
            value={enteredIngEgre}
            />
            <TextInput placeholder="Monto" 
            style={stylePresupuesto.textInput}
            onChageText={montoInputHandler}
            value={enteredMonto}
            />
            <Button title="Agregar" onPress={agregarInputHandler}></Button>
          </View>
        </ScrollView>
        <View style={[styles.footer],{padding:30}}>
        <TouchableHighlight 
          
          onPress={() => Alert.alert('Right button pressed')}
        >
          <Text style={{fontSize: 40, color: 'white', textAlign:'center', backgroundColor:'green'}}>Guardar</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}

const stylePresupuesto = StyleSheet.create({
    addBox: {
        marginBottom: 40,
        justifyContent:'space-between',
        flexDirection:'row',
        padding: 30,
    },
    textInput: {
        width:'25%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
})