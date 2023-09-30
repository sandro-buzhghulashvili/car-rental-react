import React, { useReducer } from 'react';

const valueReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  } else if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  } else if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
    };
  }
  return {
    value: '',
    isTouched: false,
  };
};

const useInput = (validatorFunc) => {
  const [enteredValue, dispatchEnteredValue] = useReducer(valueReducer, {
    value: '',
    isTouched: false,
  });

  const isValid = validatorFunc(enteredValue.value);
  const hasError = !isValid && enteredValue.isTouched;

  const valueChangeHandler = (event) => {
    dispatchEnteredValue({ type: 'INPUT', value: event.target.value });
  };

  const blurHandler = () => {
    dispatchEnteredValue({ type: 'BLUR' });
  };

  const restartHandler = () => {
    dispatchEnteredValue({ type: 'RESET' });
  };

  return {
    enteredValue: enteredValue.value,
    isValid,
    hasError,
    valueChangeHandler,
    blurHandler,
    restartHandler,
  };
};

export default useInput;
