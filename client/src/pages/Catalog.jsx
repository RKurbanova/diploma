import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';

const Catalog = ({user, cources}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Каталог</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        anything
      </IonContent>
    </IonPage>
  );
};

export default Catalog;
