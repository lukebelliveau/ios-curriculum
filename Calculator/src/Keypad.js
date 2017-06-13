import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const Keypad = ({ buttonGrid, style }) => (
  <View style={ [styles.container, style] }>
    {
      buttonGrid.map((row, i) => <KeypadRow key={ i } buttonRow={ row } />)
    }
  </View>
);

const KeypadRow = ({ buttonRow }) => (
  <View style={ styles.keyRow }>
    {
      buttonRow.map(key => <CalculatorButton key={ key.value } buttonData={ key } />)
    }
  </View>
);

const CalculatorButton = ({ buttonData }) => (
  <View style={ styles.keySpace }>
    <TouchableHighlight style={{ height: '90%', width: '90%'}} onPress={ () => buttonData.action(buttonData.value) }>
      <Text style={ styles.keyContent }>{ buttonData.value }</Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  container: {
  },
  keyRow: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
  },
  keySpace: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContent: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    backgroundColor: 'white',
  }
});

export default Keypad;