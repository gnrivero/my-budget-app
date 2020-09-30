import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 100,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5
},
  infoHead:{
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },

  info:{   
    flex: 1,
    flexDirection: 'row',
    height: 25,
  },
  infoRight:{   
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 25,
  },
  cuentasItemIcon: {
    paddingTop:5,
    marginRight: 5,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'#2cd18a',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  infoTextDetail: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 16,
    marginLeft:5,
    marginTop:5
  },
  photoCuentas: {
    width: '100%',
    height: 200,
    alignSelf: 'center'
  },
  cuentasInfo: {
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
  category: RecipeCard.category
}

);

export default styles;
