import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonStyle: {
    // backgroundColor:"darkorange",
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:"black",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  
  photo: RecipeCard.photo,
  category: RecipeCard.category
});

export default styles;
