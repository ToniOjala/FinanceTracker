import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setDateSelectionStatus } from '../../slices/dateSelection';
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDateSelectionStatus('hidden'));
  }, []);

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
