import { Text } from 'react-native';
import React, { Component } from 'react';
import { cards } from './cardsDataArrays';

export function getAllCards() {
  const cardsArray = [];
  cards.map(data => {
      cardsArray.push(data);
    });
  return cardsArray;
}