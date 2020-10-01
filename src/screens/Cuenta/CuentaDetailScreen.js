import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {toView} from '../../utils/DateConverter';

import styles from './styles';

import AddCardButton from '../../components/CardButton/AddCardButton';

import TransactionService from '../../service/TransactionService';

const { width: viewportWidth } = Dimensions.get('window');

export class CuentaDetailInfoScreen extends React.Component {
  render(){
    const { cuenta } = this.props;
    return(
      //this.props.card
       <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/cuenta.png')} style={styles.cuentasItemIcon} /> 
            <Text style={styles.infoText}>{cuenta.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>CBU/CVU: {cuenta.cbu}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{cuenta.bank}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{cuenta.currencyCode} </Text><Text style={styles.infoText}>{cuenta.balance}</Text>
            </View>
          </View>
        </View>
    );
  }
}

export default class CuentaDetailScreen extends React.Component {

  static navigationOptions = {
      title: 'Cuenta'
  };

  constructor(props) {
    super(props);
    this.service = new TransactionService();
    this.state = {
        };
  }

  componentDidMount(){
    const { navigation } = this.props;
    const cuenta = navigation.getParam('itemCuenta');
    this.service.getTransactionByAccountId(cuenta.id)
      .then((transaction) => {
        this.setState({
          allTransactions: transaction
      })
    });
   }


  renderTransactions = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            {item.type=="I"?
            <Image source={require('../../../assets/icons/row-up.png')} style={styles.incomeItemIcon} /> 
            :
            <Image source={require('../../../assets/icons/row-down.png')} style={styles.expensesItemIcon} /> 
            }
            <Text style={styles.infoText}>{item.detail}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Fecha: </Text><Text style={styles.infoText}>{toView(item.date)}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoText}>{item.amount}</Text>
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
    const cuenta = navigation.getParam('itemCuenta');
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
            {/* Si son cuentas efectivo no permitir editar la cuenta*/}
            {(cuenta.id>2)?(
              <AddCardButton title = {'Editar Cuenta'}
                onPress={() => {
                  let title = 'Editar Cuenta';
                  this.props.navigation.navigate('Cuenta', {title: title, id: cuenta.id});
                }}
              />
              )
              :null}
         </View>
        </View>
        <View>
          <CuentaDetailInfoScreen cuenta={cuenta}></CuentaDetailInfoScreen>
        </View>
        <View style={{height: 0.8, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <Text>Movimientos</Text>
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <FlatList
           data={this.state.allTransactions}
           renderItem={this.renderTransactions}
           keyExtractor={item => `${item.id}`}
           ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}