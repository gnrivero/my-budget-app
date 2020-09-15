import { Text } from 'react-native';
import React, { Component } from 'react';
import { investments } from './dataArrays';

export function getStocks() {
  const investmentsArray = [];
  cards.map(data => {
      investmentsArray.push(data);
    });
  return investmentsArray;
}