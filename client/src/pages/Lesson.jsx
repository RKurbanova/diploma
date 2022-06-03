import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonSpinner
} from '@ionic/react';
import { useParams } from 'react-router';
import { useGetCourceByIdQuery, useGetLessonByIdQuery } from '../queries/cource';

const Lesson = ({user}) => {
  const {courceId, lessonId} = useParams()

  const {data: cource, isLoading: isCourceLoading, isError: isCourceError} = useGetCourceByIdQuery({ ID: courceId })
  const {data: lesson, isLoading: isLessonLoading, isError: isLessonError } = useGetLessonByIdQuery({ ID: lessonId })

  const isLoading = isCourceLoading || isLessonLoading
  const isError = isCourceError || isLessonError

  if (isLoading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <IonSpinner style={{width: '100px', height: '100px'}} />
    </div>
  }

  if (isError || !lesson) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      Урок не найден
    </div>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Урок {lesson.Title} Курса {cource.Title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {lesson.Description}
        <video width="100%" controls type="video/mp4" />
      </IonContent>
    </IonPage>
  );
};

export default Lesson;
