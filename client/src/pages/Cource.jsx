import { PropsWithChildren, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonSpinner
} from '@ionic/react';
import { useParams } from 'react-router';
import { useGetCourceByIdQuery } from '../queries/cource';

const Cource = ({user}) => {
  const {courceId} = useParams()

  const {data: cource, isLoading, isError} = useGetCourceByIdQuery({ ID: courceId })

  if (isLoading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <IonSpinner style={{width: '100px', height: '100px'}} />
    </div>
  }

  if (isError) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      Курс не найден
    </div>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Курс #{cource.ID}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {}
      </IonContent>
    </IonPage>
  );
};

export default Cource;
