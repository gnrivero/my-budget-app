import { StyleSheet, Dimensions } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({

  photoInvestment: {
    width: '100%',
    height: 200,
    alignSelf: 'center'
  },

  itemContainer: {
    flex: 1,
    margin: 5,
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

investmentItemIcon: {
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
  itemName: {
      flex: .4,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footer: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2cd18a'
  },
  
  input: RecipeCard.input,
});

export default styles;