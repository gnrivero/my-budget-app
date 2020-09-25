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
import {  getAllLoans } from '../../data/loans/loansAPI';

import AddCardButton from '../../components/CardButton/AddCardButton';

export default class LoansScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressLoans = item => {
    //lo llamo sin pasarle parametros
    //this.props.navigation.navigate('AddLoan',{name: 'Prestamo'});
    //this.props.navigation.navigate('CuentaDetail',{name: 'Detalle cuenta', itemCuenta:  item});
  };

  renderLoans = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressLoans(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            {item.lender?
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansLenderItemIcon} /> )
              :
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansItemIcon} /> )
            }
            <Text style={styles.infoText}>{item.reference}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{item.date}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currency==1?'ARS:':(item.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{item.value}</Text>
            </View>
          </View>
          {!item.lender?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}>Fecha de vencimiento</Text><Text style={styles.infoText}>{item.expirationDay}</Text>
                <Text style={styles.infoTextDetail}>cuota </Text><Text style={styles.infoText}>{item.amountPaid}/{item.amountFees}</Text>
                <View style={styles.infoRight}>
                  <Text style={styles.infoTextDetail}>{item.currency==1?'ARS:':(item.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{item.monthlyFee}</Text>
                </View>
              </View>
          )
          :null}
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
    const loansArray = getAllLoans();
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoLoans} source={require('../../data/loans.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nuevo Prestamo'}
              onPress={() => {
                let title = 'Nuevo Prestamo';
                //this.props.navigation.navigate('ModifyCard', {title});
                this.props.navigation.navigate('AddLoan',{title});
                
              }}
            />
          </View>
        </View>
        <FlatList
          data={loansArray}
          renderItem={this.renderLoans}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
      </ScrollView>
    );
  }
}