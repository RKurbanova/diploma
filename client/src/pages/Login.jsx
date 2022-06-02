import { PropsWithChildren, useCallback, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButton,
  useIonRouter
} from '@ionic/react';
import { usePostLoginMutation } from '../queries/user';

const Login = () => {
  const router = useIonRouter()

  const [login] = usePostLoginMutation()
  const handleLogin = useCallback(async () => {
    await login({
      login: "kek",
      password: "kek"
    })
    router.push('/catalog')
  }, [login, router])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Войти</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleLogin}>Логин</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
