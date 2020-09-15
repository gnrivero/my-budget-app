import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { getStocks } from '../../data/investments/investmentsAPI';

const { width: viewportWidth } = Dimensions.get('window');

export default class AddInvestmentScreen extends React.Component {

  static navigationOptions = {
      title: 'por parametro'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  // Nueva Inversion
  //
  // Tipo:
  // Monto:
  // Tasa:
  // Plazo:
  //

  renderStocks = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  render() {
    return (
      <ScrollView>
        <FlatList
           data={getStocks}
           renderItem={this.renderStocks}
           keyExtractor={item => `${item.id}`}
          />
      </ScrollView>
    );
  }
}