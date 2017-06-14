const getButtons =  (enterConstant, enterFloatingPoint, binaryOp, clear) => [
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

export default getButtons;