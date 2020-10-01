import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from 'react-native';
import styles from './styles';
import SaveCardButton from '../../components/CardButton/SaveCardButton';
import DatePicker from 'react-native-datepicker';
import BudgetService from '../../service/BudgetService';

const { width: viewportWidth } = Dimensions.get('window');

export default class PresupuestoScreen extends React.Component {

  budgetService;

  static navigationOptions = {
    title: 'Agregar Presupuesto'
  };

  constructor(props) {
    super(props);
    this.budgetService = new BudgetService();
    this.state = {
      monthlyBudget : []
    };
  }

  componentDidMount() {
     const { navigation } = this.props;
     const id = navigation.getParam('id');

     this.budgetService.existsBudget(id)
     .then((exists) => {
        if (!exists) {
          console.log("Creating new budget");
          this.budgetService.createMonthlyBudget(id)
          .then((result) => {
                 this.budgetService.getBudgetById(id)
                 .then((budget) => {
                      this.setState({
                          monthlyBudget: budget
                      });
                  });
          });
        } else {
          console.log("Reading existing budget");
          this.budgetService.getBudgetById(id)
          .then((budget) => {
                this.setState({
                    monthlyBudget: budget
                });
          });
        }
     });
  }

  buttonPressed() {
      console.log(this.state.monthlyBudget);
      this.budgetService.updateMonthlyBudget(this.state.monthlyBudget);
  }

  updateBudgetAmount(txTypeId, newAmount) {

     var budgetArray = this.state.monthlyBudget;

     for (var i = 0; i < budgetArray.length; ++i){
         if( budgetArray[i].transactionTypeId === txTypeId ){
            budgetArray[i].amount = newAmount;
            break;
         }
     }

     return budgetArray;
  }

  renderBudget = ({item}) => (
     <View style={stylePresupuesto.info}>
        <Text style={stylePresupuesto.infoRubro}>{item.name}</Text>
        <TextInput
             placeholder="Monto"
             textAlign="center"
             keyboardType="numeric"
             style={stylePresupuesto.mediumInput}
             onChangeText={(amount) => this.updateBudgetAmount(item.transactionTypeId, amount)}
             value={item.amount}
         />
         <Text style={stylePresupuesto.infoRubro}>{(item.total == null)? 0 : item.total}</Text>
      </View>
  );

  FlatListItemSeparator = () => {
      return (
        //Item Separator
        <View style={{height: 0.1, width: '100%', backgroundColor: '#C8C8C8'}}/>
      );
  };

  render() {
    return (
      <ScrollView>
        <View style={{alignItems: 'center'}}>
            <View style={stylePresupuesto.itemContainer}>
                <View style={stylePresupuesto.infoContainer}>
                    <View style={stylePresupuesto.info}>
                        <Text style={stylePresupuesto.infoRubroTitle}>Rubro</Text>
                        <Text style={stylePresupuesto.infoRubroTitle}>Monto</Text>
                        <Text style={stylePresupuesto.infoRubroTitle}>Total</Text>
                    </View>
                    <FlatList
                      data={this.state.monthlyBudget}
                      renderItem={this.renderBudget}
                      keyExtractor={item => `${item.transactionTypeId}`}
                      ItemSeparatorComponent={this.FlatListItemSeparator}
                    />
                </View>
            </View>
            <View style={stylePresupuesto.infoContainer}>
              <TouchableHighlight onPress={() => this.buttonPressed() } >
                <Text style={{fontSize: 40, color: 'white', textAlign:'center', backgroundColor:'green'}}>Guardar</Text>
              </TouchableHighlight>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const stylePresupuesto = StyleSheet.create({
    addBox: {
        marginBottom: 40,
        justifyContent:'space-around',
        flexDirection:'row',
        padding: 30,
    },
    textInput: {
        width:'25%',
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 15
    },
    botonPeriodo: {
        fontSize: 30,
        color: 'white',
        textAlign:'center',
        backgroundColor: 'green',
    },
    itemContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: 500,
      width: 360,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
      padding: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
},
info: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    padding: 5,
    marginLeft: 4
},
infoRubro: {
  fontSize: 14,
  fontWeight: 'normal',
  marginLeft: 10,
  width: 120,
},
infoRubroTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  marginLeft: 10,
  width: 110,
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
  width: 80,
  borderColor: 'gray',
  borderWidth: 1,
  marginLeft: 10,
},
largeInput: {
  height: 30,
  width: 100,
  borderColor: 'gray',
  borderWidth: 1,
  margin: 10
}
})