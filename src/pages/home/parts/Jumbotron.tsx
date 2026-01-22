import { useState, useEffect, forwardRef } from 'react';
import { IonSkeletonText } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/parts/Jumbotron.scss';

// Import minified images as placeholders
import img8394Min from '../../../assets/images/jumbotron/minified/IMG_8394.jpg';
import img8395Min from '../../../assets/images/jumbotron/minified/IMG_8395.jpg';
import img8397Min from '../../../assets/images/jumbotron/minified/IMG_8397.jpg';
import img8398Min from '../../../assets/images/jumbotron/minified/IMG_8398.jpg';
import img8399Min from '../../../assets/images/jumbotron/minified/IMG_8399.jpg';
import img8400Min from '../../../assets/images/jumbotron/minified/IMG_8400.jpg';
import img8401Min from '../../../assets/images/jumbotron/minified/IMG_8401.jpg';
import img8402Min from '../../../assets/images/jumbotron/minified/IMG_8402.jpg';
import img8404Min from '../../../assets/images/jumbotron/minified/IMG_8404.jpg';
import img8405Min from '../../../assets/images/jumbotron/minified/IMG_8405.jpg';

// Full-size images for lazy loading
import img8394Full from '../../../assets/images/jumbotron/IMG_8394.jpg';
import img8395Full from '../../../assets/images/jumbotron/IMG_8395.jpg';
import img8397Full from '../../../assets/images/jumbotron/IMG_8397.jpg';
import img8398Full from '../../../assets/images/jumbotron/IMG_8398.jpg';
import img8399Full from '../../../assets/images/jumbotron/IMG_8399.jpg';
import img8400Full from '../../../assets/images/jumbotron/IMG_8400.jpg';
import img8401Full from '../../../assets/images/jumbotron/IMG_8401.jpg';
import img8402Full from '../../../assets/images/jumbotron/IMG_8402.jpg';
import img8404Full from '../../../assets/images/jumbotron/IMG_8404.jpg';
import img8405Full from '../../../assets/images/jumbotron/IMG_8405.jpg';

const images = [
    { full: img8394Full, placeholder: img8394Min },
    { full: img8395Full, placeholder: img8395Min },
    { full: img8397Full, placeholder: img8397Min },
    { full: img8398Full, placeholder: img8398Min },
    { full: img8399Full, placeholder: img8399Min },
    { full: img8400Full, placeholder: img8400Min },
    { full: img8401Full, placeholder: img8401Min },
    { full: img8402Full, placeholder: img8402Min },
    { full: img8404Full, placeholder: img8404Min },
    { full: img8405Full, placeholder: img8405Min },
];

export const Jumbotron = forwardRef<HTMLDivElement>((props, ref) => {
    const [loadedMinified, setLoadedMinified] = useState<Set<number>>(new Set());
    const [loadedFull, setLoadedFull] = useState<Set<number>>(new Set());
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [allMinifiedLoaded, setAllMinifiedLoaded] = useState(false);

    const loadMinifiedImage = (index: number) => {
        if (loadedMinified.has(index)) return;

        const img = new Image();
        img.src = images[index].placeholder;
        img.onload = () => {
            setLoadedMinified(prev => new Set(prev).add(index));
        };
    };

    const loadFullImage = (index: number) => {
        if (loadedFull.has(index)) return;

        // Preload the full image
        const img = new Image();
        img.src = images[index].full;
        img.onload = () => {
            setLoadedFull(prev => new Set(prev).add(index));
        };
    };

    const handleSlideChange = (swiper: SwiperType) => {
        const currentIndex = swiper.realIndex;
        // Load minified and full for current, next, and previous slides
        [currentIndex, (currentIndex + 1) % images.length, (currentIndex - 1 + images.length) % images.length].forEach(idx => {
            loadMinifiedImage(idx);
            loadFullImage(idx);
        });
    };

    useEffect(() => {
        // Load all minified images
        images.forEach((_, index) => {
            loadMinifiedImage(index);
        });
    }, []);

    useEffect(() => {
        // Check if all minified images are loaded
        if (loadedMinified.size === images.length && !allMinifiedLoaded) {
            setAllMinifiedLoaded(true);
            // Start autoplay when all minified images are loaded
            if (swiperInstance && swiperInstance.autoplay) {
                swiperInstance.autoplay.start();
            }
            // Start loading full images
            loadFullImage(0);
            loadFullImage(1);
        }
    }, [loadedMinified, allMinifiedLoaded, swiperInstance]);

    return (
        <div ref={ref} className="jumbotron-container">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={allMinifiedLoaded ? {
                    delay: 5000,
                    disableOnInteraction: false,
                } : false}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                allowTouchMove={allMinifiedLoaded}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    if (allMinifiedLoaded) {
                        handleSlideChange(swiper);
                    }
                }}
                className="jumbotron-swiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide-content">
                            {!loadedMinified.has(index) ? (
                                <IonSkeletonText animated className="image-skeleton" />
                            ) : (
                                <img
                                    src={loadedFull.has(index) ? image.full : image.placeholder}
                                    alt={`Fragrance ${index + 1}`}
                                    className={loadedFull.has(index) ? 'loaded' : 'loading'}
                                />
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="jumbotron-tagline">
                <h1>Crafting Moments in Fragrance</h1>
                <p>Where every scent tells your story</p>
            </div>
        </div>
    );
});