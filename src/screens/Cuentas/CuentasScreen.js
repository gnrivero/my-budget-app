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
import AddCardButton from '../../components/CardButton/AddCardButton';
import AccountService from '../../service/AccountService';

export default class CuentasScreen extends React.Component {

  service;

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis Cuentas'
    };
  };

  constructor(props) {
    super(props);
    this.service = new AccountService();
    this.state = {
        allAccounts : []
    }
  }

  componentDidMount(){
   this.service.getAllAccounts()
     .then((accounts) => {
       this.setState({
         allAccounts: accounts
     })
   });
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
            <Text style={styles.infoText}>{item.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>CBU/CVU: {item.cbu}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{item.bank}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currencyCode} </Text><Text style={styles.infoText}>{item.balance}</Text>
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
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nueva Cuenta'}
              onPress={() => {
                let title = 'Nueva Cuenta';
                this.props.navigation.navigate('Cuenta',{title});
              }}
            />
          </View>
        </View>
        <FlatList
          data={this.state.allAccounts}
          renderItem={this.renderCuentas}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
      </ScrollView>
    );
  }
}