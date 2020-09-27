import { Text } from 'react-native';
import React, { Component } from 'react';
import { cuentas } from '../../data/dataArrays';
import { investments, investmentTypes } from './dataArrays';

export function getAllInvestments() {
  const investmentsArray = [];
  investments.map(data => {
      investmentsArray.push(data);
    });
  return investmentsArray;
}

export function getInvestmentTypes() {
  const investmentTypesArray = [];
  investmentTypes.map(data => {
    investmentTypesArray.push({value:data.id, label:data.name});
    });
  return investmentTypesArray;
}
export function getAccounts() {
  const accountArray = [];
  cuentas.map(data => {
    accountArray.push({value:data.id, label:data.nombreCuenta});
    });
  return accountArray;
}