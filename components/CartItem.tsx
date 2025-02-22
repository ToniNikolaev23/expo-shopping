import useCartStore from "@/store/cartStore";
import { Product } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct } = useCartStore();

  const handleQuantityChanged = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    }
    if (type === "decrement") {
      reduceProduct(item);
    }
  };
  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemContainer}>
        <Text style={styles.cartItemName}>{item.title}</Text>
        <Text>Price: ${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleQuantityChanged("decrement")}
          style={styles.quantityButton}
        >
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleQuantityChanged("increment")}
          style={styles.quantityButton}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    padding: 10,
  },
  cartItemQuantity: {
    fontWeight: "bold",
    backgroundColor: COLORS.primary,
    fontSize: 16,
    padding: 5,
    width: 30,
    color: "#fff",
    textAlign: "center",
  },
});
