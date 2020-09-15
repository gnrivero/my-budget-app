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
import { cards } from '../../data/cards/dataArrays';
import AddCardButton from '../../components/CardButton/AddCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class CardScreen extends React.Component {

  static navigationOptions = {
      title: 'Mis Tarjetas'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderCards = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCard(item)}>
        <View style={styles.cardItemContainer}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoCard}>{item.issuer}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Termina en:</Text><Text>{item.lastFourNumbers}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Vencimiento:</Text><Text>{item.expiryDate}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Cierre:</Text><Text>{item.closeDate}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Vencimiento:</Text><Text>{item.dueDate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );

  render() {

    return (
      <ScrollView>
        <View style={styles.infoContainer}>
         <AddCardButton
           onPress={() => {
             let title = 'Nueva Tarjeta';
             this.props.navigation.navigate('ModifyCard', {title});
           }}
         />
        </View>
        <FlatList
           data={cards}
           renderItem={this.renderCards}
           keyExtractor={item => `${item.id}`}
          />
      </ScrollView>
    );
  }
}