import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ProfileFront = ({navigation}) => {
  return (
    <View>
      <Text>ProfileFront</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Profilex')}>
        <Text>Klik Untuk Detail Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileFront

const styles = StyleSheet.create({})