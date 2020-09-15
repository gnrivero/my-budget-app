import { Text } from 'react-native';
import React, { Component } from 'react';
import { income } from './incomeDataArrays';
//lastincome o all?
export function getAllIncome() {
  const incomeArray = [];
  income.map(data => {
    incomeArray.push(data);
    });
  return incomeArray;
}