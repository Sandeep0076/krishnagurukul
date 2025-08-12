// Calendar functionality for Krishna Gurukul School
// This file handles Google Calendar integration and calendar navigation

class SchoolCalendar {
    constructor() {
        this.currentDate = new Date();
        this.config = window.CALENDAR_CONFIG || {
            CALENDAR_ID: 'YOUR_GOOGLE_CALENDAR_ID',
            API_KEY: 'YOUR_GOOGLE_API_KEY',
            CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',
            TIMEZONE: 'Asia/Kolkata',
            DISPLAY_SETTINGS: {
                mode: 'MONTH',
                showTitle: false,
                showNav: true,
                showDate: true,
                showPrint: false,
                showTabs: true,
                showCalendars: false,
                showTz: false,
                height: 600
            }
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCalendarDisplay();
        this.loadQuickEvents();
        this.setupGoogleCalendarIntegration();
    }

    setupEventListeners() {
        // Today button
        const todayBtn = document.getElementById('today-btn');
        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // Navigation buttons
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateMonth(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateMonth(1));
        }

        // Add to Google Calendar button
        const addToGoogleBtn = document.getElementById('add-to-google');
        if (addToGoogleBtn) {
            addToGoogleBtn.addEventListener('click', () => this.addToGoogleCalendar());
        }
    }

    updateCalendarDisplay() {
        const monthElement = document.getElementById('current-month');
        if (monthElement) {
            const options = { year: 'numeric', month: 'long' };
            monthElement.textContent = this.currentDate.toLocaleDateString('en-US', options);
        }
    }

    navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.updateCalendarDisplay();
        this.updateCalendarIframe();
    }

    goToToday() {
        this.currentDate = new Date();
        this.updateCalendarDisplay();
        this.updateCalendarIframe();
    }

    updateCalendarIframe() {
        const iframe = document.getElementById('google-calendar');
        if (iframe) {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth() + 1;
            const monthStr = month.toString().padStart(2, '0');
            const nextMonth = month === 12 ? 1 : month + 1;
            const nextMonthStr = nextMonth.toString().padStart(2, '0');
            const nextYear = month === 12 ? year + 1 : year;
            
            const startDate = `${year}${monthStr}01`;
            const endDate = `${nextYear}${nextMonthStr}01`;
            
            const settings = this.config.DISPLAY_SETTINGS;
            const newSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(this.config.CALENDAR_ID)}&ctz=${encodeURIComponent(this.config.TIMEZONE)}&mode=${settings.mode}&showTitle=${settings.showTitle ? 1 : 0}&showNav=${settings.showNav ? 1 : 0}&showDate=${settings.showDate ? 1 : 0}&showPrint=${settings.showPrint ? 1 : 0}&showTabs=${settings.showTabs ? 1 : 0}&showCalendars=${settings.showCalendars ? 1 : 0}&showTz=${settings.showTz ? 1 : 0}&height=${settings.height}&dates=${startDate}%2F${endDate}`;
            
            iframe.src = newSrc;
        }
    }

    setupGoogleCalendarIntegration() {
        // Check if Google Calendar ID is configured
        if (this.config.CALENDAR_ID === 'YOUR_GOOGLE_CALENDAR_ID') {
            console.warn('Google Calendar ID not configured. Please update the calendar-config.js file.');
            this.showCalendarSetupMessage();
            return;
        }

        // Load Google Calendar API if needed
        if (typeof gapi !== 'undefined') {
            gapi.load('client:auth2', this.initGoogleCalendarAPI.bind(this));
        } else {
            // Fallback: Load Google Calendar API script
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = () => {
                gapi.load('client:auth2', this.initGoogleCalendarAPI.bind(this));
            };
            document.head.appendChild(script);
        }
    }

    initGoogleCalendarAPI() {
        if (this.config.API_KEY === 'YOUR_GOOGLE_API_KEY') {
            console.warn('Google API key not configured. Some features may not work.');
            return;
        }

        gapi.client.init({
            apiKey: this.config.API_KEY,
            clientId: this.config.CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
            console.log('Google Calendar API initialized');
        }).catch(error => {
            console.error('Error initializing Google Calendar API:', error);
        });
    }

    showCalendarSetupMessage() {
        const calendarEmbed = document.querySelector('.calendar-embed');
        if (calendarEmbed) {
            calendarEmbed.innerHTML = `
                <div class="calendar-loading">
                    <div class="info-card">
                        <h4><i class="fas fa-info-circle"></i> Calendar Setup Required</h4>
                        <p>To display the school calendar, please:</p>
                        <ol style="margin-left: 1.5rem; margin-top: 1rem;">
                            <li>Open <code>js/calendar-config.js</code></li>
                            <li>Replace <code>YOUR_GOOGLE_CALENDAR_ID</code> with your actual Google Calendar ID</li>
                            <li>Replace <code>YOUR_GOOGLE_API_KEY</code> with your Google API key</li>
                            <li>Replace <code>YOUR_GOOGLE_CLIENT_ID</code> with your Google Client ID</li>
                        </ol>
                        <p style="margin-top: 1rem;"><strong>Note:</strong> The calendar will automatically sync with your Google Calendar once configured.</p>
                    </div>
                </div>
            `;
        }
    }

    async loadQuickEvents() {
        try {
            // Load events from the existing events.json
            const response = await fetch('/data/events.json');
            const events = await response.json();
            
            this.displayQuickEvents(events);
        } catch (error) {
            console.error('Error loading events:', error);
            this.displayQuickEvents([]);
        }
    }

    displayQuickEvents(events) {
        const quickEventsContainer = document.getElementById('quick-events');
        if (!quickEventsContainer) return;

        quickEventsContainer.innerHTML = '';

        if (events.length === 0) {
            quickEventsContainer.innerHTML = `
                <div class="quick-event-card">
                    <h4>No upcoming events</h4>
                    <p>Check back soon for new events and activities!</p>
                </div>
            `;
            return;
        }

        // Sort events by date and get upcoming events
        const upcomingEvents = events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 6);

        upcomingEvents.forEach(event => {
            const eventCard = this.createEventCard(event);
            quickEventsContainer.appendChild(eventCard);
        });
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'quick-event-card';
        
        const date = new Date(event.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        card.innerHTML = `
            <h4>${event.title}</h4>
            <div class="event-date">
                <i class="fas fa-calendar-alt"></i> ${formattedDate}
                ${event.time ? `<i class="fas fa-clock"></i> ${event.time}` : ''}
            </div>
            ${event.location ? `<div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>` : ''}
            ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
        `;

        return card;
    }

    addToGoogleCalendar() {
        if (this.config.CALENDAR_ID === 'YOUR_GOOGLE_CALENDAR_ID') {
            alert('Please configure your Google Calendar ID first. See js/calendar-config.js for instructions.');
            return;
        }
        
        // Create a link to add the school calendar to Google Calendar
        const calendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(this.config.CALENDAR_ID)}`;
        window.open(calendarUrl, '_blank');
    }

    // Method to refresh calendar data
    refreshCalendar() {
        this.loadQuickEvents();
        this.updateCalendarIframe();
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SchoolCalendar();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchoolCalendar;
} 