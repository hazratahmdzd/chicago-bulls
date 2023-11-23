import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])([A-Za-z\d@$!%*?&.]{8,})$/;


export const validationSchema = object().shape({
  username: string()
    .min(3, "validations.tooShort")
    .max(30, "validations.tooLong")
    .required("validations.usernameRequired"),
  email: string()
    .min(5, "validations.tooShort")
    .max(50, "validations.tooLong")
    .matches(emailRegex, "validations.emailRegex")
    .required("validations.emailRequired"),
  password: string()
    .min(8, "validations.passwordMin")
    .matches(
      passwordRegex, "validations.passwordRegex"
    )
    .required("validations.passwordRequired"),
});

export const resolver = yupResolver(validationSchema)

export type UserSchema = InferType<typeof validationSchema>