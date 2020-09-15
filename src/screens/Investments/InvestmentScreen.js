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
import { investmentTypes } from '../../data/investments/dataArrays';
import { investments } from '../../data/investments/dataArrays';

const { width: viewportWidth } = Dimensions.get('window');

export default class InvestmentScreen extends React.Component {

  static navigationOptions = {
      title: 'Inversiones'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderInvestmentTypes = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressInvestment(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableHighlight>
  );

  renderCurrentInvestments = ({ item }) => (
      <View style={styles.listRow}>
        <Text style={styles.info}>{item.name}</Text>
        <Text style={styles.info}>{item.currency}</Text>
        <Text style={styles.info}>{item.amount}</Text>
        <Text style={styles.info}>{item.dueDate}</Text>
      </View>
   );

  render() {

    return (
      <ScrollView>
        <Text style={styles.itemName}>Nueva Inversión</Text>

        <FlatList
            data={investmentTypes}
            renderItem={this.renderInvestmentTypes}
            keyExtractor={item => `${item.id}`}
        />

        <Text style={styles.itemName}>Inversiones Actuales</Text>

        <FlatList
            data={investments}
            renderItem={this.renderCurrentInvestments}
            keyExtractor={item => `${item.id}`}
        />
      </ScrollView>
    );
  }
}