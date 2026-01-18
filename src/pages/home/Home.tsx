import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import "./styles/Home.scss"
import { cartOutline, menuOutline, person, searchOutline } from "ionicons/icons"
import { Navigation } from './parts/Navigation';

const Home: React.FC = () => {
    return (
        <IonPage id='home-page'>
            <IonContent>
                <div className="announcement-bar">
                    30% OFF ENDS TODAY: FREE SHIPPING & COD NATIONWIDE
                </div>
                <Navigation />

            </IonContent>
        </IonPage>
    );
};

export default Home;
