import React from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { Control, Controller } from 'react-hook-form'

interface Props {
  name: string;
  label: string;
  control: Control<Record<string, any>>;
  defaultValue: unknown;
  children: JSX.Element[];
}

const CustomSelect = (props: Props, ...rest: any[]) => {
  const labelId = `${props.name}-label`;
  return (
    <FormControl {...rest}>
      <InputLabel id={labelId}>{props.label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={props.label}>
            {props.children}
          </Select>
        }
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
      />
    </FormControl>
  )
}

export default CustomSelect