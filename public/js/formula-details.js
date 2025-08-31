// Gestion de la galerie d'images
document.addEventListener('DOMContentLoaded', async function() {
    // Récupérer l'ID et le type de la formule depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const formulaId = urlParams.get('id');
    const tripType = urlParams.get('type');

    if (!formulaId) {
        showNotification('Aucune formule sélectionnée', 'error');
        window.location.href = '/';
        return;
    }

    try {
        // Charger les données de la formule
        const response = await fetch(`/api/formulas/${formulaId}`);
        if (!response.ok) {
            throw new Error('Formule non trouvée');
        }
        const formula = await response.json();

        // Mettre à jour le contenu de la page
        updatePageContent(formula);
    } catch (error) {
        showNotification('Erreur lors du chargement de la formule', 'error');
        console.error('Erreur:', error);
    }
});

// Variable globale pour stocker la formule
let currentFormula = null;

// Fonction pour mettre à jour le contenu de la page
function updatePageContent(formula) {
    // Mise à jour du titre de la page
    document.title = `${formula.name} - SIRA VOYAGE`;

    // Mise à jour de la galerie d'images
    updateGallery(formula.images);

    // Mise à jour des informations de vol
    updateFlightInfo(formula.flights);

    // Mise à jour des informations d'hébergement
    updateAccommodationInfo(formula.accommodation);

    // Mise à jour du programme
    loadProgramData(formula.id);

    // Mise à jour du panneau d'information
    updateInfoPanel(formula);

    // Mise à jour des détails supplémentaires
    updateAdditionalDetails(formula.details);
}

// Fonction pour mettre à jour la galerie d'images
function updateGallery(images) {
    console.log('Images reçues:', images);
    
    // Initialiser le swiper principal
    const mainSwiper = new Swiper('.gallery-main', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: images.length > 1, // Activer le loop seulement s'il y a plus d'une image
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets'
        }
    });

    // Mise à jour des images principales
    const mainContainer = document.querySelector('.gallery-main .swiper-wrapper');
    if (mainContainer && Array.isArray(images)) {
        mainContainer.innerHTML = images.map((image) => `
            <div class="swiper-slide">
                <div class="w-full h-full flex items-center justify-center">
                    <img src="${image.full || image}" 
                         alt="${image.alt || 'Image de la formule'}" 
                         class="w-full h-full object-cover"
                         loading="lazy">
                </div>
            </div>
        `).join('');
    }

    // Mettre à jour le swiper
    mainSwiper.update();
}

