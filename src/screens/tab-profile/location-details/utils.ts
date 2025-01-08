import * as Yup from "yup";

export const LocationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "El nombre de la ubicación debe tener minimo 5 caracteres.")
    .required("El nombre es obligatorio."),
  address: Yup.string()
    .min(5, "La dirección de la ubicación debe tener minimo 5 caracteres.")
    .required("La dirección es obligatorio."),
  description: Yup.string()
    .min(5, "El complemento de la ubicación debe tener minimo 1 caracter.")
    .required("El complemento es obligatorio."),
});
