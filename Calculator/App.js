import React from 'react';
import { Alert, StyleSheet, Text, Button, TouchableHighlight, View } from 'react-native';

import Keypad from './src/Keypad';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayText: '',
      pendingBinaryOperation: null,
      accumulator: 0,
    };

    this.enterConstant = this.enterConstant.bind(this);
    this.binaryOperation = this.binaryOperation.bind(this);
    this.clear = this.clear.bind(this);

    this.calculatorButtons = [
      [
        { value: '+', action: this.clear },
        { value: 7, action: this.enterConstant },
        { value: 8, action: this.enterConstant },
        { value: 9, action: this.enterConstant },
      ],
      [
        { value: '-', action: this.binaryOperation },
        { value: 4, action: this.enterConstant },
        { value: 5, action: this.enterConstant },
        { value: 6, action: this.enterConstant },
      ],
      [
        { value: '*', action: this.binaryOperation },
        { value: 1, action: this.enterConstant },
        { value: 2, action: this.enterConstant },
        { value: 3, action: this.enterConstant },
      ],
      [
        { value: '/', action: this.binaryOperation },
        { value: 'C', action: this.clear },
        { value: '0', action: this.enterConstant },
        { value: '=', action: this.binaryOperation },
      ],
    ];
  }

  clear() {
    this.setState({
      displayText: '',
      pendingBinaryOperation: null,
      accumulator: 0,
    })
  }

  enterConstant(constant) {
    this.setState((prevState) => ({
      displayText: prevState.pendingBinaryOperation ? constant : prevState.displayText + constant.toString()
    }))
  }

  binaryOperation(operator) {
    switch(operator) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState((prevState) => {
          const valueOfInput = parseInt(prevState.displayText);
          return {
            pendingBinaryOperation: (op2) => operations[operator](valueOfInput, op2),
            accumulator: valueOfInput,
          }
        });
        break;
      case '=':
        this.setState((prevState) => ({
          displayText: prevState.pendingBinaryOperation(parseInt(prevState.displayText)),
          pendingBinaryOperation: null,
        }));
        break;
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Display text={ this.state.displayText } />
        <Keypad buttonGrid={ this.calculatorButtons } style={ styles.keypad } />
      </View>
    );
  }
};

const operations = {
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2,
  '*': (op1, op2) => op1 * op2,
  '/': (op1, op2) => op1 / op2
};

const Display = ({ text }) => (
  <Text style={ styles.display }>{ text }</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    color: 'white',
    backgroundColor: 'gray',
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  keypad: {
    flex: 3,
  }
});
