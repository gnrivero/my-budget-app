import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  infoContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      margin: 15
  },
  info: {
      flex: 1,
      flexDirection: 'row',
      height: 30
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
  smallInput: {
    height: 25,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10
  },
  mediumInput: {
    height: 25,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10
  },
  largeInput: {
    height: 30,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  }
});

export default styles;