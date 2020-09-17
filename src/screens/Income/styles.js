import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  incomeItemContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:15,
    margin: 10,
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  incomeItemIcon: {
    margin:5,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'#2cd18a',
  },
  incomeItemText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  incomeItemTextDetail: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 16,
    marginLeft:5,
    marginTop:5

  },
  photoIncome: {
    width: '100%',
    height: 200,
    alignSelf: 'center'
  },
  incomeInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },

  footer: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2cd18a'
  },

  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  input: RecipeCard.input,
}

);

export default styles;