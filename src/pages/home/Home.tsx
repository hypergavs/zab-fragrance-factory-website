import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import "./styles/Home.scss"
import { cartOutline, menuOutline, person, searchOutline } from "ionicons/icons"
import { Navigation } from './parts/Navigation';
import { Jumbotron } from './parts/Jumbotron';
import { Models } from './parts/Models';
import { ReasonsToBuy } from './parts/ReasonsToBuy';
import { FeaturedProducts } from './parts/FeaturedProducts';
import { ProductCategories } from './parts/ProductCategories';
import { Footer } from './parts/Footer';

const Home: React.FC = () => {
    return (
        <IonPage id='home-page'>
            <IonContent>
                <div className="announcement-bar">
                    30% OFF ENDS TODAY: FREE SHIPPING & COD NATIONWIDE
                </div>
                <Navigation />
                <Jumbotron />
                <ProductCategories />
                <FeaturedProducts />
                <ReasonsToBuy />
                <Models />
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default Home;
