import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/tab-home/home/home";
import LocationList from "../screens/tab-profile/location-list/location-list";
import OrderDetails from "../screens/tab-profile/order-details";
import OrderList from "../screens/tab-profile/order-list";
import ProfileHome from "../screens/tab-profile/profile-home/profile-home";
import CartShop from "../screens/tab-cartshop/cart-shop";
import StoreDetails from "../screens/tab-home/store-details/store-details";
import ProductDetails from "../screens/tab-home/product-details/product-details";
import Search from "../screens/tab-home/search/search";
import LocationDetails from "../screens/tab-profile/location-details/location-details";
import OnBoarding from "../screens/no-authenticated/on-boarding/on-boarding";
import Login from "../screens/no-authenticated/login/login";
import Register from "../screens/no-authenticated/register/register";
import { AuthProvider } from "../context/auth-context";
import AppNav from "./app-nav";
import IconComponent from "../components/icon-component/icon-component";
import type { IconNames } from "../components/icon-component/types";
import type { RootStackParamList } from "./types";
import { useColorScheme } from "nativewind";
import CustomDrawer from "../components/custom-drawer/custom-drawer";
import SearchText from "../screens/tab-home/search-text/search-text";

// Creación de los navegadores
const Drawer = createDrawerNavigator();
const StackNoAuth = createNativeStackNavigator<RootStackParamList>();
const StackHome = createNativeStackNavigator<RootStackParamList>();
const StackProfile = createNativeStackNavigator<RootStackParamList>();
const StackCartShop = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Funciones de navegación
export function DrawerGroup() {
  const { colorScheme } = useColorScheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: "70%",
        },
      }}
    >
      <Drawer.Screen
        name="StackGroup"
        component={StackGroup}
        options={{
          drawerLabel: "Principal",
          headerShown: false,
          drawerActiveBackgroundColor:
            colorScheme === "dark" ? "#2A2C41" : "#FF724C",
          drawerActiveTintColor: "#FFFFFF",
          drawerInactiveTintColor: "#A9A9A9",
          drawerItemStyle: {
            marginHorizontal: 16,
            marginTop: 5,
            borderRadius: 16,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          drawerIcon: ({ focused, size }) => {
            return (
              <IconComponent
                icon="AntDesign"
                name={focused ? "tags" : "tagso"}
                color={focused ? "white" : "gray_hard"}
                size={size}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen name="Settings" component={Settings}/> */}
    </Drawer.Navigator>
  );
}

export function StackNoAuthGroup() {
  return (
    <StackNoAuth.Navigator>
      <StackNoAuth.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <StackNoAuth.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <StackNoAuth.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </StackNoAuth.Navigator>
  );
}

function StackHomeGroup() {
  return (
    <StackHome.Navigator>
      <StackHome.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="SearchText"
        component={SearchText}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="StoreDetails"
        component={StoreDetails}
        options={{ headerShown: false }}
      />
    </StackHome.Navigator>
  );
}

function StackProfileGroup() {
  return (
    <StackProfile.Navigator>
      <StackProfile.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      />
      <StackProfile.Screen
        name="LocationDetails"
        component={LocationDetails}
        options={{ headerShown: false }}
      />
      <StackProfile.Screen
        name="LocationList"
        component={LocationList}
        options={{ headerShown: false }}
      />
      <StackProfile.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ headerShown: false }}
      />
      <StackProfile.Screen
        name="OrderList"
        component={OrderList}
        options={{ headerShown: false }}
      />
    </StackProfile.Navigator>
  );
}

function StackCartShopGroup() {
  return (
    <StackCartShop.Navigator>
      <StackCartShop.Screen
        name="CartShop"
        component={CartShop}
        options={{ headerShown: false }}
      />
    </StackCartShop.Navigator>
  );
}

function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabGroup"
        component={TabGroup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabGroup() {
  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#2A2C41" : "#FF724C",
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName: string;
          if (route.name === "StackHomeGroup") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "StackProfileGroup") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "StackCartShopGroup") {
            iconName = focused ? "cart" : "cart-outline";
          } else {
            iconName = "default-icon";
          }
          return (
            <IconComponent
              icon="Ionicons"
              name={iconName as IconNames["Ionicons"]}
              color={focused ? "white" : "gray_hard"}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="StackHomeGroup"
        component={StackHomeGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="StackProfileGroup"
        component={StackProfileGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="StackCartShopGroup"
        component={StackCartShopGroup}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
