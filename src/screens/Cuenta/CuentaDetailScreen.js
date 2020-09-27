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
import styles from './styles';

import {
  getTransactions
} from '../../data/MockDataAPI';

import AddCardButton from '../../components/CardButton/AddCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export class CuentaDetailInfoScreen extends React.Component {
  render(){
    const { cuenta } = this.props;
    return(
      //this.props.card
       <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/cuenta.png')} style={styles.cuentasItemIcon} /> 
            <Text style={styles.infoText}>{cuenta.nombreCuenta}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>CBU/CVU: {cuenta.cbuCvu}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{cuenta.nombreEntidad}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{cuenta.currency==1?'ARS:':(cuenta.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{cuenta.saldo}</Text>
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
    this.state = {
        };
  }

  renderTransactions = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            {item.transactionType==1?
            <Image source={require('../../../assets/icons/row-up.png')} style={styles.incomeItemIcon} /> 
            :
            <Image source={require('../../../assets/icons/row-down.png')} style={styles.expensesItemIcon} /> 
            }
            <Text style={styles.infoText}>{item.name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Fecha: </Text><Text style={styles.infoText}>{item.date}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoText}>{item.value}</Text>
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
    const transactions = getTransactions(cuenta.id);
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
              <AddCardButton title = {'Editar Cuenta'}
                onPress={() => {
                  let title = 'Editar Cuenta';
                  this.props.navigation.navigate('Cuenta', {title: title, id: cuenta.id});
                }}
              />
         </View>
        </View>
        <View>
          <CuentaDetailInfoScreen cuenta={cuenta}></CuentaDetailInfoScreen>
        </View>
        <View style={{height: 0.8, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <Text>Movimientos</Text>
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <FlatList
           data={transactions}
           renderItem={this.renderTransactions}
           keyExtractor={item => `${item.id}`}
           ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}