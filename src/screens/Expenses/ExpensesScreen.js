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

export default class ExpensesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressExpenses = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('AddExpenses',{name: 'Egreso'});
    //////////////this.props.navigation.navigate('Addexpenses');
  };

  renderExpenses = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.expensesItemContainer}>
        {<Image source={require('../../../assets/icons/row-down.png')} style={styles.expensesItemIcon} />}
        <Text style={styles.expensesItemText}>{item.date}</Text>
        <Text style={styles.expensesItemTextDetail}> - </Text>
        <Text style={styles.expensesItemTextDetail}>{item.typeExpensesName}</Text>
        <Text style={styles.expensesItemTextDetail}>{item.currency}:</Text>
        <Text style={styles.expensesItemText}> {item.value}</Text>
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
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoExpenses} source={require('../../data/expenses.jpg')} />
          </View>
          <Text style={styles.expensesInfo}>Mis {categoryName}:</Text>
          <View style={{marginBottom: 40}}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={expensesArray}
              renderItem={this.renderExpenses}
              keyExtractor={item => `${item.id}`}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          onPress={() => this.onPressExpenses()}
        >
          <Text style={{fontSize: 30, color: 'white', textAlign:'center'}}>Agregar +</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}