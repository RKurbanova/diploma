import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';

const Subscriptions = ({user}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Подписки</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        лол
      </IonContent>
    </IonPage>
  );
};

export default Subscriptions;
