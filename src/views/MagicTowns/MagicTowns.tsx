import React, {  useEffect, useState } from 'react';
import {
  SectionList,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeComponent } from '~components';
import Divider from '~components/Divider';
import { SceneName } from '~src/@types/SceneName';
import { mockRequest } from './__mocks__';
import { Header } from './components/Header';
import GlobalPost from '~views/Avenues/components/GlobalPost/GlobalPost';
import { Input } from '~views/Avenues/components/Input';
//import StateDropdown from '~views/Avenues/components/StateDropdown';
//import ServicesDropdown from "./components/ServicesDropdown";
import data from '~views/Avenues/data.json'; //TODO data son los estados nada mas
import { Container, OptionsContainer } from '~views/Avenues/styles';
import { mockPueblosMagicos } from '~src/mocks/mockPueblosMagicos';

function Component() {
  const navigation = useNavigation();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [filteredAvenues, setFilteredAvenues] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {
    setFilteredPosts(mockPueblosMagicos.data.content)
  }, []);


  const states = data.states.map((state) => ({
    code: state.id,
    name: state.name,
  }));

  const updateFilteredAvenuesAndPosts = (stateId: number, avenueId: number) => {
    setFilteredPosts([]);
    setSelectedStateId(stateId);

    //TODO busca el estado seleccionado
    const selectedState = data.states.find((state) => state.id === stateId);

    //TODO selecciona la lista de servicios por el estado
    const filteredAvenues = selectedState ? selectedState.services : [];

    setFilteredAvenues(filteredAvenues);

    //TODO Muesta la lista de servicios por la avenida seleccionada
    if (avenueId) {
      //TODO seleccionar todos los servicios de X estado
      const services = [];// mockServiciosExperiencia.data.filter((servicio) => servicio.state_id === stateId && servicio.service_id === avenueId)
      setFilteredPosts(services);
    } else {
      setFilteredPosts([]);
    }
  };
  const onNavigateClick = (item) => {
    const profilePage = {
      id: item.id,
      type: "MAGIC_TOWNS_PROFILE"
    }
    navigation.navigate(SceneName.ProfileScreen, { profilePage });
  };
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
  const onChangeInput = (e) => {
    //TODO de la busqueda filtrar los que son con el nombre
    setValueSearch(e);
    if(e == "") setFilteredPosts(mockPueblosMagicos.data.content)
    else
      setFilteredPosts(
        mockPueblosMagicos.data.content.filter((servicio) => 
        //removeAccents(servicio.name.toUpperCase()) >= removeAccents(e.toUpperCase())
        removeAccents(servicio.name.toLowerCase()).indexOf(removeAccents(e.toLowerCase())) >= 0
        )
      )
  }

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
          <Input
            placeholder='Buscar'
            value={valueSearch}
            onChangeText={onChangeInput}
            maxLength={500}
          />
        </OptionsContainer>
      ),
    },
    {
      title: 'Posts',
      data: filteredPosts,
      key: 'posts',
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
