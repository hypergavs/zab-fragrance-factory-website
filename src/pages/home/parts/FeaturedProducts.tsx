import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { heartOutline, heart, cartOutline } from 'ionicons/icons';
import { useState, forwardRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/parts/FeaturedProducts.scss';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
}

// Dummy products data
const products: Product[] = [
    {
        id: 1,
        name: "Midnight Elegance",
        description: "A sophisticated blend of amber and sandalwood",
        price: 1299,
        originalPrice: 1599,
        image: "https://via.placeholder.com/300x400/333/fff?text=Midnight+Elegance",
        category: "Women",
        rating: 4.8
    },
    {
        id: 2,
        name: "Ocean Breeze",
        description: "Fresh aquatic notes with hints of citrus",
        price: 1099,
        image: "https://via.placeholder.com/300x400/1e90ff/fff?text=Ocean+Breeze",
        category: "Men",
        rating: 4.6
    },
    {
        id: 3,
        name: "Rose Garden",
        description: "Delicate floral bouquet with a touch of jasmine",
        price: 1499,
        originalPrice: 1799,
        image: "https://via.placeholder.com/300x400/ff69b4/fff?text=Rose+Garden",
        category: "Women",
        rating: 4.9
    },
    {
        id: 4,
        name: "Urban Legend",
        description: "Bold and masculine with woody undertones",
        price: 1399,
        image: "https://via.placeholder.com/300x400/2f4f4f/fff?text=Urban+Legend",
        category: "Men",
        rating: 4.7
    },
    {
        id: 5,
        name: "Vanilla Dream",
        description: "Sweet and warm vanilla with caramel notes",
        price: 1199,
        originalPrice: 1499,
        image: "https://via.placeholder.com/300x400/daa520/fff?text=Vanilla+Dream",
        category: "Unisex",
        rating: 4.8
    },
    {
        id: 6,
        name: "Citrus Burst",
        description: "Energizing blend of lemon and bergamot",
        price: 999,
        image: "https://via.placeholder.com/300x400/ffa500/fff?text=Citrus+Burst",
        category: "Unisex",
        rating: 4.5
    },
    {
        id: 7,
        name: "Mystic Noir",
        description: "Mysterious and alluring with oud and musk",
        price: 1699,
        originalPrice: 1999,
        image: "https://via.placeholder.com/300x400/191970/fff?text=Mystic+Noir",
        category: "Women",
        rating: 4.9
    },
    {
        id: 8,
        name: "Fresh Mint",
        description: "Cool and refreshing with green notes",
        price: 899,
        image: "https://via.placeholder.com/300x400/98fb98/000?text=Fresh+Mint",
        category: "Men",
        rating: 4.4
    }
];

export const FeaturedProducts = forwardRef<HTMLElement>((props, ref) => {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    const toggleFavorite = (productId: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    return (
        <section ref={ref} className="featured-products-section">
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                        <div className="section-header">
                            <h2>Featured Fragrances</h2>
                            <p>Discover our most popular scents</p>
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 25,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                },
                            }}
                            className="products-swiper"
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <div className="product-card">
                                        <div className="product-image-wrapper">
                                            <img src={product.image} alt={product.name} />
                                            <div className="product-badge">
                                                {product.category}
                                            </div>
                                            <button
                                                className="favorite-btn"
                                                onClick={() => toggleFavorite(product.id)}
                                            >
                                                <IonIcon
                                                    icon={favorites.has(product.id) ? heart : heartOutline}
                                                    className={favorites.has(product.id) ? 'active' : ''}
                                                />
                                            </button>
                                            {product.originalPrice && (
                                                <div className="discount-badge">
                                                    SALE
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-content">
                                            <div className="product-rating">
                                                {'★'.repeat(Math.floor(product.rating))}
                                                {'☆'.repeat(5 - Math.floor(product.rating))}
                                                <span className="rating-value">({product.rating})</span>
                                            </div>
                                            <h3>{product.name}</h3>
                                            <p className="product-description">{product.description}</p>
                                            <div className="product-price">
                                                <span className="current-price">₱{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="original-price">₱{product.originalPrice}</span>
                                                )}
                                            </div>
                                            <IonButton expand="block" className="add-to-cart-btn">
                                                <IonIcon icon={cartOutline} slot="start" />
                                                Add to Cart
                                            </IonButton>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8" className="view-all-col">
                        <IonButton routerLink="/all" size="large" fill="outline" className="view-all-btn">
                            View All Products
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </section>
    )
});