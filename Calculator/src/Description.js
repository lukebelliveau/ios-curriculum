import React from 'react';
import { Text } from 'react-native';

const descriptionSuffix = (isOperationPending) => {
  return isOperationPending ? '...' : '=';
};

export default ({ description, isOperationPending }) => (
  <Text style={ styles }>{ description + descriptionSuffix(isOperationPending) }</Text>
)

const styles = {
  flex: 1,
    color: 'white',
    backgroundColor: 'red',
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
};