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
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { getAllInvestments } from '../../data/investments/investmentsAPI';


import AddCardButton from '../../components/CardButton/AddCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class InvestmentScreen extends React.Component {

  static navigationOptions = {
      title: 'Mis Inversiones'
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
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
              <Text style={styles.infoText}>{item.name}</Text>
              <View style={styles.infoRight}>
                {
                  /*(item.type=="PLAZO_FIJO")?( <Text style={styles.infoTextDetail}>Plazo fijo</Text>):(item.type=="FONDO_COMUN")? ( <Text style={styles.infoTextDetail}>Fondo Comun</Text>): ( <Text style={styles.infoTextDetail}>Acciones</Text>)*/
                  (item.type==1)?( <Text style={styles.infoTextDetail}>Plazo fijo</Text>):(item.type==2)? ( <Text style={styles.infoTextDetail}>Fondo Comun</Text>): (item.type==3)?( <Text style={styles.infoTextDetail}>Acciones</Text>):( <Text style={styles.infoTextDetail}>Otra</Text>)
                }
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{item.date}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{item.currency==1?'ARS:':(item.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{item.amount}</Text>
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
    const investments = getAllInvestments();
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
           data={investments}
           renderItem={this.renderInvestments}
           keyExtractor={item => `${item.id}`}
          /* ItemSeparatorComponent={this.FlatListItemSeparator}*/
          />
      </ScrollView>
    );
  }
}