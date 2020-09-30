import { Text } from 'react-native';
import React, { Component } from 'react';
import { presupuestos } from './presupuestosDataArray';
<<<<<<< Updated upstream
import { budgetDetailsMocks } from './presupuestosDataArray';
=======
import { movimientos } from './presupuestosDataArray';
>>>>>>> Stashed changes

export function getAllbudgets() {
  const presupuestosArray = [];
  presupuestos.map(data => {
      presupuestosArray.push(data);
    });
  return presupuestosArray;
}

export function getAllbudgetsDetails() {
  const presupuestosArray = [];
<<<<<<< Updated upstream
  budgetDetailsMocks.map(data => {
=======
  movimientos.map(data => {
>>>>>>> Stashed changes
      presupuestosArray.push(data);
    });
  return presupuestosArray;
}