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
  homeButtonLargeImage: {
    borderRadius: 10,
    height: 80,
    width: 334
  },
  homeButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
  buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 10
  },
  squareButton: {
    flex: 1,
    height: 110,
    width: '100%',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#d2d6d2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
      flex: 1,
      height: 110,
      marginHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      borderColor: '#d2d6d2',
      borderWidth: 1,
      textAlign: 'center'
  },
  photo: RecipeCard.photo,
  category: RecipeCard.category
});

export default styles;
