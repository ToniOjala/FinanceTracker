import { makeStyles } from '@material-ui/core'
import React from 'react'
import { roundToDecimals } from '../../../utils/round';

const useStyles = makeStyles({
  root: {
    textAlign: 'center'
  },
})

interface Props {
  ratio: number;
}

const RatioBar = ({ ratio }: Props) => {
  const classes = useStyles();

  if (!isFinite(ratio)) return (
    <div className={classes.root} style={{ backgroundColor: '#eeeeee33' }}>
      0%
    </div>
  )

  if (ratio > 100) return (
    <div className={classes.root} style={{ background: `linear-gradient(to right, #FF5D7399 ${ratio-100}%, #eeeeee33 ${ratio-100}%)`}}>
      {roundToDecimals(ratio, 0)}%
    </div>
  )

  return (
    <div className={classes.root} style={{ background: `linear-gradient(to right, #66B088bb ${ratio}%, #eeeeee33 ${ratio}%)`}}>
      {roundToDecimals(ratio, 0)}%
    </div>
  )
}

export default RatioBar
