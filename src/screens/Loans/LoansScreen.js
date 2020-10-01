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
import {toView} from '../../utils/DateConverter';
import AddCardButton from '../../components/CardButton/AddCardButton';

import styles from './styles';

import LoanService from '../../service/LoanService';

export default class LoansScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
    this.service = new LoanService();
    this.state = {
      allLoans : []
    };
  }

  
  componentDidMount(){
    this.service.getAllLoans()
      .then((loans) => {
        this.setState({
          allLoans: loans
      })
    });
   }
   
  componentWillReceiveProps(nextProp){
    this.service.getAllLoans()
      .then((loans) => {
        this.setState({
          allLoans: loans
      })
    });
  }

  onPressLoans = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('LoanDetail',{name: 'Detalle Prestamo', itemLoan:  item});
    //this.props.navigation.navigate('CuentaDetail',{name: 'Detalle cuenta', itemCuenta:  item});
  };

  renderLoans = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressLoans(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            {item.lender==1?
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansLenderItemIcon} /> )
              :
              (<Image source={require('../../../assets/icons/loan.png')} style={styles.loansItemIcon} /> )
            }
            <Text style={styles.infoText}>{item.detail}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>{toView(item.date)}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currencyCode}</Text><Text style={styles.infoText}>{item.amount}</Text>
            </View>
          </View>
          {item.lender!=1?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}>1er vencimiento: </Text><Text style={styles.infoText}>{toView(item.expirationDate)}</Text>
                <View style={styles.infoRight}>
                  <Text style={styles.infoTextDetail}>Valor cuota: {item.currencyCode}</Text><Text style={styles.infoText}>{item.amountFees}</Text>
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
      <View style={{height: 0.4, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  render() {
    const { navigation } = this.props;
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
          data={this.state.allLoans}
          renderItem={this.renderLoans}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
      </ScrollView>
    );
  }
}