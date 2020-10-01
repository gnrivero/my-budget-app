import { Text } from 'react-native';
import React, { Component } from 'react';
import { cuentas } from '../../data/dataArrays';
import { dataPie } from './dataArray';
//lastexpenses o all?
export function getAllPieData() {
  const homeArray = [];
  dataPie.map(data => {
    homeArray.push(data);
    });
  return homeArray;
}