import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import MainButton from "../../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "../../components/CartItem";

export default function CartScreen() {
  const isFocused = useIsFocused();
  const [cartList, setcartList] = useState([]);
  const onFinish = async () => {
    if (cartList.length > 0) {
      alert("Thanh Toán Thành Công!");
      let cartData = [];
      await AsyncStorage.setItem("cartData", JSON.stringify(cartData));
      setcartList([]);
    }
  };
  const getCartData = async () => {
    let cartData = await AsyncStorage.getItem("cartData");
    if (cartData) {
      cartData = JSON.parse(cartData);
    } else {
      cartData = [];
    }
    setcartList(cartData);
  };
  useEffect(() => {
    getCartData();
  }, [isFocused]);
  const renderItem = ({ item, index }) => {
    return <CartItem item={item} index={index} onChange={setcartList} />;
  };
  const getTotal = () => {
    let total = 0;
    cartList.map((value) => (total += value.price * value.amount));
    return total;
  };
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#2FDBBC",
            flex: 1,
          }}
        >
          GIỎ HÀNG
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {"TỔNG: "}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: "#2FDBBC",
          }}
        >
           {getTotal()} VND
        </Text>
      </View>
      {cartList.length > 0 ? (
        <FlatList
          style={{ marginTop: 12 }}
          data={cartList}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="cart-outline" size={130} color="gray" />
          <Text style={{ color: "gray", fontSize: 20 }}>Giỏ hàng đang trống</Text>
        </View>
      )}

      <MainButton
        onPress={onFinish}
        style={{ marginVertical: 12 }}
        title={"Thanh Toán"}
      />
    </View>
  );
}
