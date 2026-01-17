import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import "./styles/Home.scss"
import LogoFull from "../assets/images/logo-full.png"
import { cartOutline, menuOutline, person, searchOutline } from "ionicons/icons"

const Home: React.FC = () => {
    return (
        <IonPage id='home-page'>
            <IonContent>
                <div className="announcement-bar">
                    30% OFF ENDS TODAY: FREE SHIPPING & COD NATIONWIDE
                </div>
                <IonGrid>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='12' sizeSm='11' sizeMd='10' sizeLg='8'>
                            <div className="main-navigation-wrapper">
                                <div className="navigation-menu-button ion-display-md-none">
                                        <IonButton fill='clear'>
                                            <IonIcon icon={menuOutline}></IonIcon>
                                        </IonButton>
                                    </div>
                                <div className="menu-and-company-logo">
                                    
                                    <div className="company-logo">
                                        <img src={LogoFull} alt="Zab Fragrance Factory Logo" />
                                    </div>
                                    <ul className="main-navigation ion-display-md-flex ion-display-none">
                                        <li><IonButton fill='clear' routerLink='/'>Home</IonButton></li>
                                        <li><IonButton fill='clear' routerLink='/men'>Men</IonButton></li>
                                        <li><IonButton fill='clear' routerLink='/women'>Women</IonButton></li>
                                        <li><IonButton fill='clear' routerLink='/all'>All</IonButton></li>
                                        <li><IonButton fill='clear' routerLink='/best-sellers'>Best Sellers</IonButton></li>
                                    </ul>
                                </div>
                                <div className="navigation-buttons">
                                    <IonButton fill='clear'>
                                        <IonIcon icon={searchOutline}></IonIcon>
                                    </IonButton>
                                    <IonButton fill='clear'>
                                        <IonIcon icon={person}></IonIcon>
                                    </IonButton>
                                    <IonButton fill='clear'>
                                        <IonIcon icon={cartOutline}></IonIcon>
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Home;
