import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  useIonRouter,
  IonButton

} from '@ionic/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react'
 
import './createCource.css'
import { Button, Input, Form, Space, Tag } from "antd";
import FieldFormikContext from "../components/FieldFormWithContext";

import {
    PlusOutlined
} from '@ant-design/icons';
import UploadImage from "../components/UploadImage";
import { usePostCreateCourceMutation } from '../queries/cource'
import UploadVideo from '../components/UploadVideo';

const LessonSchema = Yup.object().shape({
    Title: Yup.string()
        .min(2, 'Название очень короткое')
        .max(250, 'Название очень длинное')
        .required('Название обязательно'),
    Description: Yup.string()
        .min(2, 'Описание очень короткое')
        .max(500, 'Описание очень длинное')
        .required('Описание обязательно'),
});

const CourceSchema = Yup.object().shape({
    Title: Yup.string()
        .min(2, 'Название очень короткое')
        .max(250, 'Название очень длинное')
        .required('Название обязательно'),
    Description: Yup.string()
        .min(2, 'Описание очень короткое')
        .max(250, 'Описание очень длинное')
        .required('Описание обязательно'),
    Lessons: Yup.object().shape({
        0: LessonSchema.default(undefined),
        1: LessonSchema.default(undefined),
        2: LessonSchema.default(undefined),
        3: LessonSchema.default(undefined),
        4: LessonSchema.default(undefined),
        5: LessonSchema.default(undefined),
        6: LessonSchema.default(undefined),
        7: LessonSchema.default(undefined),
        8: LessonSchema.default(undefined)
    })
});

export default function CreateCourcePage({user}) {
    const router = useIonRouter()
    const [createCource, {isLoading}] = usePostCreateCourceMutation()
    const [fileList, setFileList] = useState([])
    const [videos, setVideos] = useState({})
    const [lessonsAmount, setLessonsAmount] = useState(0)

    const handleCreate = useCallback(async (data, { setFieldError, resetForm }) => {
        let Lessons = Object.entries(data.Lessons).filter(([_, lesson]) => lesson).reduce((acc, [key, lesson]) => {
            acc[key] = lesson
            return acc
        }, [])

        if (Lessons.length < 1) {
            setFieldError('general', 'Нужно указать хотя бы один урок')
            return
        }

        const getBinary = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });

        const getBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

        if (Lessons.length !== Object.entries(videos).length) {
            setFieldError('general', 'Нужно указать по одному видео для каждого урока')
            return
        }

        Lessons = await Promise.all(Lessons.map(async (lesson, index) => {
          return {
            ...lesson,
            Videos: await Promise.all(videos[index].map(({originFileObj}) => getBase64(originFileObj)))
          }
        }, []))

        const Images = await Promise.all(fileList.map(({originFileObj}) => getBase64(originFileObj)))

        if (Images.length === 0) {
          setFieldError('general', 'Укажите хотя бы одну картинку')
          return
        }

        const result = await createCource({
          ...data,
          Images,
          Lessons,
          UserID: user.ID
        })
        
        if (result.error) {
            setFieldError('general', 'Что-то пошло не так')
            return
        }

        router.push('/')
        // eslint-disable-next-line no-restricted-globals
        location.reload()
        resetForm()
        setVideos({})
        setFileList([])
        setLessonsAmount(0)
    }, [createCource, fileList, router, user.ID, videos])

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Создать курс</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <Space className="register-wrapper" direction="vertical">
            <Formik
                initialValues={CourceSchema.cast()} 
                validationSchema={CourceSchema}
                onSubmit={handleCreate}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty, errors, values, setFieldValue }) => (
                    <Form
                        className="register-form"
                        onFinish={handleSubmit}
                        layout='vertical'
                    >
                        <FieldFormikContext
                            id="Title"
                            name="Title"
                            label='Название'
                            placeholder='Название'
                            renderComponent={Input}
                            maxLength={50}
                        />
                        <FieldFormikContext
                            id="Description"
                            name="Description"
                            label='Описание'
                            placeholder='Опишите идею курса'
                            renderComponent={Input.TextArea}
                            maxLength={50}
                        />
                        <UploadImage fileList={fileList} handleChange={handleChange} />

                        {
                            new Array(lessonsAmount).fill(1).map((_, index) => (
                                <Space key={index} direction='vertical'>
                                    <p>Урок {index + 1}</p>
                                    <FieldFormikContext
                                        id={index}
                                        name={index}
                                        nest="Lessons"
                                        field="Title"
                                        label='Название урока'
                                        placeholder='Название урока'
                                        renderComponent={Input}
                                        maxLength={50}
                                    />
                                    <FieldFormikContext
                                        id={index}
                                        name={index}
                                        nest="Lessons"
                                        field="Description"
                                        label='Описание урока'
                                        placeholder='Описание урока'
                                        renderComponent={Input.TextArea}
                                        maxLength={10000}
                                    />
                                    <UploadVideo fileList={videos[index]} handleChange={({fileList}) => {
                                      setVideos({
                                        ...videos,
                                        [index]: fileList
                                      })
                                    }} />
                                </ Space>
                            ))
                        }
                        {lessonsAmount ? 
                            <IonButton type='button' disabled={isLoading} onClick={() => {
                                setLessonsAmount(lessonsAmount - 1)
                                setFieldValue(`Lessons.${lessonsAmount - 1}]`, undefined)
                                setFieldValue(`Lessons.${lessonsAmount - 1}]`, undefined)
                                setFieldValue(`Lessons.${lessonsAmount - 1}]`, undefined)
                                delete videos[lessonsAmount - 1]
                            }}style={{marginBottom: '10px', '--background': 'red'}}>
                                Удалить предыдущий урок
                                {' '}
                                <PlusOutlined />
                            </IonButton>
                        : null}
                        
                        <IonButton type='button' disabled={isLoading} onClick={() => {
                            setLessonsAmount(lessonsAmount + 1)
                        }}>
                            Добавить урок
                            {' '}
                            <PlusOutlined />
                        </IonButton>

                        {errors.general ? <p style={{ color: 'red' }}>{errors.general}</p> : null}
                        <IonButton
                            type='primary'
                            htmlType='submit'
                            loading={isSubmitting}
                            disabled={!dirty || (dirty && !isValid) || isLoading}
                        >
                          Создать
                        </IonButton>
                    </Form>
                )}
            </Formik>
            </Space>
          </IonContent>
      </IonPage>
    )
}
