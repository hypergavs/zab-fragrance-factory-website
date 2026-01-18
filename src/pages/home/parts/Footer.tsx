import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonInput } from '@ionic/react';
import {
    logoFacebook,
    logoInstagram,
    logoTiktok,
    logoTwitter,
    mailOutline,
    callOutline,
    locationOutline,
    arrowForward,
    cardOutline,
    walletOutline,
    cashOutline
} from 'ionicons/icons';
import '../styles/parts/Footer.scss';
import { useState } from 'react';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Shop',
        links: [
            { label: 'Perfumes', href: '/category/perfume' },
            { label: 'Diffusers', href: '/category/diffuser' },
            { label: 'Scented Alcohol', href: '/category/scented-alcohol' },
            { label: 'Best Sellers', href: '/best-sellers' },
            { label: 'New Arrivals', href: '/new-arrivals' }
        ]
    },
    {
        title: 'Customer Service',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Shipping & Delivery', href: '/shipping' },
            { label: 'Returns & Exchanges', href: '/returns' },
            { label: 'Track Order', href: '/track-order' }
        ]
    },
    {
        title: 'About Us',
        links: [
            { label: 'Our Story', href: '/about' },
            { label: 'Sustainability', href: '/sustainability' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' }
        ]
    }
];

const socialLinks = [
    { icon: logoFacebook, href: 'https://facebook.com/zabfragrancefactory', label: 'Facebook' },
    { icon: logoInstagram, href: 'https://instagram.com/zabfragrancefactory', label: 'Instagram' },
    { icon: logoTiktok, href: 'https://tiktok.com/@zabfragrancefactory', label: 'TikTok' },
    { icon: logoTwitter, href: 'https://twitter.com/zabfragrance', label: 'Twitter' }
];

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            <div className="footer-newsletter">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                            <div className="newsletter-content">
                                <div className="newsletter-text">
                                    <h3>Stay in the Scent</h3>
                                    <p>Subscribe to get exclusive offers, fragrance tips, and early access to new launches</p>
                                </div>
                                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                                    <div className="input-wrapper">
                                        <IonIcon icon={mailOutline} className="input-icon" />
                                        <IonInput
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onIonInput={(e) => setEmail(e.detail.value!)}
                                            required
                                            className="newsletter-input"
                                        />
                                    </div>
                                    <IonButton type="submit" className="subscribe-btn">
                                        Subscribe
                                        <IonIcon icon={arrowForward} slot="end" />
                                    </IonButton>
                                </form>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                            <IonRow>
                                {/* Company Info */}
                                <IonCol size="12" sizeMd="6" sizeLg="4">
                                    <div className="footer-company">
                                        <h2 className="footer-logo">Zab Fragrance Factory</h2>
                                        <p className="company-description">
                                            Crafting premium fragrances that tell your story. Quality, affordability, and elegance in every bottle.
                                        </p>
                                        <div className="contact-info">
                                            <div className="contact-item">
                                                <IonIcon icon={callOutline} />
                                                <span>+63 123 456 7890</span>
                                            </div>
                                            <div className="contact-item">
                                                <IonIcon icon={mailOutline} />
                                                <span>hello@zabfragrance.com</span>
                                            </div>
                                            <div className="contact-item">
                                                <IonIcon icon={locationOutline} />
                                                <span>Philippines</span>
                                            </div>
                                        </div>
                                        {/* Social Media */}
                                        <div className="social-links">
                                            {socialLinks.map((social) => (
                                                <a
                                                    key={social.label}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={social.label}
                                                    className="social-link"
                                                >
                                                    <IonIcon icon={social.icon} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </IonCol>

                                {/* Footer Links */}
                                {footerSections.map((section) => (
                                    <IonCol
                                        key={section.title}
                                        size="6"
                                        sizeSm="4"
                                        sizeMd="3"
                                        sizeLg="2.66"
                                    >
                                        <div className="footer-section">
                                            <h4>{section.title}</h4>
                                            <ul>
                                                {section.links.map((link) => (
                                                    <li key={link.label}>
                                                        <a href={link.href}>{link.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>

            {/* Payment & Copyright */}
            <div className="footer-bottom">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeSm="11" sizeMd="10" sizeLg="8">
                            <div className="footer-bottom-content">
                                <div className="footer-social-links">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="footer-social-link"
                                        >
                                            <IonIcon icon={social.icon} />
                                        </a>
                                    ))}
                                </div>
                                <div className="copyright">
                                    <p>&copy; {new Date().getFullYear()} Zab Fragrance Factory. All rights reserved.</p>
                                    <div className="legal-links">
                                        <a href="/privacy-policy">Privacy Policy</a>
                                        <span className="separator">|</span>
                                        <a href="/terms-of-service">Terms of Service</a>
                                    </div>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </footer>
    );
}