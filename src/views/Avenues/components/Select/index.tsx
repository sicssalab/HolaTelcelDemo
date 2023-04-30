import React, { useContext, useState } from 'react';
import DropdownSelect from 'react-native-input-select';

import { ThemeContext } from 'styled-components/native';
import Divider from '~components/Divider';

interface SelectProps {
  placeholder: string;
  options: any[];
  onValueChange: (option: string) => void;
}

const Select: React.FC<SelectProps> = ({ placeholder, options, onValueChange }) => {
  const themeContext = useContext(ThemeContext);
  //const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handlePressOption = (value: string) => {
    setSelectedOption(value);
    //setShowOptions(true);
    onValueChange(value);
  };

  return (
    <DropdownSelect
      placeholder={placeholder}
      options={options}
      optionLabel={'name'}
      optionValue={'code'}
      selectedValue={selectedOption}
      onValueChange={(itemValue) => handlePressOption(itemValue)}
      primaryColor={themeContext.colors.primary}
      dropdownStyle={{
        backgroundColor: themeContext.colors.text,
        //borderColor: themeContext.colors.black,
        borderWidth: 1,
      }}
      dropdownContainerStyle={{
        backgroundColor: themeContext.colors.background,
        width: '100%',
        marginBottom: 5,
      }}
      placeholderStyle={{
        //color: themeContext.colors.black,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '400',
      }}
      selectedItemStyle={{ fontSize: 16, fontWeight: '400' }}
      modalOptionsContainer={{
        padding: 10,
      }}
      modalBackgroundStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      checkboxSize={8}
      checkboxStyle={{
        backgroundColor: themeContext.colors.primary,
        borderRadius: 10,
        padding: 10,
      }}
      checkboxLabelStyle={{
        //color: themeContext.colors.black,
        fontSize: 18,
      }}
      listFooterComponent={
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      }
    />
  );
};

export default Select;
