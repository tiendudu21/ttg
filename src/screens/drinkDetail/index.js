import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import MainButton from "../../components/MainButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DrinkDetailScreen({ navigation, route }) {
  const params = route.params;
  const { item } = params;
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(item.size[0]);
  const [ice, setIce] = useState(item.ice[0]);
  const onGoBack = () => {
    navigation.goBack();
  };
  const addToCart = async () => {
    let cartData = await AsyncStorage.getItem("cartData");
    if (cartData) {
      cartData = JSON.parse(cartData);
      cartData.push({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: amount,
        size: size,
        ice: ice,
        owner: item.owner,
      });
    } else {
      cartData = [];
      cartData.push({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: amount,
        size: size,
        ice: ice,
        owner: item.owner,
      });
    }
    AsyncStorage.setItem("cartData", JSON.stringify(cartData));
    navigation.navigate("CartScreen");
  };
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{ uri: item.image }}
        />
        <TouchableOpacity
          onPress={onGoBack}
          style={{
            backgroundColor: "#ffffff60",
            position: "absolute",
            top: 30,
            left: 12,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ color: "#F99928", fontSize: 16 }}>{item.owner}</Text>
        <Text
          style={{
            color: "#000",
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          MÔ TẢ
        </Text>
        <Text
          style={{
            color: "gray",
          }}
        >
          {item.description}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <Text
              style={{
                color: "#2FDBBC",
                fontSize: 10,
                fontWeight: "bold",
                marginLeft: 12,
              }}
            >
              SIZE
            </Text>
            <View
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: 100,
                paddingHorizontal: 8,
              }}
            >
              <Picker
                style={{ width: 140, height: 40 }}
                selectedValue={size}
                onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
              >
                {item.size.map((value, index) => (
                  <Picker.Item key={index} label={value} value={value} />
                ))}
              </Picker>
            </View>
            {/* <View
              style={{
                backgroundColor: "#F4F4F4",
                paddingHorizontal: 16,
                borderRadius: 100,
                marginTop: 4,
                width: 150,
                paddingVertical: 8,
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "#000", flex: 1 }}>{number}</Text>
            </View> */}
          </View>
          <View style={{ flex: 1 }} />
          <View>
            <Text
              style={{
                color: "#2FDBBC",
                fontSize: 10,
                fontWeight: "bold",
                marginLeft: 12,
              }}
            >
              LƯỢNG ĐÁ
            </Text>
            <View
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: 100,
                paddingHorizontal: 8,
              }}
            >
              <Picker
                style={{ width: 140, height: 40 }}
                selectedValue={ice}
                onValueChange={(itemValue, itemIndex) => setIce(itemValue)}
              >
                {item.ice.map((value, index) => (
                  <Picker.Item key={index} label={value} value={value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <Text
              style={{
                color: "#2FDBBC",
                fontSize: 10,
                fontWeight: "bold",
                marginLeft: 12,
              }}
            >
              SỐ LƯỢNG
            </Text>
            <View
              style={{
                backgroundColor: "#F4F4F4",
                paddingHorizontal: 16,
                borderRadius: 100,
                marginTop: 4,
                width: 150,
                paddingVertical: 8,
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "#000", flex: 1 }}>{amount}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (amount > 1) setAmount((val) => val - 1);
                }}
              >
                <Ionicons name="remove" size={24} color="#2FDBBC" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAmount((val) => val + 1);
                }}
              >
                <Ionicons name="add" size={24} color="#2FDBBC" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#000",
                fontSize: 10,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              TỔNG
            </Text>
            <Text
              style={{
                color: "#2FDBBC",
                fontSize: 30,
                textAlign: "right",
                fontWeight: "bold",
              }}
            >
              {item.price * amount} VND
            </Text>
          </View>
        </View>
        <MainButton
          onPress={addToCart}
          style={{ marginTop: 30 }}
          title={"THÊM VÀO GIỎ"}
        />
      </View>
    </ScrollView>
  );
}
