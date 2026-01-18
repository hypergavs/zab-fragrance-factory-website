import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react"
import { menuOutline, searchOutline, person, cartOutline } from "ionicons/icons"

import LogoFull from "../../../assets/images/logo-full.png"
import "../styles/parts/Navigation.scss"
export const Navigation: React.FC = () => {
    return (
        <IonGrid>
            <IonRow className='ion-justify-content-center'>
                <IonCol size='12' sizeSm='11' sizeMd='10' sizeLg='8'>
                    <div className="main-navigation-wrapper">
                        <div className="navigation-menu-button">
                            <IonButton fill='clear'>
                                <IonIcon size="large" icon={menuOutline}></IonIcon>
                            </IonButton>
                        </div>

                        <div className="company-logo">
                            <img src={LogoFull} alt="Zab Fragrance Factory Logo" />
                        </div>

                        <ul className="main-navigation">
                            <li><IonButton fill='clear' routerLink='/'>Home</IonButton></li>
                            <li><IonButton fill='clear' routerLink='/men'>Men</IonButton></li>
                            <li><IonButton fill='clear' routerLink='/women'>Women</IonButton></li>
                            <li><IonButton fill='clear' routerLink='/all'>All</IonButton></li>
                            <li><IonButton fill='clear' routerLink='/best-sellers'>Best Sellers</IonButton></li>
                        </ul>

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
    )
}