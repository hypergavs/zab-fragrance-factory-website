import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationRefs {
    jumbotronRef: RefObject<HTMLDivElement | null>;
    categoriesRef: RefObject<HTMLElement | null>;
    productsRef: RefObject<HTMLElement | null>;
    reasonsRef: RefObject<HTMLElement | null>;
    modelsRef: RefObject<HTMLElement | null>;
    footerRef: RefObject<HTMLElement | null>;
}

export const useScrollAnimations = ({
    jumbotronRef,
    categoriesRef,
    productsRef,
    reasonsRef,
    modelsRef,
    footerRef
}: ScrollAnimationRefs) => {
    useEffect(() => {

        // Get IonContent scroll element
        const ionContent = document.querySelector('ion-content');
        let scroller: HTMLElement | null = null;

        const setupAnimations = async () => {
            if (ionContent) {
                scroller = await ionContent.getScrollElement();
            }

            // Configure ScrollTrigger to use IonContent's scroller
            ScrollTrigger.config({
                autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
            });

            if (scroller) {
                ScrollTrigger.defaults({
                    scroller: scroller
                });
            }

            const ctx = gsap.context(() => {


                if (jumbotronRef.current) {
                    gsap.from(jumbotronRef.current, {
                        scrollTrigger: {
                            trigger: jumbotronRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                        opacity: 0,
                        duration: .5,
                        ease: 'power1.in',
                        immediateRender: false,
                    })
                }

                if (categoriesRef.current) {
                    const sectionHeader = categoriesRef.current.querySelector('.section-header h2');
                    const sectionHeaderSub = categoriesRef.current.querySelector('.section-header p');
                    const cards = categoriesRef.current.querySelectorAll('.category-col');

                    // Set initial invisible states BEFORE creating animations
                    gsap.set([sectionHeader, sectionHeaderSub], { opacity: 0 });
                    gsap.set(sectionHeader, { x: -30 });
                    gsap.set(sectionHeaderSub, { y: 20 });
                    gsap.set(cards, { opacity: 0, y: 50 });

                    const categoriesTL = gsap.timeline({
                        scrollTrigger: {
                            trigger: categoriesRef.current,
                            start: 'top 80%',
                            end: 'top 30%',
                            toggleActions: 'play none none none',
                            // markers: true,
                        }
                    });

                    categoriesTL.to(sectionHeader, {
                        opacity: 1,
                        x: 0,
                        duration: .5,
                        ease: 'power1.out',
                    }, 0.3).to(sectionHeaderSub, {
                        opacity: 1,
                        y: 0,
                        duration: .5,
                        ease: 'power1.out',
                    }, 0.5)

                    // Stagger animate cards when full height of first card is visible
                    cards.forEach(card => {
                        gsap.to(card, {
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 100%', // When bottom of first card reaches bottom of viewport
                                toggleActions: 'play none none reverse',
                            },
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power2.inOut',
                        });
                    })
                    
                }

                // Featured Products
                if (productsRef.current) {
                    // Set initial invisible state BEFORE creating animation
                    gsap.set(productsRef.current, { opacity: 0, x: 50 });

                    gsap.to(productsRef.current, {
                        scrollTrigger: {
                            trigger: productsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                            onUpdate: (self) => {
                                console.log('Products animation progress:', self.progress);
                            },
                            onEnter: () => {
                                console.log('Entered products section');
                            }
                        },
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                    });
                }



                // Reasons to Buy
                if (reasonsRef.current) {
                    const cards = reasonsRef.current.querySelectorAll('.reason-card');
                    
                    // Set initial invisible states
                    gsap.set(reasonsRef.current, { opacity: 0, scale: 0.95 });
                    gsap.set(cards, { opacity: 0, scale: 0.8 });

                    gsap.to(reasonsRef.current, {
                        scrollTrigger: {
                            trigger: reasonsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    });

                    // Reason cards
                    if (cards.length > 0) {
                        cards.forEach(card => {
                            gsap.to(card, {
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 85%',
                                    toggleActions: 'play none none none'
                                },
                                opacity: 1,
                                scale: 1,
                                duration: 0.6,
                                ease: 'power2.out'
                            });
                        });
                    }
                }

                // Models
                if (modelsRef.current) {
                    const rows = modelsRef.current.querySelectorAll('.model-row');
                    
                    // Set initial invisible states for section and rows
                    gsap.set(modelsRef.current, { opacity: 0 });
                    
                    // Animate main section first
                    gsap.to(modelsRef.current, {
                        scrollTrigger: {
                            trigger: modelsRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    });

                    // Model rows - animate each with alternating slide direction
                    if (rows.length > 0) {
                        rows.forEach((row, index) => {
                            const fromLeft = index % 2 === 0;
                            
                            // Set initial state based on alternating direction
                            gsap.set(row, { 
                                opacity: 0, 
                                x: fromLeft ? -80 : 80 
                            });
                            
                            gsap.to(row, {
                                scrollTrigger: {
                                    trigger: row,
                                    start: 'top 85%',
                                    toggleActions: 'play none none reverse'
                                },
                                opacity: 1,
                                x: 0,
                                duration: 1,
                                ease: 'power3.inOut'
                            });
                        });
                    }
                }

                // Footer
                if (footerRef.current) {
                    const newsletterText = footerRef.current.querySelector('.newsletter-text');
                    const newsletterForm = footerRef.current.querySelector('.newsletter-form');
                    const footerLinks = footerRef.current.querySelectorAll('.footer-company, .footer-links, .footer-policies');
                    const socialLinks = footerRef.current.querySelectorAll('.social-link');
                    const contactItems = footerRef.current.querySelectorAll('.contact-item');
                    const footerLinksItems = footerRef.current.querySelectorAll('.footer-links ul li, .footer-policies ul li');
                    const bottomBar = footerRef.current.querySelector('.footer-bottom');
                    
                    // Set initial invisible states
                    gsap.set(newsletterText, { opacity: 0, y: 30 });
                    gsap.set(newsletterForm, { opacity: 0, scale: 0.95 });
                    gsap.set(footerLinks, { opacity: 0, y: 20 });
                    gsap.set(socialLinks, { opacity: 0, scale: 0.8 });
                    gsap.set(contactItems, { opacity: 0, x: -20 });
                    gsap.set(footerLinksItems, { opacity: 0, x: -10 });
                    gsap.set(bottomBar, { opacity: 0 });

                    // Animate newsletter text
                    gsap.to(newsletterText, {
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out'
                    });

                    // Animate newsletter form
                    gsap.to(newsletterForm, {
                        scrollTrigger: {
                            trigger: footerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        },
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power2.out'
                    });

                    // Animate footer link sections
                    footerLinks.forEach((section, index) => {
                        gsap.to(section, {
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 90%',
                                toggleActions: 'play none none none'
                            },
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: 'power2.out'
                        });
                    });

                    // Animate contact items
                    contactItems.forEach((item, index) => {
                        gsap.to(item, {
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 90%',
                                toggleActions: 'play none none none'
                            },
                            opacity: 1,
                            x: 0,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: 'power2.out'
                        });
                    });

                    // Animate social links
                    socialLinks.forEach((link, index) => {
                        gsap.to(link, {
                            scrollTrigger: {
                                trigger: link,
                                start: 'top 92%',
                                toggleActions: 'play none none none'
                            },
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: 'back.out(1.7)'
                        });
                    });

                    // Animate footer link items
                    footerLinksItems.forEach((item, index) => {
                        gsap.to(item, {
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 92%',
                                toggleActions: 'play none none none'
                            },
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            delay: (index % 6) * 0.05, // Stagger within each column
                            ease: 'power2.out'
                        });
                    });

                    // Animate bottom bar
                    if (bottomBar) {
                        gsap.to(bottomBar, {
                            scrollTrigger: {
                                trigger: bottomBar,
                                start: 'top 95%',
                                toggleActions: 'play none none none'
                            },
                            opacity: 1,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    }
                }
            });

            // Cleanup function
            return () => {
                ctx.revert();
                ScrollTrigger.defaults({ scroller: window });
            };
        };

        setupAnimations();

    }, [jumbotronRef, categoriesRef, productsRef, reasonsRef, modelsRef, footerRef]);
};
