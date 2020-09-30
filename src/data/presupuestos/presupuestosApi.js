import { Text } from 'react-native';
import React, { Component } from 'react';
import { presupuestos } from './presupuestosDataArray';
import { budgetDetailMock } from './presupuestosDataArray';

export function getAllbudgets() {
  const presupuestosArray = [];
  presupuestos.map(data => {
      presupuestosArray.push(data);
    });
  return presupuestosArray;
}

export function getAllbudgetsDetail() {
  const presupuestosArray = [];
  budgetDetailMock.map(data => {
      presupuestosArray.push(data);
    });
  return presupuestosArray;
}