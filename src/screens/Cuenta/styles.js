import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
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
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10
},
infoHead:{
  flex: 1,
  flexDirection: 'row',
  height: 30,
},
info: {
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
    margin:5,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'#2cd18a',
},
incomeItemIcon: {
  margin:5,
  width:30, 
  height:30,
  borderRadius:15,
  backgroundColor:'#2cd18a',
},
expensesItemIcon: {
  margin:5,
  width:30,
  height:30,
  borderRadius:15,
  backgroundColor:'#d1382c',
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
  category: RecipeCard.category,
  input: RecipeCard.input,
}

);

export default styles;
