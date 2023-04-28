import React from 'react'
import { View , Text } from 'react-native'

const NoContent = () => {
  return (
    <View style={{ flex:1, alignContent: 'center', alignItems:'center' }}>
        <Text style={{ color: 'white', padding: 100, display: 'flex'}}>Cargando contenido, estará disponible proximamente...</Text>
    </View>
  )
}
export default NoContent