// Fonction pour mettre à jour les informations de vol
function updateFlightInfo(flights) {
    console.log('Données des vols reçues:', flights);
    
    const swiperWrapper = document.querySelector('.flights-swiper .swiper-wrapper');
    if (!swiperWrapper) {
        console.error('Conteneur des vols non trouvé');
        return;
    }

    // Vérifier si flights contient departure et return
    if (!flights.departure || !flights.return) {
        console.warn('Format de données de vol incorrect');
        return;
    }

    // Créer un tableau avec seulement l'aller et le retour
    const allFlights = [
        {
            ...flights.departure,
            type: 'Départ',
            image: flights.departure.flightImage
        },
        {
            ...flights.return,
            type: 'Retour',
            image: flights.return.flightImage
        }
    ];

    // Créer les slides pour chaque vol (aller et retour uniquement)
    const slidesHTML = allFlights.map((flight, index) => `
        <div class="swiper-slide">
            <div class="bg-white rounded-lg p-6 shadow-sm">
                <div class="flex items-center w-full justify-center mb-4">
                    <span class="font-semibold text-base text-[#0F5132]">${flight.airlineLogo}</span>
                </div>
                <div class="aspect-w-16 aspect-h-9 mb-6 relative overflow-hidden rounded-lg">
                    <img src="${flight.image}" 
                         alt="Vol ${flight.type}" 
                         class="absolute inset-0 w-full h-full object-cover"
                         style="aspect-ratio: 16/9;">
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-center flex-1">
                        <div class="text-sm font-semibold">${flight.type}</div>
                        <div class="flex items-center justify-center mt-2 text-sm">
                            <i class="far fa-calendar text-gray-400 mr-2"></i>
                            <span>${formatFlightDate(flight.date)} — Départ: ${flight.departureTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Mettre à jour le contenu du swiper
    swiperWrapper.innerHTML = slidesHTML;

    // Initialiser ou mettre à jour le Swiper
    if (!window.flightsSwiper) {
        window.flightsSwiper = new Swiper('.flights-swiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.flights-swiper .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1280: {
                    slidesPerView: 2
                }
            }
        });
        console.log('Swiper des vols initialisé');
    } else {
        window.flightsSwiper.update();
        window.flightsSwiper.autoplay.start();
        console.log('Swiper des vols mis à jour');
    }
}

// Fonction pour formater la date des vols
function formatFlightDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: 'long'
    }).format(date);
}

// Fonction pour mettre à jour les informations d'hébergement
function updateAccommodationInfo(accommodation) {
    const { medina, makkah } = accommodation;

    // Mise à jour de l'onglet Médine
    updateAccommodationTab('medina', medina);

    // Mise à jour de l'onglet Makkah
    updateAccommodationTab('makkah', makkah);

    // Met à jour dynamiquement le nom des boutons d'onglet
    const medinaBtn = document.querySelector('button[data-tab="medina"]');
    const makkahBtn = document.querySelector('button[data-tab="makkah"]');
    if (medinaBtn && accommodation.medina && accommodation.medina.name) {
        medinaBtn.textContent = accommodation.medina.name;
    }
    if (makkahBtn && accommodation.makkah && accommodation.makkah.name) {
        makkahBtn.textContent = accommodation.makkah.name;
    }
}

// Fonction pour mettre à jour un onglet d'hébergement
function updateAccommodationTab(city, hotel) {
    const tab = document.getElementById(`${city}-tab`);
    if (!tab) return;

    // Mise à jour des images de la galerie
    const gallery = tab.querySelector('.swiper-wrapper');
    if (gallery) {
        // Générer 3 images aléatoires pour l'hôtel
        const randomImages = getRandomImages(3);
        gallery.innerHTML = randomImages.map(image => `
            <div class="swiper-slide">
                <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img src="${image}" alt="${hotel.name}" class="w-full h-full object-cover">
                </div>
            </div>
        `).join('');
    }

    // Mise à jour des informations de l'hôtel
    const hotelInfo = tab.querySelector('.bg-white.rounded-lg.p-6');
    if (hotelInfo) {
        const stars = Array(hotel.rating).fill('<i class="fas fa-star"></i>').join('');
        const reviews = hotel.reviews;
        hotelInfo.innerHTML = `
            <div class="relative pb-6 border-b border-gray-200">
                <div class="flex items-center flex-wrap gap-2 mb-4">
                    <span class="text-xl font-bold text-gray-800">${hotel.name}</span>
                    <span class="flex text-[#D4AF37] ml-2">${stars}</span>
                    <span class="text-gray-600 ml-2">${reviews} avis</span>
                    <span class="text-gray-400 mx-2">·</span>
                    <span class="text-gray-800">Distance : ${hotel.distance}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 md:gap-6">
                <div class="flex flex-col">
                    <div class="flex items-center mb-4">
                        <i class="far fa-calendar text-[#D4AF37] mr-3 text-xl"></i>
                        <div>
                            <div class="text-gray-800">Check-in</div>
                            <div>${formatDate(hotel.checkIn)}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-moon text-[#D4AF37] mr-3 text-xl"></i>
                        <div>
                            <div class="text-gray-800">Durée du séjour</div>
                            <div>${hotel.nights} nuitées</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center mb-4">
                        <i class="far fa-calendar text-[#D4AF37] mr-3 text-xl"></i>
                        <div>
                            <div class="text-gray-800">Check-out</div>
                            <div>${formatDate(hotel.checkOut)}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-utensils text-[#D4AF37] mr-3 text-xl"></i>
                        <div>
                            <div class="text-gray-800">Pension</div>
                            <div>${hotel.mealPlan}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialiser Swiper pour la galerie
    initializeSwiper(`#${city}-gallery`);
}

// Fonction pour générer le rating en étoiles
function generateStarRating(rating) {
    return Array(rating).fill('<i class="fas fa-star"></i>').join('');
}

// Fonction pour obtenir des images aléatoires
function getRandomImages(count) {
    const images = [
        '/images/voco-makkah-8781928380-3x2.jpeg',
        '/images/voco-makkah-8803036266-3x2.png',
        '/images/triple-classic-room.jpg',
        '/images/428224150.jpg',
        '/images/429894311.jpg',
        '/images/429894315.jpg',
        '/images/506323412.jpg'
    ];
    
    // Mélanger le tableau d'images
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    
    // Retourner le nombre d'images demandé
    return shuffledImages.slice(0, count);
}

// Fonction pour initialiser Swiper
function initializeSwiper(selector) {
    new Swiper(selector, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: `${selector} .swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: `${selector} .swiper-button-next`,
            prevEl: `${selector} .swiper-button-prev`,
        },
    });
}

// Fonction pour obtenir des images aléatoires pour le programme
function getRandomProgramImages(count) {
    const images = [
        '/images/visite1.jpg',
        '/images/section3-3.jpg',
        '/images/medina3.jpg',
        '/images/medina-1024x683.jpg',
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.jpg',
        '/images/5.jpg',
        '/images/6.jpg'
    ];
    
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    return shuffledImages.slice(0, count);
}

// Fonction pour charger les données du programme
async function loadProgramData(formulaId) {
    try {
        console.log('=== Début du chargement du programme ===');
        console.log('ID de la formule:', formulaId);
        
        if (!formulaId) {
            console.error('Aucun ID de formule fourni');
            throw new Error('ID de formule manquant');
        }

        // Récupérer les données de la formule
        const response = await fetch(`/api/formulas/${formulaId}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const formula = await response.json();
        
        if (!formula.program || !Array.isArray(formula.program)) {
            console.error('Données du programme manquantes ou invalides:', formula);
            throw new Error('Données du programme invalides');
        }

        console.log('Données du programme reçues:', formula.program);
        console.log('Nombre de jours dans le programme:', formula.program.length);
        
        updateProgramSection(formula.program);
        console.log('=== Programme chargé avec succès ===');
    } catch (error) {
        console.error('=== Erreur lors du chargement du programme ===');
        console.error('Type d\'erreur:', error.name);
        console.error('Message d\'erreur:', error.message);
        console.error('Stack trace:', error.stack);
        
        const container = document.getElementById('program-container');
        if (container) {
            container.innerHTML = `
                <div class="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                    <p class="font-semibold">Une erreur est survenue lors du chargement du programme.</p>
                    <p class="text-sm mt-2">Détails: ${error.message}</p>
                    <p class="text-xs mt-2">Veuillez réessayer plus tard ou contacter le support.</p>
                </div>
            `;
        } else {
            console.error('Le conteneur du programme n\'a pas été trouvé dans le DOM');
        }
    }
}

// Fonction pour mettre à jour la section programme
function updateProgramSection(programData) {
    console.log('=== Début de la mise à jour de la section programme ===');
    
    const container = document.getElementById('program-container');
    if (!container) {
        console.error('Le conteneur du programme n\'a pas été trouvé');
        return;
    }

    try {
        container.innerHTML = programData.map((day, index) => {
            const randomImage = getRandomProgramImages(1)[0];
            
            return `
                <div class="program-item">
                    <div class="program-header" data-program="day${index + 1}">
                        <div class="program-date">
                            <span class="program-month">${day.month}</span>
                            <span class="program-day">${day.day}</span>
                        </div>
                        <h3 class="program-title">${day.title}</h3>
                        <i class="fas fa-chevron-down program-arrow"></i>
                    </div>
                    <div class="program-content" id="day${index + 1}">
                        <div class="program-details">
                            <div>
                                <div class="program-itinerary">${day.title}</div>
                                <p class="program-description">${day.description}</p>
                            </div>
                            <div class="program-image-container">
                                <img src="${randomImage}" alt="${day.title}" class="program-image">
                                <div class="program-duration">
                                    <i class="fas fa-clock"></i>
                                    <span>${day.duration || 'Journée complète'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        initializeProgramAccordions();
    } catch (error) {
        console.error('Erreur lors de la génération du HTML:', error);
        throw error;
    }
}

// Fonction pour initialiser les accordéons du programme
function initializeProgramAccordions() {
    const programHeaders = document.querySelectorAll('.program-header');
    
    programHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.program-arrow');
            
            // Fermer tous les autres accordéons
            document.querySelectorAll('.program-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle l'accordéon actuel
            content.classList.toggle('active');
            arrow.classList.toggle('active');
        });
    });

    // Ouvrir le premier accordéon par défaut
    const firstHeader = programHeaders[0];
    if (firstHeader) {
        const firstContent = firstHeader.nextElementSibling;
        const firstArrow = firstHeader.querySelector('.program-arrow');
        firstContent.classList.add('active');
        firstArrow.classList.add('active');
    }
}

// Fonction pour mettre à jour les détails supplémentaires
function updateAdditionalDetails(details) {
    const container = document.querySelector('.details-container');
    if (!container) return;

    container.innerHTML = details.map((detail, index) => `
        <div class="bg-white rounded-lg shadow-sm">
            <div class="flex items-center justify-between p-6 cursor-pointer" onclick="toggleAccordion('detail${index}')">
                <div class="flex items-center">
                    <i class="fas ${detail.icon} w-6 text-[#D4AF37] mr-4"></i>
                    <h3 class="text-lg font-semibold text-gray-800">${detail.title}</h3>
                </div>
                <i class="fas fa-chevron-down text-gray-500 transition-transform duration-300" id="detail${index}-icon"></i>
            </div>
            <div class="hidden px-6 pb-6" id="detail${index}-content">
                <p class="text-gray-600">${detail.content}</p>
            </div>
        </div>
    `).join('');
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fonction pour formater les dates
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction pour mettre à jour le panneau d'information
function updateInfoPanel(formula) {
    // Mise à jour des informations principales
    const infoElements = {
        'type-voyage': formula.tripType || 'N/A',
        'ville-depart': formula.departureCity || 'N/A',
        'date-depart': formatDate(formula.departureDate),
        'date-retour': formatDate(formula.returnDate),
        'formule': formula.formula || 'N/A',
        'duree': `${formula.duration || 0} jours`,
        'nuits-medina': `${formula.medinaNights || 0} nuits`,
        'nuits-makkah': `${formula.makkahNights || 0} nuits`,
        'hotel-medina': formula.medinaHotel || 'N/A',
        'hotel-makkah': formula.makkahHotel || 'N/A'
    };

    // Mise à jour des éléments avec les attributs data-info
    Object.entries(infoElements).forEach(([key, value]) => {
        const element = document.querySelector(`[data-info="${key}"]`);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Élément non trouvé pour la clé: ${key}`);
        }
    });

    // Mise à jour du prix
    const priceElement = document.querySelector('.text-3xl.font-bold');
    if (priceElement) {
        priceElement.textContent = `${formatPrice(formula.price)}`;
    } else {
        console.warn('Élément de prix non trouvé');
    }

    // Mise à jour des tarifs d'hébergement
    const ratesTable = document.querySelector('.rates-table');
    if (ratesTable) {
        const ratesContent = `
            <div class="rates-table-header">Tarifs par personne</div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Individuelle</span>
                <span class="rates-table-cell price">${formatPrice(formula.price)}</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Double</span>
                <span class="rates-table-cell price">${formatPrice(formula.price * 0.85)}</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Triple</span>
                <span class="rates-table-cell price">${formatPrice(formula.price * 0.80)}</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Quadruple</span>
                <span class="rates-table-cell price">${formatPrice(formula.price * 0.75)}</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Bébé</span>
                <span class="rates-table-cell price">${formatPrice(350)}</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Réduction enfant</span>
                <span class="rates-table-cell price">-150 €</span>
            </div>
        `;
        ratesTable.innerHTML = ratesContent;
    } else {
        console.warn('Tableau des tarifs non trouvé');
    }

    // Mise à jour des images de la galerie
    const galleryMain = document.querySelector('.gallery-main .swiper-wrapper');
    if (galleryMain && Array.isArray(formula.images)) {
        galleryMain.innerHTML = formula.images.map((image) => `
            <div class="swiper-slide">
                <img src="${image.full}" alt="${image.alt || 'Image de la formule'}" class="w-full h-full object-cover">
            </div>
        `).join('');
    }

    // Mise à jour du logo de la compagnie aérienne
    const airlineLogo = document.getElementById('airline-logo');
    if (airlineLogo && formula.airline && formula.airline.logo) {
        airlineLogo.src = formula.airline.logo;
    }
}

// Supprimer la fonction loadFlights car les données sont déjà dans formula.flights
async function loadFormulaDetails() {
    try {
        const { id, type } = getUrlParams();
        const response = await fetch(`/api/formulas/${id}`);
        const formula = await response.json();
        updateFormulaDetails(formula);
        // Les vols sont déjà dans formula.flights, pas besoin de les charger séparément
        updateFlightInfo(formula.flights);
    } catch (error) {
        console.error('Erreur lors du chargement des détails de la formule:', error);
    }
}

// Charger les détails de la formule au chargement de la page
document.addEventListener('DOMContentLoaded', loadFormulaDetails);

// Gestion des onglets d'hébergement
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Mettre à jour les styles des boutons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Afficher le contenu correspondant
        const tabId = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
});

