import { ChangeEvent, useState } from "react";

interface Values { [key: string]: string }
interface Errors { [key: string]: string }

export function useForm (defaultValues?: Values) {
  const [values, setValues] = useState<Values>(defaultValues || {});

  function setValue(name: string, value: string) {
    setValues({ ...values, [name]: value });
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value });
  }

  return { values, setValue, handleChange,  };
}