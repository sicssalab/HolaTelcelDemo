import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import BackArrow from '~images/BackArrow.svg';

const HeaderGroupSectionScreen = (props) => {
  const { item } = props;
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <View styles={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.goBack}>
          <BackArrow
            height={15}
            width={15}
            fill={colors.text}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            {item.name || 'Undefined'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBack: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
});
export default HeaderGroupSectionScreen;
