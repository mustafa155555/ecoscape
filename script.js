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

    let currentMovies = [...movieDatabase];
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

    // Movie player functionality
    function openMoviePlayer(movieId) {
        const movie = movieDatabase.find(m => m.id === movieId);
        if (!movie) return;
        
        const player = document.getElementById('moviePlayer');
        const video = document.getElementById('movieVideo');
        const videoSource = video.querySelector('source');
        
        // Set movie details
        document.getElementById('playerTitle').textContent = movie.title;
        document.getElementById('playerYear').textContent = movie.year;
        document.getElementById('playerGenre').textContent = movie.genre.join(', ');
        document.getElementById('playerRating').textContent = `⭐ ${movie.rating}`;
        
        // Set video source
        videoSource.src = movie.movieUrl;
        video.load();
        
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

    // Initialize movies
    function initializeMovies() {
        loadMovies();
        updateWatchlistUI();
        
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
        
        video.addEventListener('play', () => {
            videoOverlay.classList.remove('active');
        });
        
        video.addEventListener('pause', () => {
            if (!video.ended) {
                videoOverlay.classList.add('active');
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