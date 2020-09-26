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

import AddCardButton from '../../components/CardButton/AddCardButton';

export default class IncomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressIncome = item => {
    /* VER SI HACEMOS ALGUNA LOGICA
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('IncomeDetail',{name: 'Detalle Ingreso', itemCuenta:  item});
    */
    
  };

  renderIncome = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'  onPress={() => this.onPressIncome(item)}>
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View style={styles.infoHead}>
          <Image source={require('../../../assets/icons/row-up.png')} style={styles.incomeItemIcon} /> 
          <Text style={styles.infoText}>{item.typeIncomeName}</Text>
          <View style={styles.infoRight}>
            <Text style={styles.infoText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{item.detail}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTextDetail}>Destino: </Text><Text style={styles.infoText}>{item.cash?'Efectivo':item.nombreCuenta}</Text>
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
//    const item = navigation.getParam('category');
    const incomeArray = getAllIncome();
  //  const categoryName = navigation.getParam('name');
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoIncome} source={require('../../data/income.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nuevo Ingreso'}
              onPress={() => {
                let title = 'Nuevo Ingreso';
                this.props.navigation.navigate('AddIncome', {title});
              }}
            />
         </View>
        </View>
          <FlatList
            data={incomeArray}
            renderItem={this.renderIncome}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}