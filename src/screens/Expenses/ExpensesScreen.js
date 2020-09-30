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
import AddCardButton from '../../components/CardButton/AddCardButton';

import styles from './styles';

import TransactionService from '../../service/TransactionService';

export default class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
    this.service = new TransactionService();
    this.state = {
      allExpenses : []
    }
  }

  componentDidMount(){
    this.service.getTransactionByType('E')
      .then((transaction) => {
        this.setState({
          allExpenses: transaction
      })
    });
   }
   
  componentWillReceiveProps(nextProp){
  this.service.getTransactionByType('E')
  .then((transaction) => {
    this.setState({
      allExpenses: transaction
    })
  });
  }
   
  onPressExpenses = item => {
/* VER SI HACEMOS ALGUNA LOGICA*/
  };

  renderExpenses = ({ item }) => (

    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressExpenses(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/row-down.png')} style={styles.expensesItemIcon} /> 
            <Text style={styles.infoText}>{item.allExpenses}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoText}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>{item.detail}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Pagado con: </Text>
            <Text style={styles.infoText}>{(item.card!='' || item.card!=null)?(item.card):(item.account)}</Text>
            <View style={styles.infoRight}>
            <Text style={styles.infoTextDetail}>{item.currencyCode} </Text><Text style={styles.infoText}>{item.amount}</Text>
            </View>
          </View>
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
          <Image style={styles.photoExpenses} source={require('../../data/expenses.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nuevo Egreso'}
              onPress={() => {
                let title = 'Nuevo Egreso';
                this.props.navigation.navigate('AddExpenses', {title});
              }}
            />
         </View>
        </View>
          <FlatList
            data={this.state.allExpenses}
            renderItem={this.renderExpenses}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}