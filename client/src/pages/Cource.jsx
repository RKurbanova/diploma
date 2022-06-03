import { PropsWithChildren, useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonSpinner,
  IonThumbnail,
  IonImg,
  useIonRouter
} from '@ionic/react';
import { useParams } from 'react-router';
import { useGetCourceByIdQuery } from '../queries/cource';
import { Typography, Space,Steps  } from "antd";

const Cource = ({user}) => {
  const router = useIonRouter()
  const {courceId} = useParams()
  const [lastLesson, setLessons] = useState()

  const {data: cource, isLoading, isError} = useGetCourceByIdQuery({ ID: courceId })

  useEffect(() => {
    if (cource) {
        localStorage.setItem(cource.ID, true)
        const lessonsLs = localStorage.getItem('lessons') || []

        const lastLessonID = cource.Lessons.filter((lesson) => lessonsLs.includes(lesson.ID))?.[0]?.ID

        if (lastLessonID) {
          const index = cource.Lessons.findIndex((lesson) => lesson.ID === lastLessonID)
          setLessons(index + 1)
        }
    }
  }, [cource])

  if (isLoading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <IonSpinner style={{width: '100px', height: '100px'}} />
    </div>
  }

  if (isError) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      Курс не найден
    </div>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Курс #{cource.Title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Space style={{padding: '20px', width: '100vw'}} direction='vertical'>
          <Space>
            {
              cource.Images.map((image) => {
                return <IonThumbnail style={{'--size': '200px'}} key={image}>
                  <IonImg src={image} />
                </IonThumbnail>
              })
            }
          </Space>
        <Typography.Paragraph>
          {cource.Description}
        </Typography.Paragraph>

          <Space style={{marginTop: '10px'}}>
            <Steps direction="vertical" current={lastLesson || 0}>
              {cource.Lessons.map((lesson, index) => {
                return <Steps.Step
                disabled={index > (lastLesson || 0)}
                onClick={() => {
                  localStorage.setItem('lessons', localStorage.getItem('lessons') ? [...localStorage.getItem('lessons'), lesson.ID]: [lesson.ID] )
                  router.push(`/cource/${courceId}/lesson/${lesson.ID}`)
                  // eslint-disable-next-line no-restricted-globals
                  location.reload()
                  }}
                  key={lesson.ID}
                  title={lesson.Title}
                  description={lesson.Description}
                />
              })}
            </Steps>
          </Space>
        </Space>
      </IonContent>
    </IonPage>
  );
};

export default Cource;
