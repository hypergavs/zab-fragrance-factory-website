import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { arrowForward, woman, man, sparkles, flameOutline, waterOutline } from 'ionicons/icons';
import '../styles/parts/ProductCategories.scss';

interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    itemCount: number;
}

const categories: Category[] = [
    {
        id: 'perfume',
        name: "Perfumes",
        description: "Explore our exclusive perfume collection",
        icon: woman,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop',
        itemCount: 24
    },
    {
        id: 'diffuser',
        name: 'Diffusers',
        description: 'Transform your space with lasting aromas',
        icon: flameOutline,
        image: 'https://images.unsplash.com/photo-1602874801006-e75a66a34e9e?w=500&h=600&fit=crop',
        itemCount: 15
    },
    {
        id: 'scented-alcohol',
        name: 'Scented Alcohol',
        description: 'Premium scented alcohol for every occasion',
        icon: waterOutline,
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&h=600&fit=crop',
        itemCount: 10
    }
];

export const ProductCategories: React.FC = () => {
    return (
        <section className="categories-section">
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                        <div className="section-header">
                            <h2>Shop by Category</h2>
                            <p>Discover your perfect scent</p>
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow className="categories-grid ion-justify-content-center">
                    <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                        <IonRow>
                            {categories.map((category) => (
                                <IonCol
                                    key={category.id}
                                    size="12"
                                    sizeSm="6"
                                    sizeMd="4"
                                    className="category-col"
                                >
                                    <div className="category-card">
                                        <img src={category.image} alt={category.name} className="category-bg-image" />
                                        <div className="category-overlay-gradient"></div>
                                        <div className="category-content">
                                            <IonIcon icon={category.icon} className="category-icon" />
                                            <h3>{category.name}</h3>
                                            <p>{category.description}</p>
                                            <span className="item-count">{category.itemCount} products</span>
                                            <IonButton
                                                fill="outline"
                                                className="shop-btn"
                                                routerLink={`/category/${category.id}`}
                                            >
                                                Shop Now
                                                <IonIcon icon={arrowForward} slot="end" />
                                            </IonButton>
                                        </div>
                                    </div>
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </section>
    );
}