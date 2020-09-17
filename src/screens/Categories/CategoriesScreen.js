import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
//import { getNumberOfRecipes } from '../../data/MockDataAPI';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categorias'
  };

  constructor(props) {
    super(props);
  }

  onPressCategory = item => {
    const title = item.title;
    const category = item;
    const name = item.name;
    this.props.navigation.navigate(title, { category, title, name });
    
  };

  getCategoriaUrl(nombre) {
    var titleImg;

    switch (nombre) {
      case 'bank':
          titleImg = require('../../data/banco.jpg');
          break;
      case 'cards':
        titleImg = require('../../data/cards.png');
        break;
        case 'expenses':
        titleImg = require('../../data/expenses.jpg');
        break;
        case 'income':
        titleImg = require('../../data/income.jpg');
        break;
        case 'expenses':
        titleImg = require('../../data/expenses.jpg');
        break;
        case 'investments':
          titleImg = require('../../data/investments.jpg');
        break;
        case 'loans':
          titleImg = require('../../data/loans.jpg');
        break;
      default:
        titleImg= nombre;
      }

    return titleImg;
  }

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={this.getCategoriaUrl(item.photo_url)} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        {/*<Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>*/}
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
