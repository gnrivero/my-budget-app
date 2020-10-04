import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="RESUMEN"
            source={require('../../../assets/icons/dashboard.png')}
            onPress={() => {
              navigation.navigate('Dashboard');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="CUENTAS"
            source={require('../../../assets/icons/account.png')}
            onPress={() => {
             navigation.navigate('Cuentas',{name: 'Cuentas'});
             navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="INGRESOS"
            source={require('../../../assets/icons/ingresos.png')}
            onPress={() => {
             navigation.navigate('Income',{name: 'Ingresos'});
             navigation.closeDrawer();
            }}
          />
                      <MenuButton
            title="EGRESOS"
            source={require('../../../assets/icons/expenses.png')}
            onPress={() => {
             navigation.navigate('Expenses',{name: 'Egresos'});
             navigation.closeDrawer();
            }}
          />
          <MenuButton
              title="TARJETAS"
              source={require('../../../assets/icons/tarjetas.png')}
              onPress={() => {
                navigation.navigate('Cards',{name: 'Tarjetas'});
                navigation.closeDrawer();
              }}
            />
            <MenuButton
            title="PRESTAMOS"
            source={require('../../../assets/icons/loan.jpg')}
            onPress={() => {
             navigation.navigate('Loans',{name: 'Prestamos'});
             navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="INVERSIONES"
            source={require('../../../assets/icons/inversiones.png')}
            onPress={() => {
             navigation.navigate('Investments',{name: 'Inversiones'});
             navigation.closeDrawer();
            }}
          />

            <MenuButton
            title="PRESUPUESTOS"
            source={require('../../../assets/icons/presupuesto.png')}
            onPress={() => {
                navigation.navigate('Presupuesto');
                navigation.closeDrawer();
            }}
          />

        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
