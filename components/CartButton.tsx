import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();
  return (
    <TouchableOpacity>
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
      <Ionicons name="cart" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    right: -10,
    bottom: -5,
    width: 20,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
