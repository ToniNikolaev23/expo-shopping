import CartButton from "@/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useNavigationContainerRef, useRouter } from "expo-router";
import { storage } from "@/store/mmkv";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { useEffect } from "react";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: "https://171f263ac13f6c38a68ed35ca7f6de5b@o4503919751659520.ingest.us.sentry.io/4508865007386624",
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1,
  },
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: true,
      maskAllVectors: false,
    }),
    Sentry.spotlightIntegration(),
    navigationIntegration,
  ],
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

const RootLayout = () => {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });
  const router = useRouter();
  const ref = useNavigationContainerRef();

  useEffect(() => {
    navigationIntegration.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Galactic Products",
              headerShadowVisible: false,
              headerSearchBarOptions: {
                placeholder: "Search products..",
                hideWhenScrolling: false,
                hideNavigationBar: false,
              },
              headerRight: () => <CartButton />,
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{
              title: "",
              headerBackTitle: "Products",
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.dismiss()}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(RootLayout);
