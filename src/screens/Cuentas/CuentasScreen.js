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

import AddCardButton from '../../components/CardButton/AddCardButton';

export default class CuentasScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }
  onPressCuenta = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('CuentaDetail',{name: 'Detalle cuenta', itemCuenta:  item});
  };


  renderCuentas = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressCuenta(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/cuenta.png')} style={styles.cuentasItemIcon} /> 
            <Text style={styles.infoText}>{item.nombreCuenta}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>CBU/CVU: {item.cbuCvu}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{item.nombreEntidad}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currency==1?'ARS:':(item.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{item.saldo}</Text>
            </View>
          </View>
        </View>
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
    //const categoryName = navigation.getParam('name');
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nueva Cuenta'}
              onPress={() => {
                //let title = 'Nueva Tarjeta';
                //this.props.navigation.navigate('ModifyCard', {title});
                this.props.navigation.navigate('Cuenta');
                
              }}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={cuentasArray}
            renderItem={this.renderCuentas}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.FlatListItemSeparator}
          />
        </View>
      </ScrollView>

    );
  }
}