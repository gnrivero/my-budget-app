import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput
} from 'react-native';
import styles from './styles';
import AddCardButton from '../../components/AddCardButton/AddCardButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class CardScreen extends React.Component {

  static navigationOptions = {
      title: 'Edicion de tarjeta'
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
        <View style={styles.cardItemContainer}>
          <Text style={styles.cardName}><TextInput style={styles.mediumInput}></TextInput></Text>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Emisor:</Text><TextInput style={styles.mediumInput}></TextInput>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Ultimos 4 digitos:</Text><TextInput style={styles.mediumInput}></TextInput>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Vencimiento:</Text><TextInput style={styles.mediumInput}></TextInput>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Cierre:</Text><TextInput style={styles.mediumInput}></TextInput>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoCard}>Vencimiento:</Text><TextInput style={styles.mediumInput}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
         <AddCardButton
           onPress={() => {
             //let ingredients = item.ingredients;
             let title = 'Guardar';
             //navigation.navigate('IngredientsDetails', { ingredients, title });
           }}
         />
        </View>
      </ScrollView>
    );
  }
}