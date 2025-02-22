import CartItem from "@/components/CartItem";
import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";
const Page = () => {
  const { products, total, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert(
        "Cart is empty",
        "Please add some products to cart before checkout"
      );
      return;
    }
    clearCart();
    Alert.alert("Success", "Thank you for your purchase");
    router.dismiss();
  };
  return (
    <View style={styles.container}>
      {products.length === 0 && (
        <Text style={styles.emptyText}>No products in the cart</Text>
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => (
          <>
            {products.length ? (
              <Text style={styles.totalText}>Total: ${total}</Text>
            ) : null}
          </>
        )}
        ListFooterComponent={
          <Button
            title="Test ERROR"
            onPress={() => {
              Sentry.captureException(new Error("Test Error"));
            }}
          />
        }
      />

      <TouchableOpacity
        style={[
          styles.addToCartButton,
          {
            paddingBottom: Platform.select({ ios: bottom, android: 16 }),
          },
        ]}
        onPress={handleCheckout}
      >
        <Ionicons name="checkmark" size={20} color="white" />
        <Text style={styles.addToCartText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  addToCartText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
