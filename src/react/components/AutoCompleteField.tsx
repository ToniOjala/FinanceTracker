import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
  autocompleteRoot: {
    marginTop: '16px',
    marginBottom: '8px',
    width: '350px',
    position: 'relative',
  },
  autocompleteInput: {
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
  autocompleteLabel: {
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
  list: {
    position: 'fixed',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    width: '380px',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid gray',
    zIndex: 100,
  },
  listItem: {
    padding: '10px 5px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.primary.dark,
      textDecoration: 'underline'
    }
  }
}))

interface Props {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
}

const AutoCompleteField = React.forwardRef<HTMLInputElement, Props>(({ name, label, options, defaultValue }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [value, setValue] = useState('');
  
  const classes = useStyles();

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const eventValue = event.currentTarget.value;
    prepareSuggestions(eventValue);
    setValue(eventValue);
  }

  function handleFocus (event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
    prepareSuggestions(value);
  }

  function handleBlur (event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(false);
    setSuggestions([]);
  }

  function handleKeyPress (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && suggestions.length > 0) {
      setValue(suggestions[0]);
      setSuggestions([]);
    }
  }

  function prepareSuggestions(value: string) {
    let suggestions: string[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = options.filter(opt => regex.test(opt));
    }
    setSuggestions(suggestions);
  }

  function selectSuggestion(value: string) {
    setValue(value);
  }

  function listSuggestions() {
    if (suggestions.length === 0) return null;
    return (
      <ul className={classes.list}>
        {suggestions.map(s => 
          <li 
            key={s}
            className={classes.listItem}
            onMouseDown={() => selectSuggestion(s)}
          >
            {s}
          </li>
        )}
      </ul>
    )
  }

  return (
    <div className={classes.autocompleteRoot}>
      <span className={`${classes.autocompleteLabel} ${isFocused && classes.focusedLabel} ${(value.length > 0 || defaultValue || isFocused) && classes.transformedLabel}`}>{label}</span>
      <input
        ref={ref}
        className={classes.autocompleteInput}
        name={name}
        value={value || defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
      {listSuggestions()}
    </div>
  )
})

export default AutoCompleteField
