import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo no valido")
    .required("El correo electrónico es obligatorio."),
  password: Yup.string()
    .min(8, "La contraseña debe tener minimo 8 caracteres.")
    .max(50, "La contraseña debe tener máximo 50 caracteres.")
    .required("La contraseña es obligatoria.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Debe contener un mínimo de 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
    ),
});
