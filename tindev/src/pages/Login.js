import React, {useState, useEffect} from 'react'
import {KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity,Platform} from 'react-native'

import logo from '../assets/logo.png'

import Api from '../services/Api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login({navigation}) {

    const [user, setUser] = useState('')

    //Disparar quando o componente inica ou há alguma mudança
    useEffect(() => {
      AsyncStorage.getItem('user').then(user =>{
        if(user){
          navigation.navigate('Main', {user})
        }
      })
    }, []);
    
    async function handleLogin() {
        // console.log(user)
        const response = await Api.post('/devs', { username: user })
        console.log(response.data)
        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)
        
        navigation.navigate('Main', {user: _id})
    }

    return (
        <KeyboardAvoidingView 
            behavior='padding'
            enabled={Platform.OS === 'ios'}
            style={styles.container}>
            <Image source={logo}/>
            <TextInput 
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Type your Github username'
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: 'center',
    padding: 30
  },

  input: {
    height: 46, 
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent:'center',
    alignItems: 'center'
  },

  buttonText:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16
  }
})