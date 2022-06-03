import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';
import { CourceCard } from '../components/CourseCard';

const Catalog = ({user, cources}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Каталог</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {cources.map(cource => {
          return <CourceCard key={cource.ID} cource={cource} />
        })}
      </IonContent>
    </IonPage>
  );
};

export default Catalog;
