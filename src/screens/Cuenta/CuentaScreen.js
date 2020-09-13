import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  Button,
  Alert
} from 'react-native';
import styles from './styles';
import {
  getCuentas,
  getCategoryName
} from '../../data/MockDataAPI';

export default class CuentaScreen extends React.Component {
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
          <Text style={styles.cuentasInfo}>Agregar {categoryName}:</Text>
          <View style={{marginBottom: 40}}>
            <Text>CAMPOS CUENTA</Text>
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          
          onPress={() => Alert.alert('Right button pressed')}
        >
          <Text style={{fontSize: 40, color: 'white', textAlign:'center'}}>Guardar</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}