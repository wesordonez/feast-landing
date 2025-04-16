

const steps = document.querySelectorAll('.step-card');
const content = document.getElementById('step-content');

const stepData = {
    1: {
        title: 'Customer Delivery App',
        subtitle: 'Delicious food, delivered fast, with full control',
        text: `Our intuitive customer app makes ordering easy,
                affordable, and transparent from start to finish.`,
        mainImage: 'du-feast-14.jpg',
        images: [
            { img: 'du-feast-8.jpg', title: 'Live Order Tracking', subtitle: 'Follow your meal from kitchen to doorstep in real time!' },
            { img: 'du-feast-13.jpg', title: 'Smart Reordering', subtitle: 'One-tap reorders of your go-to meals, just when you crave them!' },
            { img: 'du-feast-6.jpg', title: 'No Hidden Fees', subtitle: `Know exactly whgat tour's e paying with upfront, transparent pricing` },
        ]
    },
    2: {
        title: 'Restaurant App',
        subtitle: 'Tools that empower local businesses to grow and streamline',
        text: `Restaurants get a full suite of tools to manage orders, engoge with customers, and track performance`,
        mainImage: 'du-feast-2.jpg',
        images: [
            { img: 'du-feast-10.jpg', title: 'Live Order Tracking', subtitle: 'Follow your meal from kitchen to doorstep in real time!' },
            { img: 'du-feast-4.jpg', title: 'Menu & Promo Control', subtitle: 'Update menus and run promotions needing outside help' },
            { img: 'du-feast-3.jpg', title: 'Sales and Innsight Dashboard', subtitle: 'Get actionalble reports on slaes trends, peak hours, and coustomer preferences' },
        ]
    },
    3: {
        title: 'Courier And Driver App',
        subtitle: 'Built for speed, efficiency, and fairness',
        text: `Our driver app helps you earn more with optimized routes and full transparency every step of the way.`,
        mainImage: 'du-feast-1.jpg',
        images: [
            { img: 'du-feast-9.jpg', title: 'Route Optimization', subtitle: 'Save time(and fuel) with smart delivery routes' },
            { img: 'du-feast-11.jpg', title: 'Instant Payouts', subtitle: 'Get paid quickly with no hidden commissions' },
            { img: 'du-feast-5.jpg', title: 'Earnings Breakdown', subtitle: 'Clear breakdowns of your tips, bonosues, and delivery pay in one tap' },
        ]
    }
};

steps.forEach(card => {
    card.addEventListener('click', () => {
        steps.forEach(c => c.classList.remove('active'));
        // Ejecutar por defecto el primer paso al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            const defaultStep = document.querySelector('.step-card[data-step="1"]');
            if (defaultStep) defaultStep.click();
        });
        card.classList.add('active');

        const step = card.getAttribute('data-step');
        const data = stepData[step];

        // 1. Seleccionás el div original
        const originalDiv = document.getElementById('step-content');

        // 2. Creás el nuevo div
        const newDiv = document.createElement('div');
        newDiv.id = 'step-content';

        newDiv.innerHTML = `
                <div id="step-content" class="select-none grid grid-cols-1 lg:grid-cols-2 gap-5 items-center mt-20">
                    <div class="flex flex-col gap-5">
                        <h2 class="text-3xl md:text-6xl font-mortend-bold text-white uppercase">${data.title}</h2>
                        <p class="text-xl md:text-2xl font-neusa-light text-white">
                            <strong class="font-neusa-bold">${data.subtitle}</strong>.<br>${data.text}
                        </p>
                        <a href="#" class="w-[180px] bg-secondary font-neusa-bold text-white text-xl px-8 py-4 m-2 hover:bg-white hover:text-primary transition-colors rounded-lg text-center">
                            Get Started
                        </a>
                    </div>

                    <!-- Carousel -->
                    <div class="w-full h-full owl-carousel">
                        <!-- Item 1 -->
                        ${data.images.map(img => `
                        <div class="relative rounded-xl overflow-hidden h-[350px]">
                            <div class="absolute bottom-0 w-full h-full bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-0"></div>
                            <img src="${staticBase}${img.img}" class="h-full w-full object-cover" />
                            <div class="absolute bottom-0 w-full text-white p-8 text-start">
                                <h2 class="font-neusa-light">${img.title}</h2>
                                <p class="font-neusa-normal text-lg">${img.subtitle}</p>
                            </div>
                        </div>
                        `).join('')}  

                    </div>
                </div>
                `;
        originalDiv.replaceWith(newDiv);

        // Cambiar la imagen principal
        const mainImage = document.getElementById('main-step-image');
        mainImage.src = staticBase + data.mainImage;


        $(document).ready(function () {
            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: true,


                responsive: {
                    0: { items: 1 },
                    500: { items: 2 },
                    700: { items: 3 },
                    1000: { items: 1 },
                    1300: { items: 2 },
                }
            });
        });
    });
});

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,


        responsive: {
            0: { items: 1 },
            500: { items: 2 },
            700: { items: 3 },
            1000: { items: 1 },
            1300: { items: 2 },
        }
    });
});
