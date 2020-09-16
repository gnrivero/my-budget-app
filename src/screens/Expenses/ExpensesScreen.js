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
  getCategoryName
} from '../../data/MockDataAPI';

export default class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressCuenta = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('Cuenta');
  };

  renderCuentas = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.CuentasItemContainer}>
        <Image source={require('../../../assets/icons/cuenta.png')} style={styles.CuentasItemIcon} /> 
        <Text style={styles.CuentaItemText}>{item.nombreCuenta}</Text>
        <Text style={styles.CuentaItemTextDetail}>{item.entidad}</Text>
        <Text style={styles.CuentaItemText}>$ {item.saldo}</Text>
      </View>
    </TouchableHighlight>

  );
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

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
          <Text style={styles.cuentasInfo}>Mis {categoryName}:</Text>
          <View style={{marginBottom: 40}}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={cuentasArray}
              renderItem={this.renderCuentas}
              keyExtractor={item => `${item.id}`}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          onPress={() => this.onPressCuenta()}
        >
          <Text style={{fontSize: 30, color: 'white', textAlign:'center'}}>Agregar +</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}