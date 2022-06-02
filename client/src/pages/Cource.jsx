import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';

const Cource = ({user}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Курс</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        лол
      </IonContent>
    </IonPage>
  );
};

export default Cource;
