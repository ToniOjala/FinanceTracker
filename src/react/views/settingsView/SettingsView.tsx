import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setDateSelectionStatus } from '../../slices/dateSelection';
import CategorySettingsContainer from './categorySettingsContainer/CategorySettingsContainer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 0,
  },
});

const SettingsView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDateSelectionStatus('hidden'));
  }, []);

  return (
    <Grid
      className={classes.root}
      container
      spacing={6}
      direction="row"
      justify="center"
    >
      <Grid item xs={12} md={8} lg={7} xl={6}>
        <CategorySettingsContainer />
      </Grid>
    </Grid>
  )
}

export default SettingsView
