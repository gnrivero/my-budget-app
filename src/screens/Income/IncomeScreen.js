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
import {
  getAllIncome
} from '../../data/income/incomeAPI';

export default class IncomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressIncome = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('AddIncome',{name: 'Ingreso'});
  };

  renderIncome = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <View style={styles.incomeItemContainer}>
        {<Image source={require('../../../assets/icons/row-up.png')} style={styles.incomeItemIcon} />}
        <Text style={styles.incomeItemText}>{item.date}</Text>
        <Text style={styles.incomeItemTextDetail}> - </Text>
        <Text style={styles.incomeItemText}>{item.typeIncomeName}</Text>
        <Text style={styles.incomeItemTextDetail}>{item.entidad}</Text>
        <Text style={styles.incomeItemText}> {item.currency}</Text>
        <Text style={styles.incomeItemText}> {item.value}</Text>
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
    const incomeArray = getAllIncome();
    const categoryName = navigation.getParam('name');
    return (
      <View>
        <ScrollView style={styles.mainContainer}>
          <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoIncome} source={require('../../data/income.jpg')} />
          </View>
          <Text style={styles.incomeInfo}>Mis {categoryName}:</Text>
          <View style={{marginBottom: 40}}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={incomeArray}
              renderItem={this.renderIncome}
              keyExtractor={item => `${item.id}`}
              ItemSeparatorComponent={this.FlatListItemSeparator}
            />
          </View>
        </ScrollView>
        <View style={[styles.footer]}>
        <TouchableHighlight 
          onPress={() => this.onPressIncome()}
        >
          <Text style={{fontSize: 30, color: 'white', textAlign:'center'}}>Agregar +</Text>
        </TouchableHighlight>
        </View>
     </View>
    );
  }
}