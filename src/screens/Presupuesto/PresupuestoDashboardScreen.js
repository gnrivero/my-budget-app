import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import AddPresupuestoButton from '../../components/PresupuestoButton/AddPresupuestoButton';
import AddCardButton from '../../components/CardButton/AddCardButton';
import BackButton from '../../components/BackButton/BackButton';
import DatePicker from 'react-native-datepicker';
import { presupuestos } from '../../data/presupuestos/presupuestosDataArray';
import styles from './styles';

const { width: viewportWidth } = Dimensions.get('window');

export default class PresupuestoDashboardScreen extends React.Component {

  budgetService;

  static navigationOptions = {
      title: 'Presupuesto'
  };

  constructor(props) {
    super(props);
    this.state = {
      date: '2020-01'
    };
  }

  render() {

    return (
      <ScrollView>
        <View style={styles.infoContainer}>
          <Image style={styles.photoCards} source={require('../../data/budget.jpg')} />
          <View style={{position: 'absolute', top: 220,  left: 45}}>
            <Text style={{fontWeight: 'bold'}}>Seleccioná un presupuesto para editarlo</Text>
          </View>
          <DatePicker
              style={{position: 'absolute', top: 260, left: 40, width: 250}}
              date={this.state.date} //initial date from state
              mode="date" //The enum of date, datetime and time
              placeholder="Fecha"
              format="YYYY-MM"
              minDate="2020-01"

              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
          />
          <View style={{position: 'absolute', top: 300,  left: 65}}>
            <AddCardButton title = {'Ver Presupuesto'}
            onPress={() => {
              let title = 'Editar Presupuesto';
              let id = this.state.date;
              this.props.navigation.navigate('PresupuestoInfo', {title: title, id: id});
            }}
            />
          </View>
        </View>
      </ScrollView>
      
    );
  }
}

const Dashboardstyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    // backgroundColor: '#2cd18a'
  },
  text: {
    fontSize: 14,
    color: '#2cd18a'
  }
});