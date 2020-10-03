import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'

import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
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
import BudgetDetailScreen from '../screens/Presupuesto/BudgetDetailScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Categories: CategoriesScreen,
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
    CardDetail: CardDetailScreen,
    CuentaDetail: CuentaDetailScreen,
    BudgetDetail: BudgetDetailScreen,
    Dashboard: DashboardScreen,
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

 
export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;