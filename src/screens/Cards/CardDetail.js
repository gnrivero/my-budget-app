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
import AddCardButton from '../../components/CardButton/AddCardButton';
import CardService from '../../service/CardService';
import {toView} from '../../utils/DateConverter';

const { width: viewportWidth } = Dimensions.get('window');

export class CardDetailInfoScreen extends React.Component {

  cardService;

  render(){
    const { card } = this.props;
    return(
      //this.props.card
      <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/cards.png')} style={styles.cardsItemIcon} /> 
            <Text style={styles.infoText}>{card.name}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>Termina en: </Text><Text style={styles.infoText}>{card.lastFourNumbers}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Vencimiento: </Text><Text style={styles.infoText}>{card.expiryDate}</Text>
            <View style={styles.infoRight}>
             <Text style={styles.infoTextDetail}>Cierre: </Text><Text style={styles.infoText}>{toView(card.closeDate)}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Vencimiento resumen: </Text><Text style={styles.infoText}>{toView(card.dueDate)}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>ARS: </Text><Text style={styles.infoText}>{card.consumption}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}></Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>USD: </Text><Text style={styles.infoText}>{card.consumptionDolar}</Text>
            </View>
          </View>

        </View>
    );
  }
}

export default class CardDetailScreen extends React.Component {

  static navigationOptions = {
      title: 'Tarjeta'
  };

  cardService;

  constructor(props) {
    super(props);
    this.cardService = new CardService();
    this.state = {
        cardConsumptions : []
    };
  }

  componentDidMount(){

      const { navigation } = this.props;
      const card = navigation.getParam('itemCard');
      this.cardService.getCardCurrentPeriodConsumption(card.id)
      .then((consumptions) => {
            this.setState({
                cardConsumptions: consumptions
            });}
      );
  }

  renderConsumptions = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <View style={styles.infoContainer}>
          <View style={styles.infoHead}>
            <Image source={require('../../../assets/icons/consumptions.png')} style={styles.cardsItemIcon} /> 
            <Text style={styles.infoText}>{item.detail}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTextDetail}>Fecha: </Text><Text style={styles.infoText}>{toView(item.date)}</Text>
            <View style={styles.infoRight}>
              <Text style={styles.infoTextDetail}>{item.currencyCode} </Text><Text style={styles.infoText}>{item.amount}</Text>
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
    const card = navigation.getParam('itemCard');

    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoCards} source={require('../../data/cards.png')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
              <AddCardButton title = {'Editar Tarjeta'}
                onPress={() => {
                  let title = 'Editar Tarjeta';
                  this.props.navigation.navigate('ModifyCard', {title: title, id: card.id});
                }}
              />
         </View>
        </View>
        <View>
          <CardDetailInfoScreen card={card}></CardDetailInfoScreen>
        </View>
        <View style={{height: 0.8, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <Text >Consumos</Text>
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
        <FlatList
           data={this.state.cardConsumptions}
           renderItem={this.renderConsumptions}
           keyExtractor={item => `${item.detail}`}
           ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}