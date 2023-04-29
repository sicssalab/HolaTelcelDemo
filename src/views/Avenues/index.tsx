import React, { useContext, useState, useEffect } from 'react';
import {
  SectionList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { SafeComponent } from '~components';
import Divider from '~components/Divider';
import { SceneName } from '~src/@types/SceneName';
import { mockRequest } from './__mocks__';
import AvenueDropdown from './components/AvenueDropdown';
import { Header } from './components/Header';
import { Input } from './components/Input';
import GlobalPost from './components/GlobalPost';
import StateDropdown from './components/StateDropdown';
import data from './data.json';
import { Container, OptionsContainer } from './styles';
import typeMockConstants from '~src/constants/typeMockConstants';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const states = data.states.map((state) => ({
    code: state.id,
    name: state.name,
  }));

  const updateFilteredAvenuesAndPosts = (stateId: string, avenueId: string) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    const selectedState = data.states.find((state) => state.id === stateId);
    const filteredAvenues = selectedState ? selectedState.avenues : [];

    setFilteredAvenues(filteredAvenues);

    if (avenueId) {
      const selectedAvenue = filteredAvenues.find(
        (avenue) => avenue.id === avenueId,
      );
      const filteredPosts = selectedAvenue ? selectedAvenue.content : [];
      setFilteredPosts(filteredPosts);
    } else {
      setFilteredPosts([]);
    }
  };
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "AVENUES_PROFILE"
      //type: "typeMockConstants.AVENUES_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, { profilePage });
  };
  const sections = [
    {
      title: 'Header',
      data: ['header'],
      key: 'header',
      renderItem: () => <Header />,
    },
    {
      title: 'Divider',
      data: ['divider'],
      key: 'divider',
      renderItem: () => <Divider />,
    },
    {
      title: 'OptionsContainer',
      data: ['optionsContainer'],
      key: 'optionsContainer',
      renderItem: () => (
        <OptionsContainer>
          <StateDropdown
            states={states}
            onUpdate={updateFilteredAvenuesAndPosts}
          />
          {selectedStateId && (
            <AvenueDropdown
              stateId={selectedStateId}
              onUpdate={updateFilteredAvenuesAndPosts}
              filteredAvenues={filteredAvenues}
            />
          )}
          <Input
            placeholder='¿Qué estás buscando?'
            value={keyword}
            onChangeText={setKeyword}
            maxLength={500}
          />
        </OptionsContainer>
      ),
    },
    {
      title: 'Posts',
      data: filteredPosts,
      key: 'posts',
      //renderItem: ({ item }) => <Posts item={item} />,
      renderItem: ({ item }) => <GlobalPost item={item} onNavigateClick={() => onNavigateClick(item)} />,
    },
  ];

  return (
    <SafeComponent request={mockRequest}>
      <Container>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <View>{item}</View>}
          renderSectionHeader={({ section: { title } }) => <View />}
        />
      </Container>
    </SafeComponent>
  );
}

export default Component;
