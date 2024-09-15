import { z } from "zod";

export const UsernameContraint = z
  .string("Lütfen kullanıcı adını belirleyiniz")
  .min(3, "Kullanıcı adı en az 3 karakterden oluşmalıdır")
  .max(20, "Kullanıcı adı en fazla 20 karakterden oluşabilir")
  .trim()
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Kullanıcı adı sadece alfanümerik karakterlerden oluşabilir",
  });

export const PasswordContraint = z
  .string()
  .min(6, "Şifreniz en az 6 karakterden oluşmalıdır");
