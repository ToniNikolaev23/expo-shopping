import { getCategories, getProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function Index() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  console.log(products);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["All", ...categories];

  console.log(categories);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    ></View>
  );
}
