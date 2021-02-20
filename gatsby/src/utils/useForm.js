import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if its a number anv convert
    let { value, name } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value, 10);
    }
    setValues({
      // Copu the existing values into it
    ...values,
    // Update the new value that changed
    [name]: value
    })
  }

  return { values, updateValue };
}