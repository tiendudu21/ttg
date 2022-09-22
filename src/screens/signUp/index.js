import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import MainButton from "../../components/MainButton";
import MainInput from "../../components/MainInput";
export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onGoBack = () => {
    navigation.goBack();
  };
  const onSignUp = () => {
    if (name.trim() == "" || !name) {
      alert("Không được để trống họ và tên !");
    } else if (email.trim() == "" || !email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else {
      createAccount();
    }
  };
  const createAccount = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) => value.email.toLocaleLowerCase() == email.toLocaleLowerCase()
      );
      if (arr.length > 0) {
        alert("Email already registered!");
        return;
      } else {
        userData.push({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        });
      }
    } else {
      userData = [];
      userData.push({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
    }
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    alert("Đăng ký thành công!");
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#365899", paddingHorizontal: 100 }}>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <TouchableOpacity
          onPress={onGoBack}
          style={{
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: "contain" }}
            source={require("../../../assets/icon_back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            paddingLeft: 20,
            fontWeight: "bold",
            letterSpacing: 5,
          }}
        >
          Đăng Ký
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            alignSelf: "center",
            height: 100,
            resizeMode: "contain",
            width: 100,
          }}
          source={require("../../../assets/face.png")}
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            fontSize: 25,
            marginBottom: 50,
          }}
        >
          FACEBOOK
        </Text>
        <MainInput
          title={"Họ và tên"}
          placeholder={"Họ và tên"}
          value={name}
          onChangeText={setName}
        />
        <MainInput
          title={"Email"}
          placeholder={"Nhập email"}
          value={email}
          onChangeText={setemail}
        />
        <MainInput
          placeholder={"Nhập mật khẩu"}
          title={"Mật khẩu"}
          secureTextEntry={true}
          value={password}
          onChangeText={setpassword}
        />
        <MainButton
          onPress={onSignUp}
          style={{ marginTop: 12, textAlign: "center" }}
          title={"Đăng Ký"}
        />
      </View>
    </View>
  );
}
