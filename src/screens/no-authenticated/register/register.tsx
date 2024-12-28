import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  BackHandler,
} from "react-native";
import { Formik } from "formik";
import { RegisterSchema } from "./utils";
import Input from "../../../components/input/input";
import IconComponent from "../../../components/icon-component/icon-component";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/button/button";
import Loader from "../../../components/loader/loader";
import type { RegisterScreenNavigationProp, ValuesType } from "./types";
import { registerRequest } from "../../../services/requests";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "../../../components/modal/modal";

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snapPoints = ["50%"];

  const handleRegister = async ({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  }: ValuesType) => {
    setIsLoading(true);
    await registerRequest({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      setIsLoading,
      setIsError,
      handlePresentModalPress,
    });
  };

  const handlePressLogin = useCallback(async () => {
    await handlePresentModalPress();
    navigation.navigate("Login");
  }, [navigation]);

  const handlePresentModalPress = useCallback(() => {
    if (bottomSheetModalRef.current) {
      if (!isOpen) {
        bottomSheetModalRef.current?.present();
        setIsOpen(true);
      } else {
        bottomSheetModalRef.current.dismiss();
        setIsOpen(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(isOpen);
    const handleBackPress = () => {
      if (isOpen) {
        return true; // Bloquea el botón de volver
      }
      return false; // Permite la acción predeterminada si el modal no está abierto
    };
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isOpen]);

  return (
    <GestureHandlerRootView>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          handleRegister(values);
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
                  <View className="w-full">
                    <IconComponent
                      icon="AntDesign"
                      name="left"
                      color="teritary"
                      onClick={() => navigation.goBack()}
                    />
                  </View>
                  <View className="w-full flex flex-col gap-3">
                    <Text className="text-5xl text-teritary font-bold">
                      Registrate
                    </Text>
                    <Text className="text-lg text-teritary font-semibold">
                      Únete a nosotros y empieza a disfrutar de todos los
                      beneficios. ¡Registrate ahora!
                    </Text>
                  </View>
                </View>
                <View className="w-full flex flex-col justify-center p-5 bg-white rounded-t-3xl overflow-hidden">
                  {isError && isError !== "." ? (
                    <Text className="text-error text-sm">{isError}</Text>
                  ) : null}
                  <Input
                    label="Nombre(s)"
                    placeholder="John"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={() => setFieldTouched("firstName")}
                    autoCapitalize="none"
                    error={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : ""
                    }
                    hideSeparator
                    icon={
                      <IconComponent
                        icon="AntDesign"
                        name="user"
                        color={
                          touched.email && errors.email ? "error" : "gray_hard"
                        }
                      />
                    }
                  />
                  <Input
                    label="Apellido(s)"
                    placeholder="John Doe"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={() => setFieldTouched("lastName")}
                    autoCapitalize="none"
                    error={
                      touched.lastName && errors.lastName ? errors.lastName : ""
                    }
                    hideSeparator
                    icon={
                      <IconComponent
                        icon="AntDesign"
                        name="user"
                        color={
                          touched.email && errors.email ? "error" : "gray_hard"
                        }
                      />
                    }
                  />
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
                    label="Teléfono"
                    placeholder="3132335689"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={() => setFieldTouched("phone")}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    error={touched.phone && errors.phone ? errors.phone : ""}
                    hideSeparator
                    icon={
                      <IconComponent
                        icon="MaterialIcons"
                        name="phone-iphone"
                        color={
                          touched.phone && errors.phone ? "error" : "gray_hard"
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
                  <Input
                    label="Confirmar contraseña"
                    placeholder="**********"
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={() => setFieldTouched("confirmPassword")}
                    autoCapitalize="none"
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                    hideSeparator
                    icon={
                      <IconComponent
                        icon="MaterialCommunityIcons"
                        name="form-textbox-password"
                        color={
                          touched.confirmPassword && errors.confirmPassword
                            ? "error"
                            : "gray_hard"
                        }
                      />
                    }
                  />
                  <View className="w-full flex justify-center items-center mt-8">
                    {isLoading ? (
                      <Loader size="large" color="secondary" />
                    ) : (
                      <Button
                        label="Registrar"
                        color="secondary"
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
                </View>
              </ScrollView>
              <Modal
                snapPoints={snapPoints}
                bottomSheetModalRef={bottomSheetModalRef}
                enablePanDownToClose={false}
                exteriorBackgorundColor="primary"
                setIsOpen={setIsOpen}
              >
                <View className="w-full flex flex-1 flex-col items-center justify-center gap-5">
                  <IconComponent
                    icon="Feather"
                    name="check-circle"
                    size={80}
                    color="secondary"
                  />
                  <Text className="text-3xl text-teritary font-bold">
                    Tu registro fue exitoso
                  </Text>
                  <Text className="text-xl text-gray_hard font-semibold">
                    ¡Inicia sesión ahora!
                  </Text>
                  <Button
                    label="Iniciar sesión"
                    color="secondary"
                    disabled={!isValid}
                    onClick={() => handlePressLogin()}
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
                </View>
              </Modal>
            </SafeAreaView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </GestureHandlerRootView>
  );
}
