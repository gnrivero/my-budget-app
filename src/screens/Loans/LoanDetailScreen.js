import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';

import AddCardButton from '../../components/CardButton/AddCardButton';

export default class LoanDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);

    this.state = {
                };
  }
  
  render() {
    const { navigation } = this.props;
    const loan = navigation.getParam('itemLoan');
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
        <Image style={styles.photoLoans} source={require('../../data/loans.jpg')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
              <AddCardButton title = {'Editar Prestamo'}
                onPress={() => {
                  let title = 'Editar Prestamo';
                  // TODO: Ver que onda this.props.navigation.navigate('Cuenta', {title: title, id: cuenta.id});
                }}
              />
         </View>
        </View>
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
          <View style={styles.infoContainer}>
            <View style={styles.infoHead}>
            {item.lender?
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansLenderItemIcon} /> )
              :
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansItemIcon} /> )
            }
              <Text style={styles.infoText}>{inversion.reference}</Text>
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
                <Text style={styles.infoTextDetail}>Día de vencimiento: </Text><Text style={styles.infoText}>{item.expirationDay}</Text>
                <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>cuota: </Text><Text style={styles.infoText}>{item.amountPaid}/{item.amountFees}</Text>
                
                </View>
              </View>
          )  
          :null}
            {!item.lender?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}></Text>
                <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>Valor cuota: {item.currency==1?'ARS':(item.currency==2)?'USD':''} </Text><Text style={styles.infoText}>{item.monthlyFee}</Text>
                </View>
              </View>
            )  
            :null}
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}