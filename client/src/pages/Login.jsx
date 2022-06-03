import { useCallback } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  useIonRouter
} from '@ionic/react';
import * as Yup from 'yup';
import { Button, Input, Form, Space } from "antd";
import FieldFormikContext from '../components/FieldFormWithContext'
import { Link } from 'react-router-dom';
 
import './login.css'

import { Formik } from 'formik';

import { usePostLoginMutation } from '../queries/user';

const SigninSchema = Yup.object().shape({
  Login: Yup.string()
    .min(2, 'Логин очень короткий')
    .max(50, 'Логин очень длинный')
    .required('Логин обязателен'),
  Password: Yup.string()
    .min(2, 'Пароль очень короткий')
    .max(50, 'Пароль очень длинный')
    .matches(/[a-zA-Z0-1]/, 'Пароль может содержать только латинские буквы и цифры')
    .required('Пароль обязателен'),
});

const Login = () => {
  const router = useIonRouter()

  const [login] = usePostLoginMutation()

  const handleLogin = useCallback(async (data, { setFieldError }) => {
    const result = await login(data)

    if (result.error) {
        setFieldError('general', 'Пароль или логин не верный')
        return
    }

    router.push('/catalog')
}, [login, router])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Войти</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Formik
            initialValues={SigninSchema.cast()}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
              <Space style={{margin: '20px'}}>
                <Form
                    className="login-form"
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

                    {errors.general ? <p style={{ color: 'red' }}>{errors.general}</p> : null}
                    <Button
                        type='primary'
                        htmlType='submit'
                        loading={isSubmitting}
                        disabled={!(dirty && isValid)}
                    >
                        Войти
                    </Button>
                    <Link to='/register'>Нет аккаунта?</Link>
                </Form>
              </Space>
            )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default Login;
