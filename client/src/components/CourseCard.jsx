import React, {useEffect, useMemo, useState} from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonItem, IonList, IonImg, IonLabel, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './CourseCard.css'
  
export const CourceCard = ({cource, favorites, setFavorites, subscriptions, setSubscriptions}) => {
  const touched = Boolean(localStorage.getItem(cource.ID)) || false

  const progress = useMemo(() => {
    return Math.random().toFixed(1)
  }, [])
  const rating = useMemo(() => {
    return Math.round(Math.random() * 5)
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
              {touched ? <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Смотреть</IonButton> : <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Начать</IonButton>}
            </div>
            <div className='flex-centr'>
              {favorites.includes(cource.ID)  ?
                <IonButton onClick={() => setFavorites(favorites.filter(item => item !== cource.ID))} style={{'--background': '#6D54DE'}}>Убрать из избранного</IonButton>
                :
                <IonButton onClick={() => setFavorites([...favorites, cource.ID])} style={{'--background': '#6D54DE'}}>Добавить в избранное</IonButton>
              }
            </div>
            <div className='flex-centr'>
              {subscriptions.includes(cource.ID)  ?
                <IonButton onClick={() => setSubscriptions(subscriptions.filter(item => item !== cource.ID))} style={{'--background': '#6D54DE'}}>Убрать из подписок</IonButton>
                :
                <IonButton onClick={() => setSubscriptions([...subscriptions, cource.ID])} style={{'--background': '#6D54DE'}}>Добавить в подписки</IonButton>
              }
            </div>
        </IonCardContent>
        </IonCard>
        </>
  );
};
