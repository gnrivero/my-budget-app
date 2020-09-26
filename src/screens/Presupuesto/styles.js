import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';


const styles = StyleSheet.create({
  datosAgregar: {
    marginBottom: 40,
    justifyContent:'space-between',
    flexDirection:'row',
    padding: 30,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 120,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20
},
CardsItemIcon: {
  paddingTop:5,
  marginRight: 5,
  width:30,
  height:30,
  borderRadius:15,
  backgroundColor:'#2cd18a',
},
  cardItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20
},
infoContainer: { //boton
  flex: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  margin: 15,
  
},
photoCards: {
  width: '100%',
  height: 200,
  alignSelf: 'center'
},
cardName: {
  flex: .2,
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333333',
  marginTop: 8
},
info: {
  flex: 1,
  flexDirection: 'row',
  height: 30
},

  CuentasItemContainer: {
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
  cuentasItemIcon: {
    margin:5,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'#2cd18a',
  },
  CuentaItemText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  CuentaItemTextDetail: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 16,
    marginLeft:5,
    marginTop:5

  },
  infoHead:{
    flex: 1,
    flexDirection: 'row',
    height: 30,
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
  infoRight:{   
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 25,
  },
  photoCuentas: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  cuentasInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
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
