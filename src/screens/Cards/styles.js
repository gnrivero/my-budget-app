import { StyleSheet, Dimensions } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
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

  CardsItemIcon: {
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
  cardName: {
      flex: .2,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 8
  },
  cardInfo: {
      marginTop: 3,
      marginBottom: 5
  },
  
  photoCards: {
    width: '100%',
    height: 200,
    alignSelf: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoCard: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  largeInput: {
    height: 30,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
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
  smallInput: RecipeCard.smallInput,
  mediumInput: RecipeCard.mediumInput,
});

export default styles;