// Gestion des accordéons du programme
document.querySelectorAll('.program-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.program-arrow');
        
        content.classList.toggle('active');
        arrow.classList.toggle('active');
    });
});

// Gestion des accordéons des détails
document.querySelectorAll('.details-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.details-arrow');
        
        content.classList.toggle('active');
        arrow.classList.toggle('active');
    });
});

// Appeler la fonction de chargement du programme lors de l'initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Récupérer l'ID de la formule depuis l'URL ou un attribut data
    const formulaId = new URLSearchParams(window.location.search).get('id');
    if (formulaId) {
        loadProgramData(formulaId);
    }
});

// Fonction pour obtenir les paramètres de l'URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        type: params.get('type')
    };
}

// Fonction pour mettre à jour les informations de la formule
function updateFormulaDetails(formula) {
    console.log('Données de la formule reçues:', formula);
    
    // Mise à jour des informations de base
    const infoElements = {
        'type-voyage': formula.tripType || 'N/A',
        'ville-depart': formula.departureCity || 'N/A',
        'date-depart': formatDate(formula.departureDate),
        'date-retour': formatDate(formula.returnDate),
        'formule': formula.formula || 'N/A',
        'duree': `${formula.duration || 0} jours`,
        'nuits-medina': `${formula.medinaNights || 0} nuits`,
        'nuits-makkah': `${formula.makkahNights || 0} nuits`,
        'hotel-medina': formula.medinaHotel || 'N/A',
        'hotel-makkah': formula.makkahHotel || 'N/A'
    };

    // Mise à jour des éléments avec les attributs data-info
    Object.entries(infoElements).forEach(([key, value]) => {
        const element = document.querySelector(`[data-info="${key}"]`);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Élément non trouvé pour la clé: ${key}`);
        }
    });

    // Mise à jour du prix principal
    const priceElement = document.getElementById('formula-price');
    if (priceElement) {
        priceElement.textContent = `${(formula.price || 0)} FCFA`;
    }

    // Mise à jour des tarifs
    const ratesTable = document.querySelector('#rates .space-y-2');
    if (ratesTable) {
        const ratesContent = `
            <div class="rates-table-row">
                <span class="rates-table-cell">Individuelle</span>
                <span class="rates-table-cell price">${(formula.price || 0).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Double</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.85).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Triple</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.80).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Quadruple</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.75).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Bébé</span>
                <span class="rates-table-cell price">350.00 €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Réduction enfant</span>
                <span class="rates-table-cell price">-150.00 €</span>
            </div>
        `;
        ratesTable.innerHTML = ratesContent;
    }

    // Mise à jour des images de la galerie
    const galleryMain = document.querySelector('.gallery-main .swiper-wrapper');
    if (galleryMain && Array.isArray(formula.images)) {
        galleryMain.innerHTML = formula.images.map((image) => `
            <div class="swiper-slide">
                <img src="${image.full}" alt="${image.alt || 'Image de la formule'}" class="w-full h-full object-cover">
            </div>
        `).join('');
    }

    // Mise à jour du logo de la compagnie aérienne
    const airlineLogo = document.getElementById('airline-logo');
    if (airlineLogo && formula.airline && formula.airline.logo) {
        airlineLogo.src = formula.airline.logo;
    }
}

// Initialisation de Swiper pour les galeries d'hôtels
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des galeries d'hôtels
    const hotelGalleries = {
        medina: new Swiper('#medina-gallery', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '#medina-gallery .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#medina-gallery .swiper-button-next',
                prevEl: '#medina-gallery .swiper-button-prev',
            },
        }),
        makkah: new Swiper('#makkah-gallery', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '#makkah-gallery .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '#makkah-gallery .swiper-button-next',
                prevEl: '#makkah-gallery .swiper-button-prev',
            },
        })
    };

    // Gestion des onglets
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');
            
            // Masquer tous les contenus
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Afficher le contenu correspondant
            const targetId = `${tab.dataset.tab}-tab`;
            document.getElementById(targetId).classList.remove('hidden');

            // Réinitialiser le swiper correspondant
            if (hotelGalleries[tab.dataset.tab]) {
                hotelGalleries[tab.dataset.tab].update();
                hotelGalleries[tab.dataset.tab].autoplay.start();
            }
        });
    });

    // Activer le premier onglet par défaut
    if (tabs.length > 0) {
        tabs[0].click();
    }
});

// Gestion des accordéons du programme
document.addEventListener('DOMContentLoaded', function() {
    const programHeaders = document.querySelectorAll('.program-header');
    let activeContent = null;
    let activeArrow = null;

    programHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const programId = header.getAttribute('data-program');
            const content = document.getElementById(programId);
            const arrow = header.querySelector('.program-arrow');

            // Si on clique sur l'accordéon déjà ouvert, on le ferme
            if (content === activeContent) {
                content.classList.remove('active');
                arrow.classList.remove('active');
                activeContent = null;
                activeArrow = null;
                return;
            }

            // Fermer l'accordéon actif
            if (activeContent) {
                activeContent.classList.remove('active');
                activeArrow.classList.remove('active');
            }

            // Ouvrir le nouvel accordéon
            content.classList.add('active');
            arrow.classList.add('active');
            activeContent = content;
            activeArrow = arrow;
        });
    });

    // Ouvrir le premier accordéon par défaut
    if (programHeaders.length > 0) {
        programHeaders[0].click();
    }
});

// Gestion des accordéons de la section Plus de détails et des tarifs
document.addEventListener('DOMContentLoaded', function() {
    const detailsHeaders = document.querySelectorAll('.details-header');
    let activeContent = null;
    let activeArrow = null;

    detailsHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const detailsId = header.getAttribute('data-details');
            const content = document.getElementById(detailsId);
            const arrow = header.querySelector('.details-arrow');

            // Si on clique sur l'accordéon déjà ouvert, on le ferme
            if (content === activeContent) {
                content.classList.remove('active');
                arrow.classList.remove('active');
                activeContent = null;
                activeArrow = null;
                return;
            }

            // Fermer l'accordéon actif
            if (activeContent) {
                activeContent.classList.remove('active');
                activeArrow.classList.remove('active');
            }

            // Ouvrir le nouvel accordéon
            content.classList.add('active');
            arrow.classList.add('active');
            activeContent = content;
            activeArrow = arrow;
        });
    });

    // Ouvrir le premier accordéon par défaut
    if (detailsHeaders.length > 0) {
        detailsHeaders[0].click();
    }
});

// Initialisation des Swipers
const galleryMainSwiper = new Swiper('.gallery-main', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const flightsSwiper = new Swiper('.flights-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const medinaGallerySwiper = new Swiper('#medina-gallery', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const makkahGallerySwiper = new Swiper('#makkah-gallery', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Fonction pour obtenir les paramètres de l'URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        type: params.get('type')
    };
}

// Fonction pour mettre à jour les informations de la formule
function updateFormulaDetails(formula) {
    console.log('Données de la formule reçues:', formula);
    
    // Mise à jour des informations de base
    const infoElements = {
        'type-voyage': formula.tripType || 'N/A',
        'ville-depart': formula.departureCity || 'N/A',
        'date-depart': formatDate(formula.departureDate),
        'date-retour': formatDate(formula.returnDate),
        'formule': formula.formula || 'N/A',
        'duree': `${formula.duration || 0} jours`,
        'nuits-medina': `${formula.medinaNights || 0} nuits`,
        'nuits-makkah': `${formula.makkahNights || 0} nuits`,
        'hotel-medina': formula.medinaHotel || 'N/A',
        'hotel-makkah': formula.makkahHotel || 'N/A'
    };

    // Mise à jour des éléments avec les attributs data-info
    Object.entries(infoElements).forEach(([key, value]) => {
        const element = document.querySelector(`[data-info="${key}"]`);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Élément non trouvé pour la clé: ${key}`);
        }
    });

    // Mise à jour du prix principal
    const priceElement = document.getElementById('formula-price');
    if (priceElement) {
        priceElement.textContent = `${(formula.price || 0)} FCFA`;
    }

    // Mise à jour des tarifs
    const ratesTable = document.querySelector('#rates .space-y-2');
    if (ratesTable) {
        const ratesContent = `
            <div class="rates-table-row">
                <span class="rates-table-cell">Individuelle</span>
                <span class="rates-table-cell price">${(formula.price || 0).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Double</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.85).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Triple</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.80).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Quadruple</span>
                <span class="rates-table-cell price">${((formula.price || 0) * 0.75).toFixed(2)} €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Bébé</span>
                <span class="rates-table-cell price">350.00 €</span>
            </div>
            <div class="rates-table-row">
                <span class="rates-table-cell">Réduction enfant</span>
                <span class="rates-table-cell price">-150.00 €</span>
            </div>
        `;
        ratesTable.innerHTML = ratesContent;
    }

    // Mise à jour des images de la galerie
    const galleryMain = document.querySelector('.gallery-main .swiper-wrapper');
    if (galleryMain && Array.isArray(formula.images)) {
        galleryMain.innerHTML = formula.images.map((image) => `
            <div class="swiper-slide">
                <img src="${image.full}" alt="${image.alt || 'Image de la formule'}" class="w-full h-full object-cover">
            </div>
        `).join('');
    }

    // Mise à jour du logo de la compagnie aérienne
    const airlineLogo = document.getElementById('airline-logo');
    if (airlineLogo && formula.airline && formula.airline.logo) {
        airlineLogo.src = formula.airline.logo;
    }
}

