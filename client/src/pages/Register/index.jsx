import {
    Link,
    useNavigate
} from "react-router-dom";
import { usePostRegisterMutation } from "../../queries/user"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect } from 'react'
 
import './index.css'
import { Button, Input, Form, Space } from "antd";
import FieldFormikContext from "../../components/FieldFormContext";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const passportRegExp = /^[0-9]{4}:[0-9]{6}$/

const allowedBirthDate = new Date()
allowedBirthDate.setFullYear(allowedBirthDate.getFullYear() - 18)
const birthDateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

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
    firstname: Yup.string()
        .min(2, 'Имя очень короткое')
        .max(50, 'Имя очень длинное')
        .required('Имя обязательно'),
    lastname: Yup.string()
        .min(2, 'Фамилия очень короткая')
        .max(50, 'Фамилия очень длинная')
        .required('Фамилия обязательна'),
    patronymic: Yup.string()
        .min(2, 'Отчество очень короткое')
        .max(50, 'Отчество очень длинное')
        .required('Отчество обязательно'),
    email: Yup.string()
        .email('Некорректная почта')
        .required('Почта обязательна'),
    birthday: Yup.string()
        .matches(birthDateRegExp, 'Не корректная дата - формат YYYY-MM-DD')
        .test('minAge', 
            'Минимальный допустимый возраст - 18 лет', 
            function(date) { 
                return new Date(date) < allowedBirthDate; 
            }
         )
        .required('Дата обязательна'),
    phone: Yup.string().matches(phoneRegExp, 'Не корректный номер телефона').required('Телефон обязателен'),
    passport: Yup.string().matches(passportRegExp, 'Номер и серия паспорта должны быть в формате - серия:номер').required('Паспорт обязателен')
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
            {({ handleSubmit, isSubmitting, isValid, dirty, errors, values }) => (
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
                    <FieldFormikContext
                        id="firstname"
                        name="firstname"
                        label='Имя'
                        placeholder='Введите имя'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="lastname"
                        name="lastname"
                        label='Фамилия'
                        placeholder='Введите фамилию'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="patronymic"
                        name="patronymic"
                        label='Отчество'
                        placeholder='Введите отчество'
                        renderComponent={Input}
                        maxLength={50}
                    />
                    <FieldFormikContext
                        id="email"
                        name="email"
                        label='Почта'
                        placeholder='Введите почту'
                        renderComponent={Input}
                    />
                    <FieldFormikContext
                        id="phone"
                        name="phone"
                        label='Телефон'
                        placeholder='Введите телефон'
                        renderComponent={Input}
                    />
                    <FieldFormikContext
                        id="birthday"
                        name="birthday"
                        label='Дата рождения'
                        placeholder='2000-12-14'
                        renderComponent={Input}
                    />
                    <FieldFormikContext
                        id="passport"
                        name="passport"
                        label='Серия и номер паспорта'
                        placeholder='Введите серию и номер паспорта - 0000:000000'
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
                    <Link to='/login'>Уже есть аккаунт?</Link>
                </Form>
            )}
        </Formik>
    </Space>
}
