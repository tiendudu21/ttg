import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MainButton from '../../components/MainButton';
import MainInput from '../../components/MainInput';
export default function LoginScreen({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const goToHome = () => {
    if (email.trim() == '' || !email) {
      alert('Không được để trống email !');
    } else if (password.trim() == '' || !password) {
      alert('Không được để trống mật khẩu !');
    } else {
      login();
    }
  };
  const login = async () => {
    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) =>
          value.email.toLocaleLowerCase() == email.toLocaleLowerCase() &&
          value.password == password
      );
      if (arr.length > 0) {
        let curUser = arr[0];
        AsyncStorage.setItem('curUser', JSON.stringify(curUser));
        navigation.replace('HomeTab');
      } else alert('Email hoặc mật khẩu không chính xác!');
    } else {
      alert('Email hoặc mật khẩu không chính xác!');
    }
  };
  const goToSignUp = async () => {
    navigation.navigate('SignUpScreen');
  };
  const checkLogin = async () => {
    let userData = await AsyncStorage.getItem('curUser');
    if (userData) navigation.replace('HomeTab');
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 100,
            backgroundColor: '#365899',
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              height: 100,
              resizeMode: 'contain',
              width: 100,
            }}
            source={require('../../../assets/face.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 25,
              marginTop: 20,
              marginBottom: 30,
            }}
          >
            FACEBOOK
          </Text>
         

          <MainInput
            title={'Email'}
            placeholder={'Nhập email'}
            value={email}
            onChangeText={setemail}
          />
          <MainInput
            placeholder={'Nhập mật khẩu'}
            title={'Mật khẩu'}
            value={password}
            secureTextEntry={true}
            onChangeText={setpassword}
          />
          <MainButton
            style={{ marginTop: 20, marginLeft: 90 }}
            
            title={'Đăng Nhập'}
            onPress={goToHome}
          />
          <MainButton
            style={{ marginBottom: 22, marginLeft: 90, marginTop: 12 }}
           
            title={'Đăng Ký'}
            isSubButton={true}
            onPress={goToSignUp}
          />
        </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
