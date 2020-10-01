import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {toView} from '../../utils/DateConverter';
import styles from './styles';


import AddCardButton from '../../components/CardButton/AddCardButton';
const { width: viewportWidth } = Dimensions.get('window');

export default class InvestmentDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Inversión'
    };
  };

  constructor(props) {
    super(props);
    this.state =  {
      activeSlide: 0
    };
  }
  

  render() {
    const { navigation } = this.props;
    const inversion = navigation.getParam('itemInvestment');
    
    return (
      <ScrollView>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
            <Image style={styles.photoInvestment} source={require('../../data/investments.jpg')} />
            <View style={{    position: 'absolute',
          bottom: 5,
          right: 5}}>
              <AddCardButton title = {'Editar Inversión'}
                onPress={() => {
                  let title = 'Editar Inversión';
                  this.props.navigation.navigate('AddInvestment', {title: title, id: inversion.id});
                  // TODO: Ver que onda this.props.navigation.navigate('Cuenta', {title: title, id: cuenta.id});
                }}
              />
         </View>
        </View>
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
          <View style={styles.infoContainer}>
            <View style={styles.infoHead}>
              <Image source={require('../../../assets/icons/investment.png')} style={styles.investmentItemIcon} /> 
              <Text style={styles.infoText}>{inversion.detail}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{inversion.investmentType}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{toView(inversion.date)}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{inversion.currencyCode} </Text><Text style={styles.infoText}>{inversion.amount}</Text>
              </View>
            </View>
            {(inversion.investmentTypeId==1)?
            (
                <View style={styles.info}>
                  <Text style={styles.infoTextDetail}>Vencimiento: </Text><Text style={styles.infoText}>{toView(inversion.dueDate)}</Text>
                  <View style={styles.infoRight}>
                    <Text style={styles.infoTextDetail}>Monto recuperado: </Text><Text style={styles.infoTextDetail}>{inversion.currency==1?'ARS:':(inversion.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{inversion.amountCredited}</Text>
                  </View>
                </View>
            )
            :(
              <View style={styles.info}>
                  <Text style={styles.infoTextDetail}></Text>
                  <View style={styles.infoRight}>
                    <Text style={styles.infoText}>{inversion.symbol}</Text>
                  </View>
                </View>
            )
            }
            {(inversion.investmentTypeId==1)?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}>Acreditar en: </Text><Text style={styles.infoText}>{inversion.account}</Text>
              </View>
            ):(null)
            }
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
    