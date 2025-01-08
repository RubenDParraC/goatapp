import {
  type RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import type {
  LocationDetailsScreenNavigationProp,
  ValuesLocationSubmitType,
} from "./types";
import { useColorScheme } from "nativewind";
import { Formik } from "formik";
import { LocationSchema } from "./utils";
import Input from "../../../components/input/input";
import IconComponent from "../../../components/icon-component/icon-component";
import Loader from "../../../components/loader/loader";
import Button from "../../../components/button/button";
import {
  locationCreateRequest,
  locationUpdateRequest,
} from "../../../services/requests";
import type { RootStackParamList } from "../../../navigation/types";

export default function LocationDetails() {
  const navigation = useNavigation<LocationDetailsScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "LocationDetails">>();
  const { location } = route.params;
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const handleLocation = ({
    name,
    address,
    description,
  }: ValuesLocationSubmitType) => {
    setIsLoading(true);
    setIsError("");
    if (location) {
      locationUpdateRequest({
        id: location.id.toString(),
        name,
        address,
        description,
        setIsLoading,
        setIsError,
        onNavigation: () => navigation.goBack(),
      });
    } else {
      locationCreateRequest({
        name,
        address,
        description,
        setIsLoading,
        setIsError,
        onNavigation: () => navigation.goBack(),
      });
    }
  };

  return (
    <Formik
      initialValues={{
        name: location ? location.name : "",
        address: location ? location.address : "",
        description: location ? location.description : "",
      }}
      validationSchema={LocationSchema}
      onSubmit={(values) => {
        handleLocation(values);
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
          <SafeAreaView className="flex-1 bg-white">
            <View
              className={`w-full p-5 pt-16 rounded-b-3xl mb-5 ${
                colorScheme === "dark" ? "bg-teritary" : "bg-primary"
              }`}
            >
              <Text className="text-2xl text-center text-white font-bold">
                {`${location ? "Actualizar" : "Crear"} Ubicación`}
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
              style={{ width: "100%" }}
            >
              <View className="w-full flex flex-col justify-center p-5">
                {isError ? (
                  <Text className="text-error text-sm">{isError}</Text>
                ) : null}
                <Input
                  label="Nombre"
                  placeholder="Ej: Casa, Apartamento"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  autoCapitalize="sentences"
                  error={touched.name && errors.name ? errors.name : ""}
                  hideSeparator
                  icon={
                    <IconComponent
                      icon="MaterialIcons"
                      name="maps-home-work"
                      color={
                        touched.name && errors.name ? "error" : "gray_hard"
                      }
                    />
                  }
                />
                <Input
                  label="Dirección"
                  placeholder="Ej: KR 12 # 12-45"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={() => setFieldTouched("name")}
                  autoCapitalize="sentences"
                  error={
                    touched.address && errors.address ? errors.address : ""
                  }
                  hideSeparator
                  icon={
                    <IconComponent
                      icon="MaterialIcons"
                      name="my-location"
                      color={
                        touched.address && errors.address
                          ? "error"
                          : "gray_hard"
                      }
                    />
                  }
                />
                <Input
                  label="Complemento"
                  placeholder="Ej: In 1, Apartamento 401"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={() => setFieldTouched("description")}
                  autoCapitalize="sentences"
                  error={
                    touched.description && errors.description
                      ? errors.description
                      : ""
                  }
                  hideSeparator
                  icon={
                    <IconComponent
                      icon="MaterialCommunityIcons"
                      name="home-group"
                      color={
                        touched.description && errors.description
                          ? "error"
                          : "gray_hard"
                      }
                    />
                  }
                />
                <View className="w-full flex justify-center items-center self-center">
                  {isLoading ? (
                    <Loader size="large" color="secondary" />
                  ) : (
                    <Button
                      label={`${location ? "Actualizar" : "Crear"} Ubicación`}
                      disabled={!isValid}
                      color={colorScheme === "dark" ? "teritary" : "secondary"}
                      onClick={() => handleSubmit()}
                      className={`w-1/2 ${!isValid && "opacity-50"}`}
                      classNameLabel="text-xl"
                      iconLeft={
                        <IconComponent
                          icon="MaterialIcons"
                          name="add-location-alt"
                          color="white"
                          size={20}
                        />
                      }
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
