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


export default class LoansScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressLoans = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('AddLoan',{name: 'Prestamo'});
  };

  renderLoans = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.loansItemContainer}>
  {/*<Image source={require('../../../assets/icons/cuenta.png')} style={styles.CuentasItemIcon} />*/ }
        <Text style={styles.loansItemText}>{item.reference}</Text>
        <Text style={styles.loansItemText}> Monto: $ {item.value}</Text>
        <Text style={styles.loansItemTextDetail}>{item.amountPaid}/{item.amountFees}</Text>
        <Text style={styles.loansItemText}> Cuota $ {item.monthlyFee}</Text>
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
    const loansArray = getAllLoans();
    const categoryName = navigation.getParam('name');
    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoLoans} source={require('../../data/loans.jpg')} />
          </View>
          <Text style={styles.loansInfo}>Mis {categoryName}:</Text>
          <View style={{marginBottom: 40}}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={loansArray}
              renderItem={this.renderLoans}
              keyExtractor={item => `${item.id}`}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          onPress={() => this.onPressLoans()}
        >
          <Text style={{fontSize: 30, color: 'white', textAlign:'center'}}>Agregar +</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}