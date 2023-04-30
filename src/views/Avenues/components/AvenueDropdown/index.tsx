import React, { useEffect, useState } from 'react';

import Select from '../Select';

const AvenueDropdown = ({ stateId, onUpdate, filteredAvenues = [] }) => {
  const [selectedAvenue, setSelectedAvenue] = useState<string | null>(null);

  const onValueChange = (value) => {
    onUpdate(stateId, value);
    setSelectedAvenue(value);
  };

  // useEffect(() => {
  //   setSelectedAvenue(null)
  //   onValueChange(null);
  //   console.log("que no entra?")
  // },[stateId]);

  const mappedAvenues = filteredAvenues.map((avenue) => ({
    code: avenue.id,
    name: avenue.name,
  }));

  return (
    <Select
      placeholder='Selecciona una avenida...'
      options={mappedAvenues}
      selectedValue={selectedAvenue}
      onValueChange={onValueChange}
    />
  );
};

export default AvenueDropdown;
