// Cinematic Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Management
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.style.overflow = 'auto';
        initializeAnimations();
    }, 3000);

    // Navigation Functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3D Particle System
    function createParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: #00d4ff;
                border-radius: 50%;
                box-shadow: 0 0 ${Math.random() * 20 + 10}px #00d4ff;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Animate service cards with stagger
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .about-text, .stat-number, .service-card, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 40);
    }

    // 3D Mouse tracking for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 10;
        const rotateY = (centerX - x) / centerX * 10;
        
        heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

    // Movie Database
    const movieDatabase = [
        {
            id: 1,
            title: "Dune: Part Two",
            year: 2024,
            genre: ["Sci-Fi", "Adventure"],
            rating: 8.8,
            duration: "166 min",
            overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
            poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
            trailer: "https://www.youtube.com/embed/Way9Dexny3w",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Oscar Isaac"],
            category: "sci-fi"
        },
        {
            id: 2,
            title: "Top Gun: Maverick",
            year: 2022,
            genre: ["Action", "Drama"],
            rating: 8.7,
            duration: "130 min",
            overview: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
            poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            trailer: "https://www.youtube.com/embed/giXco2jaZ_4",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
            category: "action"
        },
        {
            id: 3,
            title: "Everything Everywhere All at Once",
            year: 2022,
            genre: ["Sci-Fi", "Comedy", "Drama"],
            rating: 8.1,
            duration: "139 min",
            overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence.",
            poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEkPjYBlocky4xAr.jpg",
            trailer: "https://www.youtube.com/embed/WLJJmB-wYMw",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
            category: "sci-fi"
        },
        {
            id: 4,
            title: "The Batman",
            year: 2022,
            genre: ["Action", "Crime", "Drama"],
            rating: 7.8,
            duration: "176 min",
            overview: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman must track the killer down.",
            poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright", "Colin Farrell"],
            category: "action"
        },
        {
            id: 5,
            title: "Oppenheimer",
            year: 2023,
            genre: ["Biography", "Drama", "History"],
            rating: 8.4,
            duration: "180 min",
            overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
            poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
            category: "drama"
        },
        {
            id: 6,
            title: "John Wick: Chapter 4",
            year: 2023,
            genre: ["Action", "Crime", "Thriller"],
            rating: 7.7,
            duration: "169 min",
            overview: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
            poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            trailer: "https://www.youtube.com/embed/qEVUtrk8_B4",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård", "Laurence Fishburne"],
            category: "action"
        },
        {
            id: 7,
            title: "Spider-Man: Across the Spider-Verse",
            year: 2023,
            genre: ["Animation", "Action", "Adventure"],
            rating: 8.7,
            duration: "140 min",
            overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting existence itself.",
            poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            trailer: "https://www.youtube.com/embed/cqGjhVJWtEg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Vélez"],
            category: "action"
        },
        {
            id: 8,
            title: "Blade Runner 2049",
            year: 2017,
            genre: ["Sci-Fi", "Drama", "Mystery"],
            rating: 8.0,
            duration: "164 min",
            overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
            poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
            trailer: "https://www.youtube.com/embed/gCcx85zbxz4",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
            category: "sci-fi"
        },
        {
            id: 9,
            title: "Mad Max: Fury Road",
            year: 2015,
            genre: ["Action", "Adventure", "Sci-Fi"],
            rating: 8.1,
            duration: "120 min",
            overview: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from a cult leader and his army.",
            poster: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
            trailer: "https://www.youtube.com/embed/hEJnMQG9ev8",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
            category: "action"
        },
        {
            id: 10,
            title: "Inception",
            year: 2010,
            genre: ["Sci-Fi", "Action", "Thriller"],
            rating: 8.8,
            duration: "148 min",
            overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
            poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Elliot Page"],
            category: "sci-fi"
        },
        {
            id: 11,
            title: "Parasite",
            year: 2019,
            genre: ["Comedy", "Drama", "Thriller"],
            rating: 8.5,
            duration: "132 min",
            overview: "A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.",
            poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            trailer: "https://www.youtube.com/embed/5xH0HfJHsaY",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
            category: "thriller"
        },
        {
            id: 12,
            title: "Interstellar",
            year: 2014,
            genre: ["Sci-Fi", "Drama", "Adventure"],
            rating: 8.6,
            duration: "169 min",
            overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
            category: "sci-fi"
        }
    ];

    // Egyptian Films and Series Database
    const egyptianFilmsDatabase = [
        {
            id: 101,
            title: "The Yacoubian Building",
            titleAr: "عمارة يعقوبيان",
            year: 2006,
            genre: ["Drama", "Social"],
            rating: 8.2,
            duration: "165 min",
            overview: "A dramatic portrayal of Egyptian society through the residents of a famous Cairo building, exploring themes of corruption, love, and social inequality.",
            poster: "https://image.tmdb.org/t/p/w500/yacoubian.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "drama",
            type: "film"
        },
        {
            id: 102,
            title: "The Blue Elephant",
            titleAr: "الفيل الأزرق",
            year: 2014,
            genre: ["Thriller", "Mystery"],
            rating: 8.5,
            duration: "170 min",
            overview: "A psychological thriller about a psychiatrist who must face his past when treating a dangerous patient in a mental hospital.",
            poster: "https://image.tmdb.org/t/p/w500/blue_elephant.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 103,
            title: "The School of Mischief",
            titleAr: "مدرسة المشاغبين",
            year: 1973,
            genre: ["Comedy", "Drama"],
            rating: 9.1,
            duration: "251 min",
            overview: "A classic Egyptian comedy about a strict teacher who tries to reform a group of mischievous students, starring Adel Imam.",
            poster: "https://image.tmdb.org/t/p/w500/school_mischief.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 104,
            title: "Cairo Station",
            titleAr: "باب الحديد",
            year: 1958,
            genre: ["Drama", "Crime"],
            rating: 8.8,
            duration: "77 min",
            overview: "Youssef Chahine's masterpiece about the social dynamics and struggles of people working at Cairo's main railway station.",
            poster: "https://image.tmdb.org/t/p/w500/cairo_station.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 105,
            title: "Terrorism and Kebab",
            titleAr: "الإرهاب والكباب",
            year: 1992,
            genre: ["Comedy", "Social"],
            rating: 8.7,
            duration: "105 min",
            overview: "A satirical comedy starring Adel Imam about bureaucracy and corruption in Egyptian government offices.",
            poster: "https://image.tmdb.org/t/p/w500/terrorism_kebab.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 106,
            title: "Clash",
            titleAr: "اشتباك",
            year: 2016,
            genre: ["Drama", "Thriller"],
            rating: 7.4,
            duration: "97 min",
            overview: "A tense drama set entirely inside a police van during the political turmoil in Egypt, showing different perspectives of society.",
            poster: "https://image.tmdb.org/t/p/w500/clash.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 107,
            title: "The Treasure",
            titleAr: "الكنز",
            year: 2017,
            genre: ["Adventure", "Comedy"],
            rating: 8.1,
            duration: "110 min",
            overview: "An adventure comedy about three friends searching for treasure in the Egyptian desert, starring Mohamed Saad.",
            poster: "https://image.tmdb.org/t/p/w500/treasure.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 108,
            title: "The Island",
            titleAr: "الجزيرة",
            year: 2007,
            genre: ["Drama", "War"],
            rating: 8.9,
            duration: "158 min",
            overview: "An epic war drama about Egyptian resistance during the British occupation, starring Ahmed Zaki in his final role.",
            poster: "https://image.tmdb.org/t/p/w500/island.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            category: "drama",
            type: "film"
        },
        {
            id: 109,
            title: "The Danish Experience",
            titleAr: "التجربة الدنماركية",
            year: 2003,
            genre: ["Comedy", "Romance"],
            rating: 7.8,
            duration: "105 min",
            overview: "A romantic comedy about an Egyptian man who travels to Denmark and the cultural clashes he experiences.",
            poster: "https://image.tmdb.org/t/p/w500/danish.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 110,
            title: "Zaki Chan",
            titleAr: "زكي شان",
            year: 2005,
            genre: ["Comedy", "Action"],
            rating: 7.6,
            duration: "105 min",
            overview: "An action comedy starring Ahmed Helmy as a simple man who gets involved in dangerous adventures.",
            poster: "https://image.tmdb.org/t/p/w500/zaki_chan.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 111,
            title: "The Suit",
            titleAr: "البدلة",
            year: 2018,
            genre: ["Comedy", "Drama"],
            rating: 8.3,
            duration: "95 min",
            overview: "A comedy-drama about a poor man whose life changes when he finds an expensive suit, starring Tamer Hosny.",
            poster: "https://image.tmdb.org/t/p/w500/suit.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 112,
            title: "Excuse My French",
            titleAr: "عذرا للإزعاج",
            year: 2014,
            genre: ["Comedy", "Drama"],
            rating: 8.0,
            duration: "100 min",
            overview: "A comedy-drama about a Christian boy who pretends to be Muslim to attend a better school in Egypt.",
            poster: "https://image.tmdb.org/t/p/w500/excuse_french.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 113,
            title: "Omar & Salma",
            titleAr: "عمر وسلمى",
            year: 2007,
            genre: ["Romance", "Comedy"],
            rating: 7.5,
            duration: "130 min",
            overview: "A romantic comedy about a couple's relationship challenges, starring Tamer Hosny and Mai Ezz El Din.",
            poster: "https://image.tmdb.org/t/p/w500/omar_salma.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 114,
            title: "The Night of Hana and Sorour",
            titleAr: "ليلة هنا وسرور",
            year: 2018,
            genre: ["Comedy", "Musical"],
            rating: 7.9,
            duration: "95 min",
            overview: "A musical comedy about two friends who dream of becoming famous singers in Cairo's nightlife scene.",
            poster: "https://image.tmdb.org/t/p/w500/hana_sorour.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 115,
            title: "The Blue Elephant 2",
            titleAr: "الفيل الأزرق 2",
            year: 2019,
            genre: ["Thriller", "Horror"],
            rating: 8.7,
            duration: "170 min",
            overview: "The sequel to the psychological thriller, continuing the story of Dr. Yehia and his battle with mental illness and supernatural forces.",
            poster: "https://image.tmdb.org/t/p/w500/blue_elephant_2.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 116,
            title: "Hassan and Morcos",
            titleAr: "حسن ومرقص",
            year: 2008,
            genre: ["Comedy", "Drama"],
            rating: 8.4,
            duration: "110 min",
            overview: "A comedy-drama about the friendship between a Muslim and a Christian Egyptian, addressing religious harmony.",
            poster: "https://image.tmdb.org/t/p/w500/hassan_morcos.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 117,
            title: "X-Large",
            titleAr: "إكس لارج",
            year: 2011,
            genre: ["Comedy", "Romance"],
            rating: 7.9,
            duration: "130 min",
            overview: "A romantic comedy starring Ahmed Helmy about a man who struggles with weight issues and finding love.",
            poster: "https://image.tmdb.org/t/p/w500/x_large.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            category: "comedy",
            type: "film"
        },
        {
            id: 118,
            title: "The Diesel",
            titleAr: "الديزل",
            year: 2018,
            genre: ["Action", "Crime"],
            rating: 8.1,
            duration: "95 min",
            overview: "An action crime film about a truck driver who gets involved in dangerous smuggling operations.",
            poster: "https://image.tmdb.org/t/p/w500/diesel.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 119,
            title: "Microphone",
            titleAr: "ميكروفون",
            year: 2010,
            genre: ["Drama", "Music"],
            rating: 8.6,
            duration: "120 min",
            overview: "A drama about the underground music scene in Alexandria, exploring youth culture and artistic expression.",
            poster: "https://image.tmdb.org/t/p/w500/microphone.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            category: "modern",
            type: "film"
        },
        {
            id: 120,
            title: "The Emigrant",
            titleAr: "المهاجر",
            year: 1994,
            genre: ["Drama", "Historical"],
            rating: 8.9,
            duration: "140 min",
            overview: "Omar Sharif stars in this epic about the story of Prophet Joseph in ancient Egypt.",
            poster: "https://image.tmdb.org/t/p/w500/emigrant.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 121,
            title: "The Destiny",
            titleAr: "المصير",
            year: 1997,
            genre: ["Drama", "Historical"],
            rating: 8.8,
            duration: "135 min",
            overview: "Youssef Chahine's masterpiece about the philosopher Averroes and the battle between knowledge and ignorance.",
            poster: "https://image.tmdb.org/t/p/w500/destiny.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 122,
            title: "The Land",
            titleAr: "الأرض",
            year: 1969,
            genre: ["Drama", "Social"],
            rating: 9.2,
            duration: "130 min",
            overview: "A classic Egyptian film about peasants' struggle for their land, based on the novel by Abdel Rahman al-Sharqawi.",
            poster: "https://image.tmdb.org/t/p/w500/land.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 123,
            title: "The Sparrow",
            titleAr: "العصفور",
            year: 1973,
            genre: ["Drama", "Political"],
            rating: 8.7,
            duration: "105 min",
            overview: "A political drama by Youssef Chahine about the aftermath of the 1967 Six-Day War.",
            poster: "https://image.tmdb.org/t/p/w500/sparrow.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 124,
            title: "Women's Prison",
            titleAr: "سجن النساء",
            year: 1986,
            genre: ["Drama", "Social"],
            rating: 8.5,
            duration: "100 min",
            overview: "A powerful drama about women's lives in prison and the social issues that led them there.",
            poster: "https://image.tmdb.org/t/p/w500/women_prison.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            category: "classic",
            type: "film"
        },
        {
            id: 125,
            title: "Adieu Bonaparte",
            titleAr: "وداعا بونابرت",
            year: 1985,
            genre: ["Historical", "Drama"],
            rating: 8.3,
            duration: "115 min",
            overview: "Youssef Chahine's film about Napoleon's campaign in Egypt and the cultural clash between East and West.",
            poster: "https://image.tmdb.org/t/p/w500/adieu_bonaparte.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "classic",
            type: "film"
        }
    ];

    const egyptianSeriesDatabase = [
        {
            id: 201,
            title: "Grand Hotel",
            titleAr: "جراند أوتيل",
            year: 2016,
            genre: ["Drama", "Mystery"],
            rating: 8.9,
            duration: "30 episodes",
            overview: "A Ramadan series about the secrets and mysteries surrounding a luxury hotel and its wealthy guests in 1950s Cairo.",
            poster: "https://image.tmdb.org/t/p/w500/grand_hotel.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            category: "ramadan",
            type: "series"
        },
        {
            id: 202,
            title: "The Community",
            titleAr: "الجماعة",
            year: 2010,
            genre: ["Historical", "Drama"],
            rating: 8.6,
            duration: "30 episodes",
            overview: "A historical drama series about the Muslim Brotherhood movement in Egypt from the 1940s to the 1980s.",
            poster: "https://image.tmdb.org/t/p/w500/community.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 203,
            title: "Abdel Kader the Foreigner",
            titleAr: "عبد القادر الأجنبي",
            year: 2012,
            genre: ["Comedy", "Social"],
            rating: 8.3,
            duration: "30 episodes",
            overview: "A comedy series about an Egyptian man who pretends to be a foreigner to get better treatment in his own country.",
            poster: "https://image.tmdb.org/t/p/w500/abdel_kader.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            category: "comedy",
            type: "series"
        },
        {
            id: 204,
            title: "The King",
            titleAr: "الملك",
            year: 2020,
            genre: ["Historical", "Drama"],
            rating: 9.2,
            duration: "30 episodes",
            overview: "A historical epic about the life of King Farouk, the last king of Egypt, and the political events that led to the 1952 revolution.",
            poster: "https://image.tmdb.org/t/p/w500/king.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 205,
            title: "Choice",
            titleAr: "الاختيار",
            year: 2020,
            genre: ["Action", "Drama"],
            rating: 9.5,
            duration: "30 episodes",
            overview: "A gripping series about Egyptian special forces and their fight against terrorism, based on real events.",
            poster: "https://image.tmdb.org/t/p/w500/choice.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 206,
            title: "Ramadan Kareem",
            titleAr: "رمضان كريم",
            year: 2017,
            genre: ["Comedy", "Family"],
            rating: 8.1,
            duration: "30 episodes",
            overview: "A Ramadan comedy series about a middle-class Egyptian family and their daily struggles and humorous situations.",
            poster: "https://image.tmdb.org/t/p/w500/ramadan_kareem.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            category: "ramadan",
            type: "series"
        },
        {
            id: 207,
            title: "El Kebeer Awi",
            titleAr: "الكبير أوي",
            year: 2010,
            genre: ["Comedy", "Family"],
            rating: 9.4,
            duration: "30 episodes",
            overview: "One of Egypt's most beloved comedy series starring Ahmed Mekky as El Kebeer, bringing laughter to millions of viewers.",
            poster: "https://image.tmdb.org/t/p/w500/el_kebeer_awi.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "comedy",
            type: "series"
        },
        {
            id: 208,
            title: "Layali Eugenie",
            titleAr: "ليالي أوجيني",
            year: 2018,
            genre: ["Historical", "Romance"],
            rating: 8.7,
            duration: "30 episodes",
            overview: "A historical romance series set in 19th century Egypt during the reign of Khedive Ismail, featuring palace intrigue.",
            poster: "https://image.tmdb.org/t/p/w500/layali_eugenie.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 209,
            title: "Newton's Game",
            titleAr: "لعبة نيوتن",
            year: 2021,
            genre: ["Crime", "Thriller"],
            rating: 9.0,
            duration: "30 episodes",
            overview: "A brilliant crime thriller about a detective who uses scientific methods to solve complex murder cases in Cairo.",
            poster: "https://image.tmdb.org/t/p/w500/newton_game.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 210,
            title: "Forgetfulness Game",
            titleAr: "لعبة النسيان",
            year: 2020,
            genre: ["Thriller", "Mystery"],
            rating: 8.8,
            duration: "30 episodes",
            overview: "A psychological thriller about a psychiatrist who discovers dark secrets while treating patients with memory loss.",
            poster: "https://image.tmdb.org/t/p/w500/forgetfulness_game.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 211,
            title: "The End",
            titleAr: "النهاية",
            year: 2020,
            genre: ["Thriller", "Drama"],
            rating: 8.9,
            duration: "30 episodes",
            overview: "A psychological thriller about a group of people trapped in mysterious circumstances, questioning reality.",
            poster: "https://image.tmdb.org/t/p/w500/the_end.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 212,
            title: "Valentino",
            titleAr: "فالنتينو",
            year: 2020,
            genre: ["Drama", "Romance"],
            rating: 8.4,
            duration: "30 episodes",
            overview: "A romantic drama series about love, betrayal, and family secrets in modern Cairo society.",
            poster: "https://image.tmdb.org/t/p/w500/valentino.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 213,
            title: "The Pharaoh",
            titleAr: "الفرعون",
            year: 2015,
            genre: ["Historical", "Drama"],
            rating: 9.1,
            duration: "30 episodes",
            overview: "An epic historical series about the reign of Pharaoh Ramesses II and the glory of ancient Egypt.",
            poster: "https://image.tmdb.org/t/p/w500/pharaoh.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 214,
            title: "Kafr Delhab",
            titleAr: "كفر دلهاب",
            year: 2017,
            genre: ["Comedy", "Social"],
            rating: 8.6,
            duration: "30 episodes",
            overview: "A comedy series about the daily life and adventures of people in a small Egyptian village.",
            poster: "https://image.tmdb.org/t/p/w500/kafr_delhab.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            category: "comedy",
            type: "series"
        },
        {
            id: 215,
            title: "The Seven Commandments",
            titleAr: "الوصايا السبع",
            year: 2014,
            genre: ["Drama", "Family"],
            rating: 8.8,
            duration: "30 episodes",
            overview: "A family drama about seven siblings and their struggles to keep their father's legacy alive.",
            poster: "https://image.tmdb.org/t/p/w500/seven_commandments.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 216,
            title: "Zelzal",
            titleAr: "زلزال",
            year: 2019,
            genre: ["Action", "Drama"],
            rating: 8.5,
            duration: "30 episodes",
            overview: "An action-packed series about an earthquake that changes the lives of several families in Cairo.",
            poster: "https://image.tmdb.org/t/p/w500/zelzal.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 217,
            title: "Malika",
            titleAr: "ملكة",
            year: 2022,
            genre: ["Historical", "Drama"],
            rating: 9.2,
            duration: "30 episodes",
            overview: "A historical drama about Queen Hatshepsut, one of the most powerful female pharaohs in ancient Egypt.",
            poster: "https://image.tmdb.org/t/p/w500/malika.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 218,
            title: "Ayza Atgawez",
            titleAr: "عايزة أتجوز",
            year: 2010,
            genre: ["Comedy", "Romance"],
            rating: 8.2,
            duration: "30 episodes",
            overview: "A romantic comedy series about a young woman's journey to find the perfect husband in modern Cairo.",
            poster: "https://image.tmdb.org/t/p/w500/ayza_atgawez.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            category: "comedy",
            type: "series"
        },
        {
            id: 219,
            title: "Al Mizan",
            titleAr: "الميزان",
            year: 2023,
            genre: ["Crime", "Thriller"],
            rating: 8.9,
            duration: "30 episodes",
            overview: "A modern crime thriller about corruption in the justice system and one lawyer's fight for truth.",
            poster: "https://image.tmdb.org/t/p/w500/al_mizan.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 220,
            title: "Ramadan Mabrouk Abu El Alamein Hamouda",
            titleAr: "رمضان مبروك أبو العلمين حمودة",
            year: 2008,
            genre: ["Comedy", "Family"],
            rating: 9.5,
            duration: "30 episodes",
            overview: "A classic Ramadan comedy series starring Mohamed Henedy, bringing joy and laughter to Egyptian families.",
            poster: "https://image.tmdb.org/t/p/w500/ramadan_mabrouk.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            category: "ramadan",
            type: "series"
        },
        {
            id: 221,
            title: "Tamer & Shawqeya",
            titleAr: "تامر وشوقية",
            year: 2006,
            genre: ["Comedy", "Romance"],
            rating: 8.7,
            duration: "30 episodes",
            overview: "A romantic comedy series about the relationship between Tamer and Shawqeya and their humorous adventures.",
            poster: "https://image.tmdb.org/t/p/w500/tamer_shawqeya.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            category: "comedy",
            type: "series"
        },
        {
            id: 222,
            title: "Haret El Yahoud",
            titleAr: "حارة اليهود",
            year: 2015,
            genre: ["Historical", "Drama"],
            rating: 8.9,
            duration: "30 episodes",
            overview: "A historical drama about the Jewish quarter in old Cairo and the coexistence of different communities.",
            poster: "https://image.tmdb.org/t/p/w500/haret_yahoud.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 223,
            title: "Kingdom of Fire",
            titleAr: "مملكة النار",
            year: 2019,
            genre: ["Historical", "Action"],
            rating: 8.8,
            duration: "30 episodes",
            overview: "A historical action series set in medieval Egypt, exploring conflicts and alliances during the Crusades era.",
            poster: "https://image.tmdb.org/t/p/w500/kingdom_fire.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            category: "historical",
            type: "series"
        },
        {
            id: 224,
            title: "Al Ekhteyar 2",
            titleAr: "الاختيار 2",
            year: 2021,
            genre: ["Action", "Drama"],
            rating: 9.3,
            duration: "30 episodes",
            overview: "The second season of the acclaimed series about Egyptian heroes and their sacrifices for the nation.",
            poster: "https://image.tmdb.org/t/p/w500/choice_2.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            category: "social",
            type: "series"
        },
        {
            id: 225,
            title: "Mamlaket Younan",
            titleAr: "مملكة يونان",
            year: 2024,
            genre: ["Historical", "Drama"],
            rating: 9.0,
            duration: "30 episodes",
            overview: "A recent historical drama about ancient Greek influence in Egypt during the Ptolemaic period.",
            poster: "https://image.tmdb.org/t/p/w500/mamlaket_younan.jpg",
            movieUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            category: "historical",
            type: "series"
        }
    ];

    let currentMovies = [...movieDatabase];
    let currentEgyptianContent = [...egyptianFilmsDatabase];
    let activeEgyptianTab = 'films';
    let displayedMovies = 0;
    const moviesPerLoad = 6;

    // Movie functionality
    function createMovieCard(movie) {
        return `
            <div class="movie-card" data-movie-id="${movie.id}" data-category="${movie.category}">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                    <div class="movie-rating">⭐ ${movie.rating}</div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span class="movie-year">${movie.year}</span>
                        <span class="movie-genre">${movie.genre.join(', ')}</span>
                    </div>
                    <p class="movie-overview">${movie.overview}</p>
                </div>
            </div>
        `;
    }

    function loadMovies(reset = false) {
        const moviesGrid = document.getElementById('moviesGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (reset) {
            moviesGrid.innerHTML = '';
            displayedMovies = 0;
        }
        
        const moviesToShow = currentMovies.slice(displayedMovies, displayedMovies + moviesPerLoad);
        
        moviesToShow.forEach(movie => {
            moviesGrid.innerHTML += createMovieCard(movie);
        });
        
        displayedMovies += moviesToShow.length;
        
        // Hide load more button if all movies are displayed
        if (displayedMovies >= currentMovies.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Add event listeners to new movie cards
        addMovieCardListeners();
    }

    function addMovieCardListeners() {
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            // Remove existing listeners to prevent duplicates
            card.replaceWith(card.cloneNode(true));
        });
        
        // Re-select cards and add listeners
        const newMovieCards = document.querySelectorAll('.movie-card');
        newMovieCards.forEach(card => {
            card.addEventListener('click', () => {
                const movieId = parseInt(card.dataset.movieId);
                openMovieModal(movieId);
            });
            
            // 3D hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / centerX * 10;
                const rotateX = (centerY - y) / centerY * 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function openMovieModal(movieId) {
        const movie = movieDatabase.find(m => m.id === movieId);
        if (!movie) return;
        
        const modal = document.getElementById('movieModal');
        
        // Populate modal content
        document.getElementById('modalPoster').src = movie.poster;
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalRating').textContent = `⭐ ${movie.rating}`;
        document.getElementById('modalYear').textContent = movie.year;
        document.getElementById('modalDuration').textContent = movie.duration;
        document.getElementById('modalGenre').textContent = movie.genre.join(', ');
        document.getElementById('modalOverview').textContent = movie.overview;
        
        // Populate cast
        const castContainer = document.getElementById('modalCast');
        castContainer.innerHTML = movie.cast.map(actor => 
            `<span class="cast-member">${actor}</span>`
        ).join('');
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Store trailer URL and movie URL for later use
        modal.dataset.trailerUrl = movie.trailer;
        modal.dataset.movieUrl = movie.movieUrl;
        modal.dataset.movieId = movie.id;
    }

    // Movie filtering
    function filterMovies(category) {
        if (category === 'all') {
            currentMovies = [...movieDatabase];
        } else {
            currentMovies = movieDatabase.filter(movie => movie.category === category);
        }
        loadMovies(true);
    }

    // Movie search
    function searchMovies(query) {
        if (!query.trim()) {
            currentMovies = [...movieDatabase];
        } else {
            currentMovies = movieDatabase.filter(movie => 
                movie.title.toLowerCase().includes(query.toLowerCase()) ||
                movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
                movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
            );
        }
        loadMovies(true);
    }

    // Watchlist functionality
    let watchlist = JSON.parse(localStorage.getItem('movieWatchlist')) || [];

    function updateWatchlistUI() {
        const watchlistCount = document.getElementById('watchlistCount');
        const watchlistContent = document.getElementById('watchlistContent');
        
        watchlistCount.textContent = watchlist.length;
        
        if (watchlist.length === 0) {
            watchlistContent.innerHTML = '<p class="empty-watchlist">Your watchlist is empty. Add some movies!</p>';
        } else {
            watchlistContent.innerHTML = watchlist.map(movie => `
                <div class="watchlist-item" data-movie-id="${movie.id}">
                    <div class="watchlist-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                    </div>
                    <div class="watchlist-info">
                        <div class="watchlist-title">${movie.title}</div>
                        <div class="watchlist-meta">${movie.year} • ${movie.genre.join(', ')}</div>
                        <button class="remove-from-watchlist" data-movie-id="${movie.id}">Remove</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Add event listeners to watchlist items
        document.querySelectorAll('.watchlist-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-from-watchlist')) {
                    const movieId = parseInt(item.dataset.movieId);
                    openMovieModal(movieId);
                    document.getElementById('watchlistSidebar').classList.remove('active');
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-watchlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const movieId = parseInt(btn.dataset.movieId);
                removeFromWatchlist(movieId);
            });
        });
    }

    function addToWatchlist(movieId) {
        const movie = movieDatabase.find(m => m.id === movieId);
        if (movie && !watchlist.find(m => m.id === movieId)) {
            watchlist.push(movie);
            localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
            updateWatchlistUI();
            showNotification(`${movie.title} added to watchlist!`, 'success');
        }
    }

    function removeFromWatchlist(movieId) {
        const movie = watchlist.find(m => m.id === movieId);
        watchlist = watchlist.filter(m => m.id !== movieId);
        localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
        updateWatchlistUI();
        if (movie) {
            showNotification(`${movie.title} removed from watchlist`, 'success');
        }
    }

    // Virtual Video Player functionality
    let isVirtualCinemaMode = false;
    let currentPlaybackRate = 1;
    let currentQuality = 'auto';
    let subtitlesEnabled = false;

    function openMoviePlayer(contentId) {
        // Find content in all databases
        let content = movieDatabase.find(m => m.id === contentId) || 
                     egyptianFilmsDatabase.find(c => c.id === contentId) ||
                     egyptianSeriesDatabase.find(c => c.id === contentId);
        
        if (!content) return;
        
        const player = document.getElementById('moviePlayer');
        const video = document.getElementById('movieVideo');
        const videoSource = video.querySelector('source');
        
        // Set content details
        document.getElementById('playerTitle').textContent = content.title + (content.titleAr ? ` | ${content.titleAr}` : '');
        document.getElementById('playerYear').textContent = content.year;
        document.getElementById('playerGenre').textContent = content.genre.join(', ');
        document.getElementById('playerRating').textContent = `⭐ ${content.rating}`;
        
        // Set video source
        videoSource.src = content.movieUrl;
        video.load();
        
        // Initialize custom controls
        initializeVideoControls();
        
        // Show player
        player.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close modal if open
        const modal = document.getElementById('movieModal');
        modal.style.display = 'none';
        
        // Auto-play video
        video.play().catch(e => {
            console.log('Auto-play prevented:', e);
            document.getElementById('videoOverlay').classList.add('active');
        });
    }

    function initializeVideoControls() {
        const video = document.getElementById('movieVideo');
        const progressBar = document.getElementById('progressBar');
        const progressFilled = document.getElementById('progressFilled');
        const progressHandle = document.getElementById('progressHandle');
        const currentTimeSpan = document.getElementById('currentTime');
        const durationSpan = document.getElementById('duration');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeRange = document.getElementById('volumeRange');
        const volumeBtn = document.getElementById('volumeBtn');

        // Update progress bar
        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressFilled.style.width = progress + '%';
                progressHandle.style.left = progress + '%';
                currentTimeSpan.textContent = formatTime(video.currentTime);
            }
        });

        // Update duration
        video.addEventListener('loadedmetadata', () => {
            durationSpan.textContent = formatTime(video.duration);
        });

        // Progress bar click
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progress = clickX / rect.width;
            video.currentTime = progress * video.duration;
        });

        // Play/Pause button
        playPauseBtn.addEventListener('click', togglePlayPause);

        // Volume control
        volumeRange.addEventListener('input', (e) => {
            video.volume = e.target.value / 100;
            updateVolumeIcon();
        });

        volumeBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateVolumeIcon();
        });

        // Video events
        video.addEventListener('play', () => {
            playPauseBtn.querySelector('.play-icon').style.display = 'none';
            playPauseBtn.querySelector('.pause-icon').style.display = 'inline';
            document.getElementById('videoOverlay').classList.remove('active');
        });

        video.addEventListener('pause', () => {
            playPauseBtn.querySelector('.play-icon').style.display = 'inline';
            playPauseBtn.querySelector('.pause-icon').style.display = 'none';
            if (!video.ended) {
                document.getElementById('videoOverlay').classList.add('active');
            }
        });
    }

    function togglePlayPause() {
        const video = document.getElementById('movieVideo');
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateVolumeIcon() {
        const video = document.getElementById('movieVideo');
        const volumeBtn = document.getElementById('volumeBtn');
        
        if (video.muted || video.volume === 0) {
            volumeBtn.textContent = '🔇';
        } else if (video.volume < 0.5) {
            volumeBtn.textContent = '🔉';
        } else {
            volumeBtn.textContent = '🔊';
        }
    }

    function toggleVirtualCinema() {
        const virtualCinema = document.getElementById('virtualCinema');
        const cineModeBtn = document.getElementById('cineModeBtn');
        
        isVirtualCinemaMode = !isVirtualCinemaMode;
        
        if (isVirtualCinemaMode) {
            virtualCinema.classList.add('cinema-active');
            cineModeBtn.classList.add('active');
            showNotification('Virtual Cinema Mode Activated! 🎭', 'success');
        } else {
            virtualCinema.classList.remove('cinema-active');
            cineModeBtn.classList.remove('active');
            showNotification('Virtual Cinema Mode Deactivated', 'success');
        }
    }

    function changePlaybackSpeed(speed) {
        const video = document.getElementById('movieVideo');
        const speedBtn = document.getElementById('speedBtn');
        
        video.playbackRate = speed;
        currentPlaybackRate = speed;
        speedBtn.textContent = speed + 'x';
        
        // Update active speed option
        document.querySelectorAll('.speed-option').forEach(option => {
            option.classList.remove('active');
            if (parseFloat(option.dataset.speed) === speed) {
                option.classList.add('active');
            }
        });
        
        showNotification(`Playback speed: ${speed}x`, 'success');
    }

    function changeQuality(quality) {
        const qualityBtn = document.getElementById('qualityBtn');
        
        currentQuality = quality;
        qualityBtn.textContent = quality === 'auto' ? 'AUTO' : quality;
        
        // Update active quality option
        document.querySelectorAll('.quality-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.quality === quality) {
                option.classList.add('active');
            }
        });
        
        showNotification(`Quality: ${quality}`, 'success');
    }

    function toggleSubtitles() {
        const video = document.getElementById('movieVideo');
        const subtitlesBtn = document.getElementById('subtitlesBtn');
        const track = video.querySelector('track');
        
        subtitlesEnabled = !subtitlesEnabled;
        
        if (track) {
            track.mode = subtitlesEnabled ? 'showing' : 'hidden';
        }
        
        if (subtitlesEnabled) {
            subtitlesBtn.classList.add('active');
            showNotification('Subtitles enabled', 'success');
        } else {
            subtitlesBtn.classList.remove('active');
            showNotification('Subtitles disabled', 'success');
        }
    }

    function togglePictureInPicture() {
        const video = document.getElementById('movieVideo');
        const videoWrapper = document.querySelector('.video-wrapper');
        const pipBtn = document.getElementById('pipBtn');
        
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
            pipBtn.classList.remove('active');
            videoWrapper.classList.remove('pip-mode');
        } else {
            video.requestPictureInPicture().then(() => {
                pipBtn.classList.add('active');
                videoWrapper.classList.add('pip-mode');
                showNotification('Picture-in-Picture mode activated', 'success');
            }).catch(e => {
                console.log('PiP failed:', e);
                showNotification('Picture-in-Picture not supported', 'error');
            });
        }
    }

    function rewindVideo() {
        const video = document.getElementById('movieVideo');
        video.currentTime = Math.max(0, video.currentTime - 10);
        showNotification('Rewound 10 seconds', 'success');
    }

    function forwardVideo() {
        const video = document.getElementById('movieVideo');
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        showNotification('Forward 10 seconds', 'success');
    }

    function closeMoviePlayer() {
        const player = document.getElementById('moviePlayer');
        const video = document.getElementById('movieVideo');
        
        video.pause();
        video.currentTime = 0;
        player.style.display = 'none';
        player.classList.remove('minimized');
        document.body.style.overflow = 'auto';
    }

    function minimizePlayer() {
        const player = document.getElementById('moviePlayer');
        player.classList.toggle('minimized');
    }

    function toggleFullscreen() {
        const video = document.getElementById('movieVideo');
        
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen().catch(e => {
                console.log('Fullscreen failed:', e);
            });
        }
    }

    // Egyptian content functionality
    function createEgyptianCard(content) {
        return `
            <div class="egyptian-card" data-content-id="${content.id}" data-category="${content.category}">
                <div class="egyptian-poster">
                    <img src="${content.poster}" alt="${content.title}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDI4MCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iNDAwIiBmaWxsPSJyZ2JhKDIxOCwgMTY1LCAzMiwgMC4xKSIvPgo8dGV4dCB4PSIxNDAiIHk9IjIwMCIgZmlsbD0iIzAwZDRmZiIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+OrTwvdGV4dD4KPC9zdmc+'">
                    <div class="egyptian-rating">⭐ ${content.rating}</div>
                    <div class="egyptian-year">${content.year}</div>
                </div>
                <div class="egyptian-info">
                    <h3 class="egyptian-title">${content.title}</h3>
                    <div class="egyptian-title-ar">${content.titleAr}</div>
                    <div class="egyptian-meta">
                        <span class="egyptian-genre">${content.genre.join(', ')}</span>
                        <span class="egyptian-duration">${content.duration}</span>
                    </div>
                    <p class="egyptian-overview">${content.overview}</p>
                </div>
                <div class="egyptian-overlay">
                    <button class="egyptian-play-btn">▶ Watch Now</button>
                    <div class="egyptian-actions">
                        <button class="egyptian-action-btn">+ Watchlist</button>
                        <button class="egyptian-action-btn">ℹ Details</button>
                    </div>
                </div>
            </div>
        `;
    }

    function loadEgyptianContent(contentType = 'films') {
        const grid = document.getElementById(contentType === 'films' ? 'egyptianFilmsGrid' : 'egyptianSeriesGrid');
        const database = contentType === 'films' ? egyptianFilmsDatabase : egyptianSeriesDatabase;
        
        grid.innerHTML = '';
        database.forEach(content => {
            grid.innerHTML += createEgyptianCard(content);
        });
        
        addEgyptianCardListeners();
    }

    function addEgyptianCardListeners() {
        const egyptianCards = document.querySelectorAll('.egyptian-card');
        egyptianCards.forEach(card => {
            const playBtn = card.querySelector('.egyptian-play-btn');
            const watchlistBtn = card.querySelector('.egyptian-action-btn');
            
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contentId = parseInt(card.dataset.contentId);
                openEgyptianPlayer(contentId);
            });
            
            watchlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const contentId = parseInt(card.dataset.contentId);
                addEgyptianToWatchlist(contentId);
            });
            
            // 3D hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / centerX * 8;
                const rotateX = (centerY - y) / centerY * 8;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    function openEgyptianPlayer(contentId) {
        // Find content in both databases
        let content = egyptianFilmsDatabase.find(c => c.id === contentId) || 
                     egyptianSeriesDatabase.find(c => c.id === contentId);
        
        if (content) {
            openMoviePlayer(content.id);
        }
    }

    function addEgyptianToWatchlist(contentId) {
        let content = egyptianFilmsDatabase.find(c => c.id === contentId) || 
                     egyptianSeriesDatabase.find(c => c.id === contentId);
        
        if (content) {
            addToWatchlist(content.id);
        }
    }

    function filterEgyptianContent(category, contentType) {
        const database = contentType === 'films' ? egyptianFilmsDatabase : egyptianSeriesDatabase;
        const grid = document.getElementById(contentType === 'films' ? 'egyptianFilmsGrid' : 'egyptianSeriesGrid');
        
        let filteredContent;
        if (category === 'all') {
            filteredContent = database;
        } else {
            filteredContent = database.filter(content => content.category === category);
        }
        
        grid.innerHTML = '';
        filteredContent.forEach(content => {
            grid.innerHTML += createEgyptianCard(content);
        });
        
        addEgyptianCardListeners();
    }

    function initializeEgyptianSection() {
        // Load initial content
        loadEgyptianContent('films');
        loadEgyptianContent('series');
        
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                btn.classList.add('active');
                document.getElementById(targetTab + '-content').classList.add('active');
                
                activeEgyptianTab = targetTab;
            });
        });
        
        // Filter buttons for films
        const filmFilters = document.querySelectorAll('#films-content .egyptian-filter-btn');
        filmFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                filmFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterEgyptianContent(btn.dataset.filter, 'films');
            });
        });
        
        // Filter buttons for series
        const seriesFilters = document.querySelectorAll('#series-content .egyptian-filter-btn');
        seriesFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                seriesFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterEgyptianContent(btn.dataset.filter, 'series');
            });
        });
    }

    // Initialize movies
    function initializeMovies() {
        loadMovies();
        updateWatchlistUI();
        initializeEgyptianSection();
        
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterMovies(btn.dataset.filter);
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('movieSearch');
        const searchBtn = document.querySelector('.search-btn');
        
        searchInput.addEventListener('input', (e) => {
            searchMovies(e.target.value);
        });
        
        searchBtn.addEventListener('click', () => {
            searchMovies(searchInput.value);
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        loadMoreBtn.addEventListener('click', () => {
            loadMovies();
        });
        
        // Modal functionality
        const modal = document.getElementById('movieModal');
        const closeModal = document.querySelector('.close-modal');
        const playTrailerBtn = document.getElementById('playTrailer');
        const trailerContainer = document.getElementById('trailerContainer');
        const closeTrailerBtn = document.getElementById('closeTrailer');
        const trailerFrame = document.getElementById('trailerFrame');
        const watchNowBtn = document.getElementById('watchNowBtn');
        const addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
        
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            trailerFrame.src = '';
            trailerContainer.style.display = 'none';
        });
        
        playTrailerBtn.addEventListener('click', () => {
            const trailerUrl = modal.dataset.trailerUrl;
            if (trailerUrl) {
                trailerFrame.src = trailerUrl + '?autoplay=1';
                trailerContainer.style.display = 'block';
            }
        });
        
        watchNowBtn.addEventListener('click', () => {
            const movieId = parseInt(modal.dataset.movieId);
            openMoviePlayer(movieId);
        });
        
        addToWatchlistBtn.addEventListener('click', () => {
            const movieId = parseInt(modal.dataset.movieId);
            addToWatchlist(movieId);
        });
        
        closeTrailerBtn.addEventListener('click', () => {
            trailerFrame.src = '';
            trailerContainer.style.display = 'none';
        });
        
        // Movie Player controls
        const closePlayerBtn = document.getElementById('closePlayer');
        const minimizePlayerBtn = document.getElementById('minimizePlayer');
        const fullscreenPlayerBtn = document.getElementById('fullscreenPlayer');
        const playButton = document.getElementById('playButton');
        const video = document.getElementById('movieVideo');
        const videoOverlay = document.getElementById('videoOverlay');
        
        closePlayerBtn.addEventListener('click', closeMoviePlayer);
        minimizePlayerBtn.addEventListener('click', minimizePlayer);
        fullscreenPlayerBtn.addEventListener('click', toggleFullscreen);
        
        playButton.addEventListener('click', () => {
            video.play();
            videoOverlay.classList.remove('active');
        });
        
        // Virtual Player Controls
        const rewindBtn = document.getElementById('rewindBtn');
        const forwardBtn = document.getElementById('forwardBtn');
        const cineModeBtn = document.getElementById('cineModeBtn');
        const pipBtn = document.getElementById('pipBtn');
        const subtitlesBtn = document.getElementById('subtitlesBtn');
        const customFullscreenBtn = document.getElementById('fullscreenBtn');
        
        rewindBtn.addEventListener('click', rewindVideo);
        forwardBtn.addEventListener('click', forwardVideo);
        cineModeBtn.addEventListener('click', toggleVirtualCinema);
        pipBtn.addEventListener('click', togglePictureInPicture);
        subtitlesBtn.addEventListener('click', toggleSubtitles);
        customFullscreenBtn.addEventListener('click', toggleFullscreen);
        
        // Speed control
        document.querySelectorAll('.speed-option').forEach(option => {
            option.addEventListener('click', () => {
                const speed = parseFloat(option.dataset.speed);
                changePlaybackSpeed(speed);
            });
        });
        
        // Quality control
        document.querySelectorAll('.quality-option').forEach(option => {
            option.addEventListener('click', () => {
                const quality = option.dataset.quality;
                changeQuality(quality);
            });
        });
        
        // Keyboard shortcuts for video player
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('moviePlayer').style.display === 'block') {
                switch(e.key) {
                    case ' ':
                        e.preventDefault();
                        togglePlayPause();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        rewindVideo();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        forwardVideo();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        video.volume = Math.min(1, video.volume + 0.1);
                        document.getElementById('volumeRange').value = video.volume * 100;
                        updateVolumeIcon();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        video.volume = Math.max(0, video.volume - 0.1);
                        document.getElementById('volumeRange').value = video.volume * 100;
                        updateVolumeIcon();
                        break;
                    case 'm':
                    case 'M':
                        video.muted = !video.muted;
                        updateVolumeIcon();
                        break;
                    case 'f':
                    case 'F':
                        toggleFullscreen();
                        break;
                    case 'c':
                    case 'C':
                        toggleVirtualCinema();
                        break;
                    case 's':
                    case 'S':
                        toggleSubtitles();
                        break;
                }
            }
        });
        
        // Show/hide custom controls (with mobile support)
        const videoWrapper = document.querySelector('.video-wrapper');
        const customControls = document.getElementById('customControls');
        
        // Mouse events for desktop
        videoWrapper.addEventListener('mousemove', () => {
            customControls.classList.add('active');
            clearTimeout(videoWrapper.hideControlsTimeout);
            videoWrapper.hideControlsTimeout = setTimeout(() => {
                if (!video.paused && !isMobileDevice()) {
                    customControls.classList.remove('active');
                }
            }, 3000);
        });
        
        videoWrapper.addEventListener('mouseleave', () => {
            if (!video.paused && !isMobileDevice()) {
                customControls.classList.remove('active');
            }
        });
        
        // Touch events for mobile
        videoWrapper.addEventListener('touchstart', () => {
            customControls.classList.toggle('active');
        });
        
        // Always show controls on mobile
        if (isMobileDevice()) {
            customControls.classList.add('active');
        }
        
        // Video click to toggle controls on mobile
        video.addEventListener('click', (e) => {
            if (isMobileDevice()) {
                e.preventDefault();
                customControls.classList.toggle('active');
            }
        });
        
        // Watchlist sidebar
        const floatingWatchlistBtn = document.getElementById('floatingWatchlistBtn');
        const watchlistSidebar = document.getElementById('watchlistSidebar');
        const closeSidebar = document.getElementById('closeSidebar');
        
        floatingWatchlistBtn.addEventListener('click', () => {
            watchlistSidebar.classList.add('active');
        });
        
        closeSidebar.addEventListener('click', () => {
            watchlistSidebar.classList.remove('active');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!watchlistSidebar.contains(e.target) && !floatingWatchlistBtn.contains(e.target)) {
                watchlistSidebar.classList.remove('active');
            }
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                trailerFrame.src = '';
                trailerContainer.style.display = 'none';
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (trailerContainer.style.display === 'block') {
                    trailerFrame.src = '';
                    trailerContainer.style.display = 'none';
                } else if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (document.getElementById('moviePlayer').style.display === 'block') {
                    closeMoviePlayer();
                } else if (watchlistSidebar.classList.contains('active')) {
                    watchlistSidebar.classList.remove('active');
                }
            }
        });
        
        // Player action buttons
        const likeBtn = document.getElementById('likeBtn');
        const dislikeBtn = document.getElementById('dislikeBtn');
        const saveBtn = document.getElementById('saveBtn');
        
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('active');
            if (dislikeBtn.classList.contains('active')) {
                dislikeBtn.classList.remove('active');
            }
        });
        
        dislikeBtn.addEventListener('click', () => {
            dislikeBtn.classList.toggle('active');
            if (likeBtn.classList.contains('active')) {
                likeBtn.classList.remove('active');
            }
        });
        
        saveBtn.addEventListener('click', () => {
            saveBtn.classList.toggle('active');
            const movieId = parseInt(modal.dataset.movieId);
            if (saveBtn.classList.contains('active')) {
                addToWatchlist(movieId);
            } else {
                removeFromWatchlist(movieId);
            }
        });
    }

    // Service cards 3D effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / centerX * 10;
            const rotateX = (centerY - y) / centerY * 10;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Geometric shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0px) scale(1)';
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#00d4ff' : '#ff4757'};
            color: ${type === 'success' ? '#000' : '#fff'};
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize all animations after loading
    function initializeAnimations() {
        createParticles();
        initializeMovies();
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
                25% { transform: translateY(-50px) translateX(20px) scale(1.2); }
                50% { transform: translateY(-30px) translateX(-20px) scale(0.8); }
                75% { transform: translateY(-70px) translateX(10px) scale(1.1); }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
                console.log('Swiped up');
            } else {
                // Swipe down - could trigger some action
                console.log('Swiped down');
            }
        }
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Update navbar
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update parallax elements
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        // Reset any 3D transforms on resize to prevent layout issues
        const transformElements = document.querySelectorAll('.hero-content, .service-card, .portfolio-item');
        transformElements.forEach(el => {
            el.style.transform = '';
        });
    });

    // Preload critical images for better performance
    function preloadImages() {
        const imageUrls = [
            // Add any image URLs here if you have them
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    preloadImages();

    // Add loading states to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .portfolio-item, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Initialize everything
    console.log('Cinematic website initialized successfully!');
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Browser compatibility checks
function checkBrowserSupport() {
    const supports = {
        css3d: 'transform-style' in document.documentElement.style,
        animations: 'animation' in document.documentElement.style,
        transitions: 'transition' in document.documentElement.style,
        webgl: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
            } catch (e) {
                return false;
            }
        })()
    };
    
    if (!supports.css3d || !supports.animations) {
        console.warn('Some 3D effects may not work on this browser');
        document.body.classList.add('no-3d-support');
    }
    
    return supports;
}

    // Initialize browser support check
    checkBrowserSupport();

    // Mobile device detection
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }