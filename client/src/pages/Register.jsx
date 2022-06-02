import { PropsWithChildren, useCallback, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  useIonRouter,
  IonButton
} from '@ionic/react';
import { usePostRegisterMutation } from '../queries/user';

const Register = () => {
  const router = useIonRouter()
  const [register] = usePostRegisterMutation()
  const handleLogin = useCallback(async () => {
    await register({
      login: "kek",
      password: "kek"
    })
    router.push('/catalog')
  }, [register, router])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Регистрация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={handleLogin}>Регистрация</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
