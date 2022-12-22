import React, {useState} from 'react';

export function useForm(initialFieldValues) {
  const [values, setValues] = useState(initialFieldValues);

  const resetValues = (val) => {
    setValues({...val});
  };

  //   const handleInputChange = (e, item, inputMethod, option) => {
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    // eslint-disable-next-line no-console
    // console.log('handleInputChange name', name);
    // eslint-disable-next-line no-console
    // console.log('handleInputChange value', value);

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

export function Form(props) {
  return <form>{props.children}</form>;
}
