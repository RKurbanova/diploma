import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';
import { CourceCard } from '../components/CourseCard';
import { Space } from 'antd';

const Favorites = ({user, favorites, setFavorites, cources, subscriptions, setSubscriptions}) => {
  const courcesSSSSS = cources.filter(item => favorites.includes(item.ID))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Избранное</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {courcesSSSSS.map(cource => {
          return <CourceCard favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} key={cource.ID} cource={cource} />
        })}
        <Space>
          {!courcesSSSSS.length && "Ничего нет в избранном."}
        </Space>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
