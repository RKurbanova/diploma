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
  useIonRouter,
  IonButton
} from '@ionic/react';
import { useParams } from 'react-router';
import { useGetCourceByIdQuery } from '../queries/cource';
import { Typography, Space,Steps, Button, Input, Avatar, Tooltip, Comment  } from "antd";

const { Paragraph } = Typography

const Cource = ({comments, setComments, user, favorites, setFavorites, subscriptions, setSubscriptions}) => {
  const router = useIonRouter()
  const {courceId} = useParams()
  const [lastLesson, setLessons] = useState()
  const [comment, setComment] = useState('')
  const curcomments = comments[courceId] || []

  const {data: cource, isLoading, isError} = useGetCourceByIdQuery({ ID: courceId })

  useEffect(() => {
    if (cource) {
        localStorage.setItem(cource.ID, true)
        const lessonsLs = localStorage.getItem('lessons') || []

        const lastLessonID = cource.Lessons?.filter((lesson) => lessonsLs.includes(lesson.ID))?.[0]?.ID

        if (lastLessonID) {
          const index = cource.Lessons?.findIndex((lesson) => lesson.ID === lastLessonID)
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
          {favorites.includes(cource.ID)  ?
            <IonButton onClick={() => setFavorites(favorites.filter(item => item !== cource.ID))} style={{'--background': '#6D54DE'}}>Убрать из избранного</IonButton>
            :
            <IonButton onClick={() => setFavorites([...favorites, cource.ID])} style={{'--background': '#6D54DE'}}>Добавить в избранное</IonButton>
          }
          {subscriptions.includes(cource.ID)  ?
            <IonButton onClick={() => setSubscriptions(subscriptions.filter(item => item !== cource.ID))} style={{'--background': '#6D54DE'}}>Убрать из подписок</IonButton>
            :
            <IonButton onClick={() => setSubscriptions([...subscriptions, cource.ID])} style={{'--background': '#6D54DE'}}>Добавить в подписки</IonButton>
          }
          <Space>
            {
              cource.Images?.map((image) => {
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
              {cource.Lessons?.map((lesson, index) => {
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

          <Space style={{marginBottom: '10px'}} direction='vertical'>
            <Paragraph style={{marginTop: '40px'}}>Комментарии</Paragraph>
            <Input.TextArea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий" max={500} />
            <Button onClick={() => {
                setComment('')
                setComments({
                  ...comments,
                  [courceId]: [...(comments[courceId] ? comments[courceId] : []), {
                    Text: comment,
                    CreatedAt: new Date()
                  }]
                })
            }} loading={isLoading} disabled={isLoading}>
                Добавить коммент
            </Button>
            {curcomments.map(comment => {
                return  <Comment
                  avatar={<Avatar />}
                  content={comment.Text}
                  datetime={<Tooltip title={new Date(comment.CreatedAt).toLocaleString()}>
                        <span>{new Date(comment.CreatedAt).toLocaleString()}</span>
                      </Tooltip>}
              />
            })}
          </Space>
        </Space>
      </IonContent>
    </IonPage>
  );
};

export default Cource;
