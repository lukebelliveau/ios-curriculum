import React from 'react';
import { Text } from 'react-native';

export default ({ description, isOperationPending }) =>
  <Text style={ styles }>{ formatDescription(description, isOperationPending) }</Text>

const formatDescription = (description, isOperationPending) =>
  description === ''
    ? null
    : description + (isOperationPending ? '...' : '=');

const styles = {
  flex: 1,
    color: 'white',
    backgroundColor: 'lightgray',
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
};
