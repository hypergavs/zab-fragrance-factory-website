import { useState, useEffect, forwardRef } from 'react';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { IonSkeletonText } from '@ionic/react';
import '../styles/parts/Models.scss';

import femaleModelMin from '../../../assets/images/models/minified/female-model.png';
import femaleModelFull from '../../../assets/images/models/female-model.png';
import maleModelMin from '../../../assets/images/models/minified/male-model.png';
import maleModelFull from '../../../assets/images/models/male-model.png';

interface ModelData {
    minified: string;
    full: string;
    title: string;
    description: string;
    ctaText: string;
    link: string;
    alignment: 'left' | 'right';
}

const models: ModelData[] = [
    {
        minified: femaleModelMin,
        full: femaleModelFull,
        title: "Elegance Redefined",
        description: "Discover fragrances that capture your grace and sophistication. Each scent is crafted to complement your unique beauty.",
        ctaText: "Shop Women's Collection",
        link: "/women",
        alignment: 'right'
    },
    {
        minified: maleModelMin,
        full: maleModelFull,
        title: "Bold & Distinctive",
        description: "Embrace confidence with fragrances that define modern masculinity. Powerful scents for the man who makes an impression.",
        ctaText: "Shop Men's Collection",
        link: "/men",
        alignment: 'left'
    }
];

export const Models = forwardRef<HTMLElement>((props, ref) => {
    const [loadedMinified, setLoadedMinified] = useState<Set<number>>(new Set());
    const [loadedFull, setLoadedFull] = useState<Set<number>>(new Set());

    useEffect(() => {
        // Preload all minified images
        models.forEach((model, index) => {
            const img = new Image();
            img.src = model.minified;
            img.onload = () => {
                setLoadedMinified(prev => new Set(prev).add(index));
                // Start loading full image after minified is loaded
                const fullImg = new Image();
                fullImg.src = model.full;
                fullImg.onload = () => {
                    setLoadedFull(prev => new Set(prev).add(index));
                };
            };
        });
    }, []);

    return (
        <section ref={ref} className="models-section">
            <IonGrid>
                {models.map((model, index) => (
                    <IonRow key={index} className={`model-row ${model.alignment === 'left' ? 'image-left' : 'image-right'}`}>
                        <IonCol size="12" sizeMd="6" className="model-image-col">
                            <div className="model-image-wrapper">
                                {!loadedMinified.has(index) ? (
                                    <IonSkeletonText animated className="model-skeleton" />
                                ) : (
                                    <>
                                        <img
                                            src={loadedFull.has(index) ? model.full : model.minified}
                                            alt={model.title}
                                            className={`model-image ${loadedFull.has(index) ? 'loaded' : 'loading'}`}
                                        />
                                        <div className={`image-fade ${model.alignment === 'left' ? 'fade-right' : 'fade-left'}`}></div>
                                    </>
                                )}
                            </div>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" className="model-content-col">
                            <div className="model-content">
                                <h2>{model.title}</h2>
                                <p>{model.description}</p>
                                <IonButton routerLink={model.link} size="large" className="cta-button">
                                    {model.ctaText}
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                ))}
            </IonGrid>
        </section>
    )
});