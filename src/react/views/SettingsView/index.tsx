import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import CategorySettingsContainer from './CategorySettingsContainer';

const useStyles = makeStyles({
  root: {
    margin: '20px'
  },
  table: {
    padding: '10px',
    margin: '20px 0 20px 0',
  }
});

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Box 
      className={classes.root}
      display="flex"
      flexDirection="column"
    >
      <CategorySettingsContainer />
    </Box>
  )
}

export default SettingsView
