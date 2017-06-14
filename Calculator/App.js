import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Keypad from './src/Keypad';
import Description from './src/Description';
import getButtons from './src/getButtons';

const initialState = {
  displayText: '',
  description: '',
  lastClause: '',
  userIsTyping: false,
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
    this.unaryOperation = this.unaryOperation.bind(this);
    this.enterFloatingPoint = this.enterFloatingPoint.bind(this);
    this.clear = this.clear.bind(this);

    this.calculatorButtons = getButtons(this.enterConstant, this.enterFloatingPoint, this.unaryOperation, this.binaryOperation, this.clear)
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
      displayText: prevState.userIsTyping ? prevState.displayText + constant.toString() : constant.toString(),
      description: prevState.userIsTyping ? prevState.description : '',
      lastClause: constant.toString(),
      userIsTyping: true,
    }))
  }

  unaryOperation(operator) {
    this.setState((prevState) => {
      const newDescription = `${operator}(${prevState.lastClause})`;
      return ({
        displayText: unaryOperations[operator](parseFloat(prevState.displayText)),
        description: newDescription,
        lastClause: newDescription,
        userIsTyping: false,
      })
    })
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
            pendingBinaryOperation: (op2) => binaryOperations[operator](valueOfInput, op2),
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
            userIsTyping: false,
          })
        });
        break;
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.main }>{ this.state.displayText }</Text>
        <Description description={ this.state.description } isOperationPending={ this.state.pendingBinaryOperation !== null }/>
        <Keypad buttonGrid={ this.calculatorButtons } style={ styles.keypad } />
      </View>
    );
  }
};

const unaryOperations = {
  '√': (op) => Math.sqrt(op),
};

const binaryOperations = {
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
  keypad: {
    flex: 4,
  }
});
