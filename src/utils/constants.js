import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Минимальная длина - 2 символа')
    .max(30, 'Максимальная длина - 30 символов')
    .required('Поле обязательно должно быть заполнено')
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9_-]+$/,
      'Допустимые символы: буквы, цифры, дефис, нижнее подчёркивание'),
  email: Yup.string()
    .email('Невалидный email')
    .min(6, 'Минимальная длина - 6 символов')
    .max(40, 'Максимальная длина - 40 символов')
    .required('Поле обязательно должно быть заполнено'),
  password: Yup.string()
    .min(6, 'Минимальная длина - 6 символов')
    .max(15, 'Максимальная длина - 15 символов')
    .required('Поле обязательно должно быть заполнено'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невалидный email')
    .min(6, 'Минимальная длина - 6 символов')
    .max(40, 'Максимальная длина - 40 символов')
    .required('Поле обязательно должно быть заполнено'),
  password: Yup.string()
    .min(6, 'Минимальная длина - 6 символов')
    .max(15, 'Максимальная длина - 15 символов')
    .required('Поле обязательно должно быть заполнено'),
});
