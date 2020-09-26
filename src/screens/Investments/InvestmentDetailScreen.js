import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  Alert
} from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { getInvestmentTypes,getAccounts } from '../../data/investments/investmentsAPI';

import { Dropdown } from 'react-native-material-dropdown';
import SwitchSelector from 'react-native-switch-selector';
import DatePicker from 'react-native-datepicker';

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

    const typesArray = getInvestmentTypes();
    const accountsArray = getAccounts();
    const optionsCurrency = [
      { label: 'Pesos', value: 1},
      { label: 'Dolares', value: 2 }
    ];
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
                  // TODO: Ver que onda this.props.navigation.navigate('Cuenta', {title: title, id: cuenta.id});
                }}
              />
         </View>
        </View>
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
          <View style={styles.infoContainer}>
            <View style={styles.infoHead}>
              <Image source={require('../../../assets/icons/investment.png')} style={styles.investmentItemIcon} /> 
              <Text style={styles.infoText}>{inversion.name}</Text>
              <View style={styles.infoRight}>
                {
                  /*(item.type=="PLAZO_FIJO")?( <Text style={styles.infoTextDetail}>Plazo fijo</Text>):(item.type=="FONDO_COMUN")? ( <Text style={styles.infoTextDetail}>Fondo Comun</Text>): ( <Text style={styles.infoTextDetail}>Acciones</Text>)*/
                  (inversion.type==1)?( <Text style={styles.infoTextDetail}>Plazo fijo</Text>):(inversion.type==2)? ( <Text style={styles.infoTextDetail}>Fondo Comun</Text>): (inversion.type==3)?( <Text style={styles.infoTextDetail}>Acciones</Text>):( <Text style={styles.infoTextDetail}>Otra</Text>)
                }
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{inversion.date}</Text>
              <View style={styles.infoRight}>
                <Text style={styles.infoTextDetail}>{inversion.currency==1?'ARS:':(inversion.currency==2)?'USD:':''} </Text><Text style={styles.infoText}>{inversion.amount}</Text>
              </View>
            </View>
            {(inversion.type==1)?
            (
                <View style={styles.info}>
                  <Text style={styles.infoTextDetail}>Vencimiento: </Text><Text style={styles.infoText}>{inversion.dueDate}</Text>
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
            {(inversion.type==1)?
            (
              <View style={styles.info}>
                <Text style={styles.infoTextDetail}>Acreditar en: </Text><Text style={styles.infoText}>{inversion.accountName}</Text>
              </View>
            ):(null)
            }
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
    