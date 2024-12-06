import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../../../context/auth-context";
import { LoginSchema } from "./utils";
import Input from "../../../components/input/input";
import IconComponent from "../../../components/icon-component/icon-component";
import ButtonSection from "../../../components/button-section/button-section";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/button/button";
import Separator from "../../../components/separator/separator";
import Loader from "../../../components/loader/loader";
import type { LoginScreenNavigationProp, ValuesType } from "./types";

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { height } = useWindowDimensions();
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const handleLogin = ({ email, password }: ValuesType) => {
    setIsLoading(true);
    setIsError("");
    login({ email, password, setIsLoading, setIsError });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        handleSubmit,
        handleChange,
        setFieldTouched,
      }) => (
        <KeyboardAvoidingView
          className="flex-1 h-full"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView className="flex flex-1 w-full items-center bg-primary">
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              style={{ width: "100%" }}
            >
              <View
                style={{ height: height * 0.3 }}
                className="w-full flex flex-col justify-between p-5 pt-14 pr-10"
              >
                <View className="w-full flex flex-row items-center justify-between">
                  <IconComponent
                    icon="AntDesign"
                    name="left"
                    color="teritary"
                    onClick={() => navigation.goBack()}
                  />
                  <ButtonSection
                    label="Registrar"
                    className="w-1/2"
                    onClick={() => {
                      navigation.navigate("Register");
                    }}
                  />
                </View>
                <View className="w-full flex flex-col gap-3">
                  <Text className="text-5xl text-teritary font-bold">
                    Login
                  </Text>
                  <Text className="text-lg text-teritary font-semibold">
                    Accede fácilmente a tu cuenta y disfruta de todas nuestras
                    ventajas. ¡Inicia sesión ahora!
                  </Text>
                </View>
              </View>
              <View
                style={{ height: height * 0.75 }}
                className="w-full flex flex-col justify-center p-5 bg-white rounded-t-3xl overflow-hidden"
              >
                {isError ? (
                  <Text className="text-error text-sm">{isError}</Text>
                ) : null}
                <Input
                  label="Correo electrónico"
                  placeholder="user@email.com"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  error={touched.email && errors.email ? errors.email : ""}
                  hideSeparator
                  icon={
                    <IconComponent
                      icon="MaterialIcons"
                      name="email"
                      color={
                        touched.email && errors.email ? "error" : "gray_hard"
                      }
                    />
                  }
                />
                <Input
                  label="Contraseña"
                  placeholder="**********"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  autoCapitalize="none"
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  hideSeparator
                  icon={
                    <IconComponent
                      icon="MaterialCommunityIcons"
                      name="form-textbox-password"
                      color={
                        touched.password && errors.password
                          ? "error"
                          : "gray_hard"
                      }
                    />
                  }
                />
                <ButtonSection
                  label="Recuperar contraseña"
                  className="mb-10"
                  onClick={() => {
                    navigation.navigate("Register");
                  }}
                />
                <View className="w-full flex justify-center items-center">
                  {isLoading ? (
                    <Loader size="large" color="secondary" />
                  ) : (
                    <Button
                      label="Ingresar"
                      disabled={!isValid}
                      onClick={() => handleSubmit()}
                      className={`w-1/2 ${!isValid && "opacity-50"}`}
                      iconLeft={
                        <IconComponent
                          icon="AntDesign"
                          name="login"
                          color="white"
                          size={20}
                        />
                      }
                    />
                  )}
                </View>
                <Separator className="mt-10 mb-10" />
                <View className="w-full flex flex-row justify-center items-center gap-5">
                  <Button
                    onClick={() => console.log("Google")}
                    iconLeft={
                      <IconComponent
                        icon="AntDesign"
                        name="google"
                        color="white"
                      />
                    }
                    className="p-6 !w-20 bg-secondary"
                  />
                  <Button
                    onClick={() => console.log("facebook")}
                    iconLeft={
                      <IconComponent
                        icon="AntDesign"
                        name="facebook-square"
                        color="white"
                      />
                    }
                    className="p-6 !w-20"
                  />
                  <Button
                    onClick={() => console.log("apple")}
                    iconLeft={
                      <IconComponent
                        icon="AntDesign"
                        name="apple1"
                        color="white"
                      />
                    }
                    className="p-6 !w-20 bg-teritary"
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
