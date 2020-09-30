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
import AddInvestmentScreen from '../screens/Investments/AddInvestmentScreen';
import InvestmentDetailScreen from '../screens/Investments/InvestmentDetailScreen';
import PresupuestoDashboardScreen from '../screens/Presupuesto/PresupuestoDashboardScreen';
import IncomeScreen from '../screens/Income/IncomeScreen';
import AddIncomeScreen from '../screens/Income/AddIncomeScreen';
import ExpensesScreen  from '../screens/Expenses/ExpensesScreen';
import AddExpensesScreen from '../screens/Expenses/AddExpensesScreen';
import LoansScreen  from '../screens/Loans/LoansScreen';
import AddLoanScreen  from '../screens/Loans/AddLoanScreen';
import LoanDetailScreen from '../screens/Loans/LoanDetailScreen';
import CardDetailScreen from '../screens/Cards/CardDetail';
import CuentaDetailScreen from '../screens/Cuenta/CuentaDetailScreen';
<<<<<<< Updated upstream
import BudgetDetailScreen from '../screens/Presupuesto/BudgetDetailScreen';
=======
import { BudgetDetailScreen } from '../screens/Presupuesto/BudgetDetailScreen';
>>>>>>> Stashed changes

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
    Presupuesto: PresupuestoDashboardScreen,
    PresupuestoInfo: PresupuestoScreen,
    Investments: InvestmentScreen,
    AddInvestment: AddInvestmentScreen,
    InvestmentDetail: InvestmentDetailScreen,
    Income: IncomeScreen,
    AddIncome: AddIncomeScreen,
    Expenses: ExpensesScreen,
    AddExpenses: AddExpensesScreen,
    Loans: LoansScreen,
    LoanDetail: LoanDetailScreen,
    AddLoan: AddLoanScreen,
    BudgetDetail: BudgetDetailScreen,
    CardDetail: CardDetailScreen,
    CuentaDetail: CuentaDetailScreen,
    BudgetDetail: BudgetDetailScreen,
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