//import { Text } from 'react-native';
//import React, { Component } from 'react';
//import { cuentas } from '../../data/dataArrays';
import { paymentMethods } from './dataArray';

export function getPaymentMethods() {
  const paymentMethodsArray = [];
  paymentMethods.map(data => {
    paymentMethodsArray.push(data);
    });
  return paymentMethodsArray;
}
