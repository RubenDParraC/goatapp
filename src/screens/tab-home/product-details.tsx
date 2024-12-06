import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

export default function ProductDetails() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-green-200">
      <Text className="text-red-500 text-lg">Product Details</Text>
      <TouchableOpacity onPress={() => navigate("StackCartShopGroup", { screen: "CartShop" })}>
        <Text className="text-red-500 text-lg">Ir a cart shop</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
