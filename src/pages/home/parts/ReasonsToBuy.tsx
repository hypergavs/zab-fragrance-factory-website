import { IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import {
    timeOutline,
    rocketOutline,
    shieldCheckmarkOutline,
    starOutline,
    leafOutline,
    pricetagOutline
} from 'ionicons/icons';
import '../styles/parts/ReasonsToBuy.scss';

interface Reason {
    icon: string;
    title: string;
    description: string;
}

const reasons: Reason[] = [
    {
        icon: timeOutline,
        title: "Long-Lasting Fragrance",
        description: "Premium scents that stay with you all day long"
    },
    {
        icon: rocketOutline,
        title: "Free Delivery Nationwide",
        description: "Fast and free shipping to your doorstep"
    },
    {
        icon: shieldCheckmarkOutline,
        title: "Satisfaction Guarantee",
        description: "100% money-back guarantee on all purchases"
    },
    {
        icon: starOutline,
        title: "Premium Quality",
        description: "Crafted with the finest ingredients"
    },
    {
        icon: pricetagOutline,
        title: "Affordable Luxury",
        description: "High-end fragrances at accessible prices"
    },
    {
        icon: leafOutline,
        title: "Eco-Friendly",
        description: "Sustainably sourced and cruelty-free"
    }
];

export const ReasonsToBuy: React.FC = () => {
    return (
        <section className="reasons-section">
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <div className="section-header">
                            <h2>Why Choose Zab Fragrance Factory</h2>
                            <p>Experience the difference of true craftsmanship</p>
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <IonCol
                            key={index}
                            size="12"
                            sizeSm="6"
                            sizeMd="4"
                            className="reason-col"
                        >
                            <div className="reason-card">
                                <div className="icon-wrapper">
                                    <IonIcon icon={reason.icon} />
                                </div>
                                <h3>{reason.title}</h3>
                                <p>{reason.description}</p>
                            </div>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </section>
    )
}