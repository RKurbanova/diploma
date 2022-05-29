import {
    useNavigate
} from "react-router-dom";
import { usePostLoginMutation } from "../../queries/user"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect } from 'react'
 
import './index.css'
import { Button, Input, Form, Space } from "antd";
import FieldFormikContext from "../../components/FieldFormContext";

const SigninSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Логин очень короткий')
    .max(50, 'Логин очень длинный')
    .required('Логин обязателен'),
  password: Yup.string()
    .min(2, 'Пароль очень короткий')
    .max(50, 'Пароль очень длинный')
    .matches(/[a-zA-Z0-1]/, 'Пароль может содержать только латинские буквы и цифры')
    .required('Пароль обязателен'),
});

export default function LoginPage({user}) {
    const navigate = useNavigate();
    const [login] = usePostLoginMutation()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleLogin = useCallback(async (data, { setFieldError }) => {
        const result = await login(data)

        if (result.error) {
            setFieldError('general', 'Пароль или логин не верный')
        }
    }, [login])

    return <Space className="login-wrapper" direction="vertical">
        <h2>Войти в аккаунт</h2>
        <Formik
            initialValues={SigninSchema.cast()}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                <Form
                    className="login-form"
                    onFinish={handleSubmit}
                    layout='vertical'
                >
                    <FieldFormikContext
                        id="login"
                        name="login"
                        label='Логин'
                        placeholder='Введите логин'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="password"
                        name="password"
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
                </Form>
            )}
        </Formik>
    </Space>
}
