import React from 'react';
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonProgressBar, IonItem, IonList, IonImg, IonLabel, IonThumbnail} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import './CourseCard.css'

const items = [{ src: 'http://placekitten.com/g/200/300'}];
  
export const CourseCard = () => {
  return (
      <>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>разработка</IonCardSubtitle>
            <div class='flex-centr'>
            <IonCardTitle>Мобильная разработка</IonCardTitle>
                <IonThumbnail style={{'--size': '100px'}} slot="start">
                    <IonImg src={items[0].src} />
                </IonThumbnail>
            </div>
          </IonCardHeader>
          <IonCardContent>
            Курс про мобильную разработку, курс про мобильную разработку, курс про мобильную разработку
          </IonCardContent>
          <div class='flex-centr'>
            <IonCardContent>
                    50%
            </IonCardContent>
            <IonCardContent>
                    *stars*
            </IonCardContent>
          </div>
        <IonProgressBar style={{'--progress-background': '#6D54DE'}} value={0.5}></IonProgressBar><br />
        <IonCardContent>
            <div class='flex-centr'>
                <IonButton style={{'--background': '#6D54DE'}}>Начать</IonButton>
                <IonButton style={{'--background': '#6D54DE'}}>Смотреть</IonButton>
            </div>
        </IonCardContent>
        </IonCard>
        </>
  );
};
