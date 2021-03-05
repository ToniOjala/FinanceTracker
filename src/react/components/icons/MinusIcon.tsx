import { SvgIcon } from '@material-ui/core'
import React from 'react'

interface Props {
  color?: 'inherit' | 'disabled' | 'action' | 'primary' | 'secondary' | 'error';
}

const MinusIcon = ({ color }: Props) => (
  <SvgIcon color={color} fontSize="small">
    <path d="m 3,11 h 18 c 0.554,0 1,0.446 1,1 0,0.554 -0.446,1 -1,1 H 3 C 2.446,13 2,12.554 2,12 2,11.446 2.446,11 3,11 Z" />
  </SvgIcon>
)

export default MinusIcon
