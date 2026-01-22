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
}

export const useScrollAnimations = ({
    jumbotronRef,
    categoriesRef,
    productsRef,
    reasonsRef,
    modelsRef
}: ScrollAnimationRefs) => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            let jumbotronTrigger: ScrollTrigger | undefined;

            // Jumbotron - with scroll trigger
            if (jumbotronRef.current) {
                gsap.from(jumbotronRef.current, {
                    scrollTrigger: {
                        trigger: jumbotronRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1,
                        onUpdate: (self) => {
                            // When jumbotron reaches 90% progress, trigger categories
                            if (self.progress >= 0.9 && categoriesRef.current) {
                                const categoryTrigger = ScrollTrigger.getById('categories-trigger');
                                if (categoryTrigger) {
                                    categoryTrigger.enable();
                                }
                            }
                        }
                    },
                    opacity: 0,
                    y: 30,
                    ease: 'none',
                });
            }

            // Product Categories - initially disabled
            if (categoriesRef.current) {
                gsap.from(categoriesRef.current, {
                    scrollTrigger: {
                        id: 'categories-trigger',
                        trigger: categoriesRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                        toggleActions: 'play none none reverse',
                    },
                    opacity: 0,
                    y: 40,
                    ease: 'none',
                });

                // Category cards
                // const cards = categoriesRef.current.querySelectorAll('.category-card');
                // if (cards.length > 0) {
                //     gsap.from(cards, {
                //         scrollTrigger: {
                //             trigger: categoriesRef.current,
                //             start: 'top 60%',
                //             end: 'top 50%',
                //             toggleActions: 'play none none reverse'
                //         },
                //         opacity: 0,
                //         y: 40,
                //         stagger: 0.15,
                //         ease: 'none'
                //     });
                // }
            }

            // // Featured Products
            // if (productsRef.current) {
            //     gsap.from(productsRef.current, {
            //         scrollTrigger: {
            //             trigger: productsRef.current,
            //             start: 'top 80%',
            //             end: 'top 50%',
            //             scrub: 1,
            //             toggleActions: 'play none none reverse'
            //         },
            //         opacity: 0,
            //         x: 50,
            //         ease: 'none'
            //     });
            // }

            // // Reasons to Buy
            // if (reasonsRef.current) {
            //     gsap.from(reasonsRef.current, {
            //         scrollTrigger: {
            //             trigger: reasonsRef.current,
            //             start: 'top 80%',
            //             end: 'top 50%',
            //             scrub: 1,
            //             toggleActions: 'play none none reverse'
            //         },
            //         opacity: 0,
            //         scale: 0.95,
            //         ease: 'none'
            //     });

            //     // Reason cards
            //     const cards = reasonsRef.current.querySelectorAll('.reason-card');
            //     if (cards.length > 0) {
            //         gsap.from(cards, {
            //             scrollTrigger: {
            //                 trigger: reasonsRef.current,
            //                 start: 'top 75%',
            //                 end: 'top 45%',
            //                 scrub: 1,
            //                 toggleActions: 'play none none reverse'
            //             },
            //             opacity: 0,
            //             scale: 0.8,
            //             stagger: 0.1,
            //             ease: 'none'
            //         });
            //     }
            // }

            // // Models
            // if (modelsRef.current) {
            //     gsap.from(modelsRef.current, {
            //         scrollTrigger: {
            //             trigger: modelsRef.current,
            //             start: 'top 80%',
            //             end: 'top 50%',
            //             scrub: 1,
            //             toggleActions: 'play none none reverse'
            //         },
            //         opacity: 0,
            //         y: 50,
            //         ease: 'none'
            //     });

            //     // Model rows
            //     const rows = modelsRef.current.querySelectorAll('.model-row');
            //     if (rows.length > 0) {
            //         gsap.from(rows, {
            //             scrollTrigger: {
            //                 trigger: modelsRef.current,
            //                 start: 'top 75%',
            //                 end: 'top 45%',
            //                 scrub: 1,
            //                 toggleActions: 'play none none reverse'
            //             },
            //             opacity: 0,
            //             x: (index) => (index % 2 === 0 ? -50 : 50),
            //             stagger: 0.3,
            //             ease: 'none'
            //         });
            //     }
            // }
        });

        // Cleanup function
        return () => {
            ctx.revert();
        };
    }, [jumbotronRef, categoriesRef, productsRef, reasonsRef, modelsRef]);
};
