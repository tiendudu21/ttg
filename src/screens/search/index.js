import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import DrinkItemHorizontal from "../../components/DrinkItemHorizontal";
import MainInput from "../../components/MainInput";
import drinkData from "../../data/drinks.json";
export default function SearchScreen({ navigation }) {
  const [textSearch, settextSearch] = useState("");
  const categories = [
    "Trà Sữa",
    "Cà Phê",
    "Trà",
    "Nước Giải Khát",
    "Nước Khoáng",
    "Nước Chanh",
  ];
  const renderResult = () => {
    const data = drinkData.filter((value) =>
      value.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
    );
    const renderItem = ({ item, index }) => (
      <DrinkItemHorizontal item={item} navigation={navigation} />
    );
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>
          KẾT QUẢ
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        paddingHorizontal: 12,
      }}
    >
      <MainInput
        value={textSearch}
        onChangeText={settextSearch}
        placeholder={"Nhập để tìm kiếm..."}
        title={"TÌM KIẾM"}
        style={{}}
      />
      {textSearch.trim().length > 0 ? (
        renderResult()
      ) : (
        <>
          <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>
            GỢI Ý CHO BẠN
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {categories.map((value, item) => (
              <TouchableOpacity
                onPress={() => {
                  settextSearch(value);
                }}
                style={{
                  backgroundColor: "#f4f4f4",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 12,
                  marginBottom: 12,
                  borderRadius: 100,
                }}
                key={item}
              >
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