// Supprimer la fonction loadFlights car les données sont déjà dans formula.flights
async function loadFormulaDetails() {
    try {
        const { id, type } = getUrlParams();
        const response = await fetch(`/api/formulas/${id}`);
        const formula = await response.json();
        updateFormulaDetails(formula);
        // Les vols sont déjà dans formula.flights, pas besoin de les charger séparément
        updateFlightInfo(formula.flights);
    } catch (error) {
        console.error('Erreur lors du chargement des détails de la formule:', error);
    }
}

// Charger les détails de la formule au chargement de la page
document.addEventListener('DOMContentLoaded', loadFormulaDetails);

// Gestion des onglets d'hébergement
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Mettre à jour les styles des boutons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Afficher le contenu correspondant
        const tabId = button.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
});

// Gestion des accordéons du programme
document.querySelectorAll('.program-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.program-arrow');
        
        content.classList.toggle('active');
        arrow.classList.toggle('active');
    });
});

// Gestion des accordéons des détails
document.querySelectorAll('.details-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.details-arrow');
        
        content.classList.toggle('active');
        arrow.classList.toggle('active');
    });
});

// Appeler la fonction de chargement du programme lors de l'initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Récupérer l'ID de la formule depuis l'URL ou un attribut data
    const formulaId = new URLSearchParams(window.location.search).get('id');
    if (formulaId) {
        loadProgramData(formulaId);
    }
}); 