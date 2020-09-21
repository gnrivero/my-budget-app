import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import CardScreen from '../screens/Cards/CardScreen';
import ModifyCardScreen from '../screens/Cards/ModifyCardScreen';
import CuentasScreen from '../screens/Cuentas/CuentasScreen';
import CuentaScreen from '../screens/Cuenta/CuentaScreen';
import PresupuestoScreen from '../screens/Presupuesto/PresupuestoScreen';
import InvestmentScreen from '../screens/Investments/InvestmentScreen';
import PresupuestoDashboardScreen from '../screens/Presupuesto/PresupuestoDashboardScreen';
import IncomeScreen from '../screens/Income/IncomeScreen';
import AddIncomeScreen from '../screens/Income/AddIncomeScreen';
import ExpensesScreen  from '../screens/Expenses/ExpensesScreen';
import AddExpensesScreen from '../screens/Expenses/AddExpensesScreen';
import LoansScreen  from '../screens/Loans/LoansScreen';
import AddLoanScreen  from '../screens/Loans/AddLoanScreen';
import CardDetailScreen from '../screens/Cards/CardDetail';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Recipe: RecipeScreen,
    RecipesList: RecipesListScreen,
    Ingredient: IngredientScreen,
    Search: SearchScreen,
    IngredientsDetails: IngredientsDetailsScreen,
    Cuentas: CuentasScreen,
    Cuenta: CuentaScreen,
    Cards: CardScreen,
    ModifyCard: ModifyCardScreen,
    Presupuesto: PresupuestoScreen,
    Investments: InvestmentScreen,
    Presupuesto: PresupuestoDashboardScreen,
    PresupuestoInfo: PresupuestoScreen,
    Income: IncomeScreen,
    AddIncome: AddIncomeScreen,
    Expenses: ExpensesScreen,
    AddExpenses: AddExpensesScreen,
    Loans: LoansScreen,
    AddLoan: AddLoanScreen,
    CardDetail: CardDetailScreen,
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

/* export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} */
 
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;