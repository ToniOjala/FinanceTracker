import { SvgIcon } from '@material-ui/core'
import React from 'react'

interface Props {
  color?: 'inherit' | 'disabled' | 'action' | 'primary' | 'secondary' | 'error';
}

const PlusIcon = ({ color }: Props) => (
  <SvgIcon color={color} fontSize="small">
    <path d="M 12 2 C 11.446 2 11 2.446 11 3 L 11 11 L 3 11 C 2.446 11 2 11.446 2 12 C 2 12.554 2.446 13 3 13 L 11 13 L 11 21 C 11 21.554 11.446 22 12 22 C 12.554 22 13 21.554 13 21 L 13 13 L 21 13 C 21.554 13 22 12.554 22 12 C 22 11.446 21.554 11 21 11 L 13 11 L 13 3 C 13 2.446 12.554 2 12 2 z " />
  </SvgIcon>
)

export default PlusIcon
