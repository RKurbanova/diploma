import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage
} from '@ionic/react';
import { Space, PageHeader, Button} from "antd";
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';

import './profile.css'
import ProfileEdit from './ProfileEdit';

const Profile = ({user}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Пользователь</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          isEdit ? <ProfileEdit user={user} setIsEdit={setIsEdit} /> : <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
            <UserCard user={user} currentuser={user} />
            <Button type='danger' onClick={() => setIsEdit(!isEdit)}>Редактировать</Button>
          </Space>
        }
      </IonContent>
    </IonPage>
  );
};

export default Profile;
