import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Product Details - {id}</Text>
    </View>
  );
};

export default Page;
