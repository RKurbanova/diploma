import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenu, IonMenuToggle, IonRouterOutlet, IonSpinner, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { beerOutline } from 'ionicons/icons';
import 'antd/dist/antd.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Catalog from './pages/Catalog';
import { useGetUserQuery, usePostLogoutMutation } from './queries/user';
import { useGetAllCourcesQuery } from './queries/cource';
import Login from './pages/Login';
import { useCallback, useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Cource from './pages/Cource';
import Lesson from './pages/Lesson';
import Subscriptions from './pages/Subscriptions';
import Favorites from './pages/Favorites';
import CreateCource from './pages/CreateCource';
import Register from './pages/Register';
import ProfileEdit from './pages/ProfileEdit';

setupIonicReact();

const App = () => {
  const router = useIonRouter()

  const {data: cources, isLoading: isDealsLoading} = useGetAllCourcesQuery({})
  let {data: user, isLoading: isUserLoading, isError} = useGetUserQuery({})
  const [logout, { isLoading: isLoggingOut }] = usePostLogoutMutation()

  const [comments, setComments] = useState({})

  useEffect(() => {
    const comments = localStorage.getItem('comments')
    setComments(comments ? JSON.parse(comments) : {})
  }, [])

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    setFavorites(favorites ? JSON.parse(favorites) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const subscriptions = localStorage.getItem('subscriptions')
    setSubscriptions(subscriptions ? JSON.parse(subscriptions) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
  }, [subscriptions])

  user = isError ? undefined : user 
  const isLoading = isDealsLoading || isUserLoading || isLoggingOut

  const isUser = user?.Role === 0
  const isAdmin = user?.Role === 1

  const handleLogout = useCallback(async () => {
    await logout({})
    // eslint-disable-next-line no-restricted-globals
    location.replace('/login')
  }, [logout])

  if (isLoading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <IonSpinner style={{width: '100px', height: '100px'}} />
    </div>
  }

  return <IonApp>
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="catalog" href="/catalog">
          <IonIcon icon={beerOutline} />
          <IonLabel>Каталог</IonLabel>
        </IonTabButton>
  
        {
          !user ?
            [
              <IonTabButton key="login" tab="login" href="/login">
                <IonIcon icon={beerOutline} />
                <IonLabel>Войти</IonLabel>
              </IonTabButton>,
              <IonTabButton key="register" tab="register" href="/register">
                <IonIcon icon={beerOutline} />
                <IonLabel>Регистрация</IonLabel>
              </IonTabButton>,
            ]
            : null
        }

        {
          user ?
            [
              <IonTabButton key="profile" tab="profile" href="/profile">
                <IonIcon icon={beerOutline} />
                <IonLabel>Профиль</IonLabel>
              </IonTabButton>,
              <IonTabButton key="create-cource" tab="create-cource" href="/cource/new">
                <IonIcon icon={beerOutline} />
                <IonLabel>Создать курс</IonLabel>
              </IonTabButton>,
              <IonTabButton key="user-favorites" tab="user-favorites" href="/user/favorites">
                <IonIcon icon={beerOutline} />
                <IonLabel>Избранное</IonLabel>
              </IonTabButton>,
              <IonTabButton key="user-cources" tab="user-cources" href="/user/cources">
                <IonIcon icon={beerOutline} />
                <IonLabel>Подписки</IonLabel>
              </IonTabButton>,
              <IonTabButton key="logout" tab="logout" onClick={handleLogout}>
                <IonIcon icon={beerOutline} />
                <IonLabel>Выйти</IonLabel>
              </IonTabButton>
            ]
            : null
        }
      </IonTabBar>

      <IonRouterOutlet>
        <Route path="/catalog">
          <Catalog favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} user={user} cources={cources} />
        </Route>
        {
          [
            ...(!user ? [
              <Route key="login" path="/login">
                <Login />
              </Route>,
              <Route key="register" path="/register">
                <Register />
              </Route>
            ]: []),
            ...(user ? [
              <Route key="profile" path="/profile">
                <Profile user={user} />
              </Route>,
              <Route key="/cource/:courceId" path="/cource/:courceId">
                <Cource comments={comments} setComments={setComments} favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} user={user} />
              </Route>,
              <Route key="/cource/:courceId/lesson/:lessonId" path="/cource/:courceId/lesson/:lessonId">
                <Lesson user={user} />
              </Route>,
              <Route key="/cource/new" path="/cource/new">
                <CreateCource user={user} />
              </Route>,
              <Route key="/user/cources" path="/user/cources">
                <Subscriptions cources={cources} favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} user={user} />
              </Route>,
              <Route key="/user/favorites" path="/user/favorites">
                <Favorites cources={cources} favorites={favorites} setFavorites={setFavorites} subscriptions={subscriptions} setSubscriptions={setSubscriptions} user={user} />
              </Route>,
            ]: [])
          ]
        }
        <Route render={() => <Redirect to="/catalog" />} />
      </IonRouterOutlet>
    </IonTabs>
  </IonApp>
};

export default App;
