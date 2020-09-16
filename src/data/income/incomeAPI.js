import { Text } from 'react-native';
import React, { Component } from 'react';
import { cuentas } from '../../data/dataArrays';
import { income, typeIncome } from './incomeDataArray';
//lastincome o all?
export function getAllIncome() {
  const incomeArray = [];
  income.map(data => {
    incomeArray.push(data);
    });
  return incomeArray;
}
export function getTypeIncome() {
  const typeIncomeArray = [];
  typeIncome.map(data => {
    typeIncomeArray.push({value:data.id, label:data.name});
    });
  return typeIncomeArray;
}

export function getAccounts() {
  const accountArray = [];
  cuentas.map(data => {
    accountArray.push({value:data.id, label:data.nombreCuenta});
    });
  return accountArray;
}