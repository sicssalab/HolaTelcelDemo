import React, { useContext, useState } from 'react';

import Select from '../Select';

const StateDropdown = ({ states, onUpdate }) => {
  const [selectedState, setSelectedState] = useState(null);

  const onValueChange = (value) => {
    onUpdate(value, null);
  };

  return (
    <Select
      placeholder='Selecciona un estado...'
      options={states}
      selectedValue={selectedState}
      onValueChange={onValueChange}
    />
  );
}
export default StateDropdown;
