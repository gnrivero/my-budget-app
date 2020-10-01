import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {toView} from '../../utils/DateConverter';
import AddCardButton from '../../components/CardButton/AddCardButton';

import styles from './styles';

import InvestmentService from '../../service/InvestmentService';

const { width: viewportWidth } = Dimensions.get('window');

export default class InvestmentScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mis ' + navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
    this.service = new InvestmentService();
    this.state = {
      allInvestment : []
    };
  }


  componentDidMount(){
    this.service.getAllInvestment()
      .then((investments) => {
        this.setState({
          allInvestment: investments
      })
    });
   }
   
  componentWillReceiveProps(nextProp){
    this.service.getAllInvestment()
      .then((investments) => {
        this.setState({
          allInvestment: investments
      })
    });
  }


  onPressInvestment = item => {
    //lo llamo sin pasarle parametros
    this.props.navigation.navigate('InvestmentDetail',{name: 'Detalle Inversión', itemInvestment:  item});
  };


  renderInvestments = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressInvestment(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoHead}>
              <Image source={require('../../../assets/icons/investment.png')} style={styles.investmentItemIcon} /> 
              <Text style={styles.infoText}>{item.detail}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{item.investmentType}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{toView(item.date)}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{item.currencyCode} </Text><Text style={styles.infoText}>{item.amount}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
   
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.4, width: '100%', backgroundColor: '#C8C8C8'}}/>
    );
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoInvestment} source={require('../../data/investments.jpg')} />
          <View style={{    position: 'absolute', bottom: 5,  right: 5}}>
            <AddCardButton title = {'Nueva Inversión'}
              onPress={() => {
                let title = 'Nueva Inversión';
                this.props.navigation.navigate('AddInvestment', {title});
              }}
            />
         </View>
        </View>
        <FlatList
           data={this.state.allInvestment}
           renderItem={this.renderInvestments}
           keyExtractor={item => `${item.id}`}
           ItemSeparatorComponent={this.FlatListItemSeparator}
          />
      </ScrollView>
    );
  }
}