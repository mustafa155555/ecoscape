// Dashboard JavaScript functionality

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeInteractions();
    startDataUpdates();
});

// Initialize Chart.js charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // User Activity Chart
    const userActivityCtx = document.getElementById('userActivityChart').getContext('2d');
    const userActivityChart = new Chart(userActivityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Active Users', 'New Users', 'Returning Users', 'Inactive Users'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#4facfe',
                    '#43e97b'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    // Store chart references for updates
    window.dashboardCharts = {
        revenue: revenueChart,
        userActivity: userActivityChart
    };
}

// Initialize user interactions
function initializeInteractions() {
    // Time range selector
    const timeRangeSelect = document.getElementById('timeRange');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function() {
            updateRevenueChart(this.value);
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Add search functionality here
            console.log('Searching for:', this.value);
        });
    }

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            handleActionClick(action);
        });
    });

    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all links
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Handle navigation (you can add page switching logic here)
            console.log('Navigating to:', this.textContent.trim());
        });
    });

    // User profile click
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Add user profile dropdown or modal here
            console.log('User profile clicked');
        });
    }
}

// Update revenue chart based on time range
function updateRevenueChart(days) {
    const chart = window.dashboardCharts.revenue;
    let labels, data;

    switch(days) {
        case '7':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [5000, 7000, 6000, 8000, 9000, 12000, 10000];
            break;
        case '30':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [25000, 30000, 28000, 35000];
            break;
        case '90':
            labels = ['Month 1', 'Month 2', 'Month 3'];
            data = [120000, 150000, 180000];
            break;
        default:
            return;
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Handle action button clicks
function handleActionClick(action) {
    switch(action) {
        case 'Add User':
            showNotification('Add User', 'Opening user creation form...');
            break;
        case 'Export Data':
            showNotification('Export Data', 'Preparing data export...');
            break;
        case 'Notifications':
            showNotification('Notifications', 'Opening notifications panel...');
            break;
        case 'Settings':
            showNotification('Settings', 'Opening settings panel...');
            break;
        default:
            console.log('Action clicked:', action);
    }
}

// Show notification
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simulate real-time data updates
function startDataUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        updateStats();
    }, 30000);

    // Update activity feed every 60 seconds
    setInterval(() => {
        updateActivityFeed();
    }, 60000);
}

// Update dashboard stats
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statChanges = document.querySelectorAll('.stat-change');
    
    // Simulate small changes
    statNumbers.forEach((stat, index) => {
        const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const change = Math.floor(Math.random() * 100) - 50; // Random change between -50 and +50
        const newValue = Math.max(0, currentValue + change);
        
        // Animate the number change
        animateNumber(stat, currentValue, newValue);
        
        // Update change indicator
        if (statChanges[index]) {
            const changePercent = ((change / currentValue) * 100).toFixed(1);
            statChanges[index].textContent = `${changePercent > 0 ? '+' : ''}${changePercent}%`;
            statChanges[index].className = `stat-change ${changePercent > 0 ? 'positive' : 'negative'}`;
        }
    });
}

// Animate number changes
function animateNumber(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Update activity feed
function updateActivityFeed() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activities = [
        {
            icon: 'fa-user-plus',
            title: 'New user registered',
            description: 'A new user joined the platform',
            time: 'Just now'
        },
        {
            icon: 'fa-shopping-bag',
            title: 'New order placed',
            description: 'Order #' + Math.floor(Math.random() * 100000) + ' worth $' + Math.floor(Math.random() * 500 + 100),
            time: Math.floor(Math.random() * 60) + ' minutes ago'
        },
        {
            icon: 'fa-star',
            title: '5-star review',
            description: 'Customer left a positive review',
            time: Math.floor(Math.random() * 120) + ' minutes ago'
        },
        {
            icon: 'fa-chart-line',
            title: 'Revenue milestone',
            description: 'Monthly revenue target achieved',
            time: Math.floor(Math.random() * 180) + ' minutes ago'
        }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    // Create new activity item
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateY(-20px)';
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="fas ${randomActivity.icon}"></i>
        </div>
        <div class="activity-content">
            <p><strong>${randomActivity.title}</strong></p>
            <span>${randomActivity.description}</span>
            <small>${randomActivity.time}</small>
        </div>
    `;
    
    // Add to the beginning of the list
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Animate in
    setTimeout(() => {
        activityItem.style.transition = 'all 0.3s ease';
        activityItem.style.opacity = '1';
        activityItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove old items if more than 5
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 5) {
        const lastItem = items[items.length - 1];
        lastItem.style.opacity = '0';
        lastItem.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (lastItem.parentNode) {
                lastItem.parentNode.removeChild(lastItem);
            }
        }, 300);
    }
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Export dashboard data
function exportDashboardData() {
    const data = {
        timestamp: new Date().toISOString(),
        stats: {
            users: document.querySelector('.stat-card:nth-child(1) .stat-number').textContent,
            revenue: document.querySelector('.stat-card:nth-child(2) .stat-number').textContent,
            orders: document.querySelector('.stat-card:nth-child(3) .stat-number').textContent,
            growth: document.querySelector('.stat-card:nth-child(4) .stat-number').textContent
        },
        charts: {
            revenue: window.dashboardCharts.revenue.data,
            userActivity: window.dashboardCharts.userActivity.data
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make export function globally available
window.exportDashboardData = exportDashboardData;