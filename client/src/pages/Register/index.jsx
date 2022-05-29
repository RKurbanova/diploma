import {
    useNavigate
} from "react-router-dom";
import { usePostRegisterMutation } from "../../queries/user"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect } from 'react'
 
import './index.css'
import { Button, Input, Form, Space } from "antd";
import FieldFormikContext from "../../components/FieldFormContext";

const SignupSchema = Yup.object().shape({
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

export default function RegisterPage({user}) {
    const navigate = useNavigate();
    const [register] = usePostRegisterMutation()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])

    const handleRegister = useCallback(async (data, { setFieldError }) => {
        const result = await register(data)

        if (result.error) {
            setFieldError('general', 'Пользователь с такими данными уже существует')
        }
    }, [register])

    return <Space className="register-wrapper" direction="vertical">
        <h2>Зарегистрировать аккаунт</h2>
        <Formik
            initialValues={SignupSchema.cast()}
            validationSchema={SignupSchema}
            onSubmit={handleRegister}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty, errors }) => (
                <Form
                    className="register-form"
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
                        Зарегистрировать
                    </Button>
                </Form>
            )}
        </Formik>
    </Space>
}
