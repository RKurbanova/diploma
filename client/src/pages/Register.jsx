import { PropsWithChildren, useCallback, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  useIonRouter,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonNavLink
} from '@ionic/react';
import * as Yup from 'yup';
import { Button, Input, Form, Space } from "antd";
import { usePostRegisterMutation } from '../queries/user';
import FieldFormikContext from '../components/FieldFormWithContext'
import { Formik } from 'formik'
 
import './register.css'
import { Link } from 'react-router-dom';

const allowedBirthDate = new Date()
allowedBirthDate.setFullYear(allowedBirthDate.getFullYear() - 18)
const birthDateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

const SignupSchema = Yup.object().shape({
    Login: Yup.string()
        .min(2, 'Логин очень короткий')
        .max(50, 'Логин очень длинный')
        .required('Логин обязателен'),
    Password: Yup.string()
        .min(2, 'Пароль очень короткий')
        .max(50, 'Пароль очень длинный')
        .matches(/[a-zA-Z0-1]/, 'Пароль может содержать только латинские буквы и цифры')
        .required('Пароль обязателен'),
    FirstName: Yup.string()
        .min(2, 'Имя очень короткое')
        .max(50, 'Имя очень длинное')
        .required('Имя обязательно'),
    LastName: Yup.string()
        .min(2, 'Фамилия очень короткая')
        .max(50, 'Фамилия очень длинная')
        .required('Фамилия обязательна'),
    Patronymic: Yup.string()
        .min(2, 'Отчество очень короткое')
        .max(50, 'Отчество очень длинное')
        .required('Отчество обязательно'),
    Email: Yup.string()
        .email('Некорректная почта')
        .required('Почта обязательна'),
    Birthday: Yup.string()
        .matches(birthDateRegExp, 'Не корректная дата - формат YYYY-MM-DD')
        .test('minAge', 
            'Минимальный допустимый возраст - 18 лет', 
            function(date) { 
                return new Date(date) < allowedBirthDate; 
            }
         )
        .required('Дата обязательна')
});

const Register = () => {
  const router = useIonRouter()
  const [register] = usePostRegisterMutation()
  const handleRegister = useCallback(async (data, { setFieldError }) => {
    const result = await register(data)

    if (result.error) {
        setFieldError('general', 'Пользователь с такими данными уже существует')
        return
    }

    router.push('/catalog')
  }, [register, router])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Регистрация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Formik
              validateOnBlur
              initialValues={SignupSchema.cast()}
              validationSchema={SignupSchema}
              onSubmit={handleRegister}
          >
              {({ handleSubmit, isSubmitting, isValid, dirty, errors, values }) => (
                <Space style={{padding: '20px', width: '100vw'}}>
                  <Form
                    className="register-form"
                    onFinish={handleSubmit}
                    layout='vertical'
                >
                    <FieldFormikContext
                        id="Login"
                        name="Login"
                        label='Логин'
                        placeholder='Введите логин'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="Password"
                        name="Password"
                        label='Пароль'
                        placeholder='Введите пароль'
                        renderComponent={Input.Password}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="FirstName"
                        name="FirstName"
                        label='Имя'
                        placeholder='Введите имя'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="LastName"
                        name="LastName"
                        label='Фамилия'
                        placeholder='Введите фамилию'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="Patronymic"
                        name="Patronymic"
                        label='Отчество'
                        placeholder='Введите отчество'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="Email"
                        name="Email"
                        label='Почта'
                        placeholder='Введите почту'
                        renderComponent={Input}
                    />
                    <FieldFormikContext
                        id="Birthday"
                        name="Birthday"
                        label='Дата рождения'
                        placeholder='2000-12-14'
                        renderComponent={Input}
                    />

                    {errors.general ? <p style={{ color: 'red' }}>{errors.general}</p> : null}
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isSubmitting}
                        disabled={!(dirty && isValid)}
                    >
                        Зарегистрировать
                    </Button>
                    <Link to="/login">Уже есть аккаунт?</Link>
                </Form>
                </Space>
              )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default Register;
