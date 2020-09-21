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
import {getAllCards} from '../../data/cards/cardsAPI';

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

  onPressCard = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('CardDetail',{name: 'Detalle tarjeta', itemCard:  item});
  };


  renderCards = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCard(item)}>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/cards.png')} style={styles.CardsItemIcon} /> 
            <Text style={styles.infoText}>{item.name}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>...</Text><Text style={styles.infoText}>{item.lastFourNumbers}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Vencimiento: </Text><Text style={styles.infoText}>{item.expiryDate}</Text>
            <View style={styles.infoRight}>
             <Text style={styles.infoTextDetail}>Cierre: </Text><Text style={styles.infoText}>{item.closeDate}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Vencimiento resumen: </Text><Text style={styles.infoText}>{item.dueDate}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>ARS: </Text><Text style={styles.infoText}>{item.consumption}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}></Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>USD: </Text><Text style={styles.infoText}>{item.consumptionDolar}</Text>
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
    const cards = getAllCards();
    //const categoryName = navigation.getParam('name');
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCards} source={require('../../data/cards.png')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
              <AddCardButton title = {'Nueva Tarjeta'}
                onPress={() => {
                  let title = 'Nueva Tarjeta';
                  this.props.navigation.navigate('ModifyCard', {title});
                }}
              />
         </View>
        </View>
        <FlatList
           data={cards}
           renderItem={this.renderCards}
           keyExtractor={item => `${item.id}`}
           ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}