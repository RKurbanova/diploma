import React, {useEffect, useMemo, useState} from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonItem, IonList, IonImg, IonLabel, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './CourseCard.css'
  //cource.ID
export const CourceCard = ({user, cource, favorites, setFavorites, subscriptions, setSubscriptions}) => {
  const progress = useMemo(() => {
    return 0
  }, [])
  const rating = useMemo(() => {
    return 0
  }, [])
  
  return (
      <>
        <IonCard>
          <IonCardHeader>
            <div className='flex-centr'>
            <IonCardTitle>{cource.Title}</IonCardTitle>
                <IonThumbnail style={{'--size': '100px'}} slot="start">
                    <IonImg src={cource.Images[0]} />
                </IonThumbnail>
            </div>
          </IonCardHeader>
          <IonCardContent>
            {cource.Description}
          </IonCardContent>
          <div className='flex-centr'>
            <IonCardContent>
              {progress * 100}%
            </IonCardContent>
            <IonCardContent>
                    рейтинг {rating}/5
            </IonCardContent>
          </div>
        <IonProgressBar style={{'--progress-background': '#6D54DE'}} value={Number(progress)}></IonProgressBar><br />
        <IonCardContent>
            <div className='flex-centr'>
              {subscriptions.includes(cource.ID)  ? <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Смотреть</IonButton> : <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Начать</IonButton>}
            </div>
            {favorites.includes(cource.ID)  ?
              <IonButton onClick={() => setFavorites(favorites.filter(item => item !== cource.ID))} style={{'--background': '#6D54DE'}}>Убрать из избранного</IonButton>
              :
              <IonButton onClick={() => setFavorites([...favorites, cource.ID])} style={{'--background': '#6D54DE'}}>Добавить в избранное</IonButton>
            }
        </IonCardContent>
        </IonCard>
        </>
  );
};
