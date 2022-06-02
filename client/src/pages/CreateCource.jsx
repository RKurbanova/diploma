import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';

const CreateCource = ({user}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Создать курс</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        anything
      </IonContent>
    </IonPage>
  );
};

export default CreateCource;
