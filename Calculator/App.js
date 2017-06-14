import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Keypad from './src/Keypad';
import getButtons from './src/getButtons';

const initialState = {
  displayText: '',
  description: '',
  lastClause: '',
  pendingBinaryOperation: null,
  accumulator: 0,
  isFloatingPoint: false,
};

const descriptionSuffix = (pendingBinaryOperation) => {
  return pendingBinaryOperation === null ? '=' : '...';
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.enterConstant = this.enterConstant.bind(this);
    this.binaryOperation = this.binaryOperation.bind(this);
    this.enterFloatingPoint = this.enterFloatingPoint.bind(this);
    this.clear = this.clear.bind(this);

    this.calculatorButtons = getButtons(this.enterConstant, this.enterFloatingPoint, this.binaryOperation, this.clear)
  }

  clear() {
    this.setState(initialState)
  }

  enterFloatingPoint() {
    if(this.state.isFloatingPoint) return;
    this.setState((prevState) => ({
      isFloatingPoint: true,
      displayText: prevState.displayText + '.',
      description: prevState.description + '.',
    }));
  }

  enterConstant(constant) {
    this.setState((prevState) => ({
      displayText: prevState.displayText + constant.toString(),
      lastClause: constant.toString(),
      // description: prevState.description + constant.toString(),
    }))
  }

  binaryOperation(operator) {
    this.setState({
      isFloatingPoint: false,
    });
    switch(operator) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState((prevState) => {
          const valueOfInput = parseFloat(prevState.displayText);
          return {
            pendingBinaryOperation: (op2) => operations[operator](valueOfInput, op2),
            accumulator: valueOfInput,
            displayText: '',
            description: prevState.lastClause + operator,
          }
        });
        break;
      case '=':
        if(!(this.state.pendingBinaryOperation)) break;
        this.setState((prevState) => {
          const newDescription = prevState.description + prevState.lastClause;
          return ({
            displayText: prevState.pendingBinaryOperation(parseFloat(prevState.displayText)),
            description: newDescription,
            lastClause: newDescription,
            pendingBinaryOperation: null,
          })
        });
        break;
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.main }>{ this.state.displayText }</Text>
        <Text style={ styles.description }>{ this.state.description + descriptionSuffix(this.state.pendingBinaryOperation) }</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 2,
    color: 'white',
    backgroundColor: 'gray',
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  description: {
    flex: 1,
    color: 'white',
    backgroundColor: 'red',
    fontSize: 40,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
  keypad: {
    flex: 4,
  }
});
