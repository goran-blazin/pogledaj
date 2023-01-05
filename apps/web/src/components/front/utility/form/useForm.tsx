import React, {useState} from 'react';
import {SupportEmail} from '../../../../types/EmailTypes';

type ChildrenProps = {
  children?: React.ReactNode;
};

export function useForm(initialFieldValues: SupportEmail) {
  const [values, setValues] = useState(initialFieldValues);

  const resetValues = (val: SupportEmail) => {
    setValues({...val});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetValues,
  };
}

export function Form({children}: ChildrenProps) {
  return <form>{children}</form>;
}
