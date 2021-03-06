import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import {toView} from '../../utils/DateConverter';
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
    console.log(loan)
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
                  this.props.navigation.navigate('AddLoan', {title: title, id: loan.id});
                }}
              />
         </View>
        </View>
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
          <View style={styles.infoContainer}>
            <View style={styles.infoHead}>
            {loan.lender==1?
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansLenderItemIcon} /> )
              :
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansItemIcon} /> )
            }
              <Text style={styles.infoText}>{loan.detail}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoTextDetail}>{toView(loan.date)}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{loan.currencyCode} </Text><Text style={styles.infoText}>{loan.amount}</Text>
              </View>
            </View>
            {loan.lender!=1?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}>1er vencimiento: </Text><Text style={styles.infoText}>{toView(loan.expirationDate)}</Text>
                <View style={styles.infoRight}>
                {/*<Text style={styles.infoTextDetail}>cuota: </Text><Text style={styles.infoText}>{item.amountPaid}/{item.amountFees}</Text>*/}
                
                </View>
              </View>
          )  
          :null}
            {loan.lender!=1?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}></Text>
                <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>Valor cuota: {loan.currencyCode} </Text><Text style={styles.infoText}>{loan.amountFees}</Text>
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
