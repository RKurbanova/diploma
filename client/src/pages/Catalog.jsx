import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';
import { CourceCard } from '../components/CourseCard';

const Catalog = ({user, cources, favorites, setFavorites, subscriptions, setSubscriptions}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Каталог</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {cources?.map(cource => {
          return <CourceCard user={user} favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} key={cource.ID} cource={cource} />
        })}
      </IonContent>
    </IonPage>
  );
};

export default Catalog;
