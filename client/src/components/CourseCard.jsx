import React, {useEffect, useState} from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonItem, IonList, IonImg, IonLabel, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './CourseCard.css'
  
export const CourceCard = ({cource}) => {
  const touched = Boolean(localStorage.getItem(cource.ID)) || false

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
                    50%
            </IonCardContent>
            <IonCardContent>
                    рейтинг 0/5
            </IonCardContent>
          </div>
        <IonProgressBar style={{'--progress-background': '#6D54DE'}} value={0.5}></IonProgressBar><br />
        <IonCardContent>
            <div className='flex-centr'>
              {touched ? <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Смотреть</IonButton> : <IonButton href={`/cource/${cource.ID}`} style={{'--background': '#6D54DE'}}>Начать</IonButton>}
            </div>
        </IonCardContent>
        </IonCard>
        </>
  );
};
