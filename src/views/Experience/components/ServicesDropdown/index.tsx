import React, { useEffect, useState } from 'react';

import Select from '~views/Avenues/components/Select';

const AvenueDropdown = ({ stateId, onUpdate, filteredAvenues = [] }) => {
  const [selectedAvenue, setSelectedAvenue] = useState<string | null>(null);

  const onValueChange = (value) => {
    onUpdate(stateId, value);
    setSelectedAvenue(value);
  };

  const mappedAvenues = filteredAvenues.map((avenue) => ({
    code: avenue.id,
    name: avenue.name,
  }));

  return (
    <Select
      placeholder='¿Qué buscas?'
      options={mappedAvenues}
      selectedValue={selectedAvenue} //TODO marca error por que el componente no tiene el parametro
      onValueChange={onValueChange} 
    />
  );
};

export default AvenueDropdown;
