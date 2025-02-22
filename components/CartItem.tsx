import useCartStore from "@/store/cartStore";
import { Product } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
interface CartItemProps {
  item: Product & { quantity: number };
}

const LeftActions = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>,
  onShouldDelete: () => void
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value - 100 }],
    };
  });
  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity style={styles.leftAction} onPress={onShouldDelete}>
        <Ionicons name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const CartItem = ({ item }: CartItemProps) => {
  const { addProduct, reduceProduct } = useCartStore();
  const reanimatedRef = useRef<SwipeableMethods>(null);

  const onShouldDelete = () => {
    reanimatedRef.current?.close();
    for (let i = 0; i < item.quantity; i++) {
      reduceProduct(item);
    }
  };

  const handleQuantityChanged = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    }
    if (type === "decrement") {
      reduceProduct(item);
    }
  };
  return (
    <ReanimatedSwipeable
      ref={reanimatedRef}
      renderLeftActions={(progress, dragX) =>
        LeftActions(progress, dragX, onShouldDelete)
      }
      leftThreshold={50}
      friction={2}
      containerStyle={styles.swipeable}
    >
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
    </ReanimatedSwipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
    height: 80,
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
  swipeable: {
    height: 80,
  },
  leftAction: {
    width: 100,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
