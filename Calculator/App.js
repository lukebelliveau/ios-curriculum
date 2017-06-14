import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Keypad from './src/Keypad';

const initialState = {
  displayText: '',
  pendingBinaryOperation: null,
  accumulator: 0,
  isFloatingPoint: false,
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.enterConstant = this.enterConstant.bind(this);
    this.binaryOperation = this.binaryOperation.bind(this);
    this.enterFloatingPoint = this.enterFloatingPoint.bind(this);
    this.clear = this.clear.bind(this);

    this.calculatorButtons = getButtons(this.enterConstant, this.enterFloatingPoint, this.binaryOperation)
  }

  clear() {
    this.setState(initialState)
  }

  enterFloatingPoint() {
    console.log(this.state);
    if(this.state.isFloatingPoint) return;
    this.setState((prevState) => ({
      isFloatingPoint: true,
      displayText: prevState.displayText + '.',
    }));
  }

  enterConstant(constant) {
    this.setState((prevState) => ({
      displayText: prevState.displayText + constant.toString()
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
          }
        });
        break;
      case '=':
        if(!(this.state.pendingBinaryOperation)) break;
        this.setState((prevState) => ({
          displayText: prevState.pendingBinaryOperation(parseFloat(prevState.displayText)),
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

const getButtons = (enterConstant, enterFloatingPoint, binaryOp, clear) => [
  [
    { value: '--', action: () => {} },
    { value: '---', action: () => {} },
    { value: '----', action: () => {} },
    { value: '.', action: enterFloatingPoint },
  ],
  [
    { value: '+', action: binaryOp },
    { value: 7, action: enterConstant },
    { value: 8, action: enterConstant },
    { value: 9, action: enterConstant },
  ],
  [
    { value: '-', action: binaryOp },
    { value: 4, action: enterConstant },
    { value: 5, action: enterConstant },
    { value: 6, action: enterConstant },
  ],
  [
    { value: '*', action: binaryOp },
    { value: 1, action: enterConstant },
    { value: 2, action: enterConstant },
    { value: 3, action: enterConstant },
  ],
  [
    { value: '/', action: binaryOp },
    { value: 'C', action: clear },
    { value: '0', action: enterConstant },
    { value: '=', action: binaryOp },
  ],
];