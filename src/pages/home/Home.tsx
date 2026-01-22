import { IonContent, IonPage } from '@ionic/react';
import "./styles/Home.scss"
import { Navigation } from './parts/Navigation';
import { Jumbotron } from './parts/Jumbotron';
import { Models } from './parts/Models';
import { ReasonsToBuy } from './parts/ReasonsToBuy';
import { FeaturedProducts } from './parts/FeaturedProducts';
import { ProductCategories } from './parts/ProductCategories';
import { Footer } from './parts/Footer';
import { useRef } from 'react';
import { useScrollAnimations } from '../../hooks/useScrollAnimations';

const Home: React.FC = () => {
    const jumbotronRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);
    const reasonsRef = useRef<HTMLDivElement>(null);
    const modelsRef = useRef<HTMLDivElement>(null);

    useScrollAnimations({
        jumbotronRef,
        categoriesRef,
        productsRef,
        reasonsRef,
        modelsRef
    });

    return (
        <IonPage id='home-page'>
            <IonContent>
                <div className="announcement-bar">
                    30% OFF ENDS TODAY: FREE SHIPPING & COD NATIONWIDE
                </div>
                <Navigation />
                <Jumbotron ref={jumbotronRef} />
                <ProductCategories ref={categoriesRef} />
                <FeaturedProducts ref={productsRef} />
                <ReasonsToBuy ref={reasonsRef} />
                <Models ref={modelsRef} />
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default Home;
