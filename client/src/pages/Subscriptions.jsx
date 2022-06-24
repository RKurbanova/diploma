import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';
import { CourceCard } from '../components/CourseCard';
import { Space } from 'antd';

const Subscriptions = ({user, favorites, setFavorites, cources, subscriptions, setSubscriptions}) => {
  const courcesSSSSS = cources.filter(item => subscriptions.includes(item.ID))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Подписки</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {courcesSSSSS.map(cource => {
          return <CourceCard user={user} favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} key={cource.ID} cource={cource} />
        })}
        <Space>
          {!courcesSSSSS.length && "Ничего нет в подписках."}
        </Space>
      </IonContent>
    </IonPage>
  );
};

export default Subscriptions;
