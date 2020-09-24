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
import {  getAllExpenses } from '../../data/expenses/expensesAPI';

import AddCardButton from '../../components/CardButton/AddCardButton';

export default class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressExpenses = item => {
/* VER SI HACEMOS ALGUNA LOGICA*/
    //lo llamo sin pasarle parametros
    ///this.props.navigation.navigate('AddExpenses',{name: 'Egreso'});
    //////////////this.props.navigation.navigate('Addexpenses');
  };

  renderExpenses = ({ item }) => (

    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressExpenses(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/row-down.png')} style={styles.expensesItemIcon} /> 
            <Text style={styles.infoText}>{item.typeExpensesName}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoText}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>{item.detail}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Medio de pago: </Text><Text style={styles.infoText}>{item.paymentMethodName}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currency==1?'ARS:':(item.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{item.value}</Text>
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
    const expensesArray = getAllExpenses();
    const categoryName = navigation.getParam('name');
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
            data={expensesArray}
            renderItem={this.renderExpenses}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}