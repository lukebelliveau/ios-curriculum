const getButtons =  (enterConstant, enterFloatingPoint, unaryOp, binaryOp, clear) => [
  [
    { value: 'sin', action: unaryOp },
    { value: '/', action: binaryOp },
    { value: '^', action: binaryOp },
    { value: '√', action: unaryOp },
    { value: 'C', action: clear },
  ],
  [
    { value: 'cos', action: unaryOp },
    { value: '+', action: binaryOp },
    { value: 7, action: enterConstant },
    { value: 8, action: enterConstant },
    { value: 9, action: enterConstant },
  ],
  [
    { value: 'tan', action: unaryOp },
    { value: '-', action: binaryOp },
    { value: 4, action: enterConstant },
    { value: 5, action: enterConstant },
    { value: 6, action: enterConstant },
  ],
  [
    { value: 'ln', action: unaryOp },
    { value: '*', action: binaryOp },
    { value: 1, action: enterConstant },
    { value: 2, action: enterConstant },
    { value: 3, action: enterConstant },
  ],
  [
    { value: 'log10', action: unaryOp },
    { value: 'π', action: () => enterConstant(Math.PI) },
    { value: '.', action: enterFloatingPoint },
    { value: '0', action: enterConstant },
    { value: '=', action: binaryOp },
  ],
];

export default getButtons;
