import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { roundToDecimals } from '../utils/round';

const useStyles = makeStyles(theme => ({
  amountRoot: {
    marginTop: '16px',
    marginBottom: '8px',
    width: '350px',
    position: 'relative',
  },
  amountInput: {
    padding: '6px 0 7px',
    color: 'white',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid #bbbbbbbb',
    width: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    position: 'relative',
    '&:hover': {
      borderBottom: '2px solid white',
    },
    '&:focus': {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
  },
  errorText: {
    color: 'red',
  },
  error: {
    color: 'red',
    borderBottom: '2px solid red',
  },
  amountLabel: {
    fontSize: '1rem',
    position: 'absolute',
    bottom: 5,
    color: theme.palette.text.secondary,
    transition: '200ms',
    transformOrigin: 'top left',
  },
  transformedLabel: {
    transform: 'translate(0, -24px) scale(0.75)',
  },
  focusedLabel: {
    color: theme.palette.primary.main
  },
}))

interface Props {
  name: string;
  label: string;
  defaultValue?: number | string;
  error?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
}

const AmountField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  
  const classes = useStyles();

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  function handleFocus (event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
  }

  function handleBlur (event: React.FocusEvent<HTMLInputElement>) {
    if (value.startsWith('=')) calculateMath(value.substr(1));
    setIsFocused(false);
  }

  function handleKeyPress (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && value.startsWith('=')) {
      calculateMath(value.substr(1));
    }
  }

  function calculateMath(math: string) {
    const result = roundToDecimals(eval(math), 2);
    setValue(result);
  }

  return (
    <div className={classes.amountRoot}>
      <span
        className={`
          ${classes.amountLabel}
          ${isFocused && classes.focusedLabel} 
          ${(value.length > 0 || props.defaultValue || isFocused && !props.error) && classes.transformedLabel}
          ${props.error && classes.errorText}
        `}
      >
        {props.label}{props.required && ' *'}
      </span>
      <input
        ref={ref}
        className={`${classes.amountInput} ${props.error && classes.error}`}
        name={props.name}
        value={value || props.defaultValue || ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
      <span className={classes.errorText}>{props.helperText}</span>
    </div>
  )
})

export default AmountField
