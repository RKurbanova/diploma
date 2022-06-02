import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';

const Lesson = ({user}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Урок</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        лол
      </IonContent>
    </IonPage>
  );
};

export default Lesson;
