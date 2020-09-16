import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  listRow: {
    flex: 1,
    height: 70,
    marginTop: 5,
    marginHorizontal: 5,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
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
      flex: 1
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