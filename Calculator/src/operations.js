export const unaryOperations = {
  '√': op => Math.sqrt(op),
  'sin': op => Math.sin(op),
  'cos': op => Math.cos(op),
  'tan': op => Math.tan(op),
  'ln': op => Math.log(op),
  'log10': op => Math.log10(op),
};

export const binaryOperations = {
  '+': (op1, op2) => op1 + op2,
  '-': (op1, op2) => op1 - op2,
  '*': (op1, op2) => op1 * op2,
  '/': (op1, op2) => op1 / op2
};