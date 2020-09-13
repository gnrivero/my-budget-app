import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Dimensions
} from 'react-native';
import styles from './styles';
import SaveCardButton from '../../components/CardButton/SaveCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class ModifyCardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontSize: 16
        }
      };
    };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={{alignItems: 'center'}}>
            <View style={styles.cardItemContainer}>
              <TextInput style={styles.largeInput}
                placeholder="Elegí un nombre para tu tarjeta"
              ></TextInput>
              <View style={styles.infoContainer}>
                <View style={styles.info}>
                  <Text style={styles.infoCard}>Emisor</Text><TextInput style={styles.mediumInput}></TextInput>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoCard}>Ultimos 4 digitos</Text><TextInput style={styles.smallInput}></TextInput>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoCard}>Vencimiento</Text><TextInput style={styles.mediumInput}></TextInput>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoCard}>Cierre</Text><TextInput style={styles.mediumInput}></TextInput>
                </View>
                <View style={styles.info}>
                  <Text style={styles.infoCard}>Vencimiento</Text><TextInput style={styles.mediumInput}></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
             <SaveCardButton
               onPress={() => {
                 //let ingredients = item.ingredients;
                 let title = 'Guardar';
                 //navigation.navigate('IngredientsDetails', { ingredients, title });
               }}
             />
            </View>
           </View>
      </ScrollView>
    );
  }
}