import { Text } from 'react-native';
import React, { Component } from 'react';
import { cuentas } from '../../data/dataArrays';
import { expenses, typeExpenses, paymentMethods } from './dataArray';
//lastexpenses o all?
export function getAllExpenses() {
  const expensesArray = [];
  expenses.map(data => {
    expensesArray.push(data);
    });
  return expensesArray;
}
export function getTypeExpenses() {
  const typeExpensesArray = [];
  typeExpenses.map(data => {
    typeExpensesArray.push({value:data.id, label:data.name});
    });
  return typeExpensesArray;
}

export function getPaymentMethods() {
  const paymentMethodsArray = [];
  paymentMethods.map(data => {
    paymentMethodsArray.push(data);
    });
  return paymentMethodsArray;
}

export function getAccounts() {
  const accountArray = [];
  cuentas.map(data => {
    accountArray.push({value:data.id, label:data.nombreCuenta});
    });
  return accountArray;
}