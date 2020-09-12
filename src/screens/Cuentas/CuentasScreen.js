import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import {
  getIngredientUrl,
  getCuentas,
  getCategoryName
} from '../../data/MockDataAPI';

export default class CuentasScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderCuentas = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <View style={styles.CuentasItemContainer}>

        <Text style={styles.title}>cuenta</Text>
        <Text>{item.entidad}}</Text>
        <Text>{item.alias}}</Text>
        </View>
      </TouchableHighlight>
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
    const cuentasArray = getCuentas();
    const categoryName = navigation.getParam('title');
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: 'grey' }}>
          <Image style={styles.photoCuentas} source={require('../../data/banco.jpg')} />
        </View>
        <Text style={styles.cuentasInfo}>Mis {categoryName}:</Text>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={1}
            data={cuentasArray}
            renderItem={this.renderCuentas}
            keyExtractor={item => `${item.id}`}
             ItemSeparatorComponent={this.FlatListItemSeparator}
          />
        </View>
      </ScrollView>
    );
  }
}