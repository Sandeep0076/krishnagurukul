// Calendar Configuration for Krishna Gurukul School
// Update these values with your actual Google Calendar credentials

const CALENDAR_CONFIG = {
    // Replace with your actual Google Calendar ID
    // To find your calendar ID:
    // 1. Go to Google Calendar
    // 2. Click on the three dots next to your calendar name
    // 3. Select "Settings and sharing"
    // 4. Scroll down to "Integrate calendar"
    // 5. Copy the "Calendar ID" (it looks like: example@gmail.com or a long string)
    CALENDAR_ID: 'krishnagurukul2000@gmail.com',
    
    // Replace with your Google API key
    // To get an API key:
    // 1. Go to Google Cloud Console (https://console.cloud.google.com/)
    // 2. Create a new project or select existing one
    // 3. Enable Google Calendar API
    // 4. Go to "Credentials" and create an API key
    API_KEY: 'AIzaSyAsLBeGHrJF4COMo24A8EjX-0a4NYjZiq8',
    
    // Replace with your Google Client ID
    // To get a client ID:
    // 1. In Google Cloud Console, go to "Credentials"
    // 2. Create an "OAuth 2.0 Client ID"
    // 3. Set authorized JavaScript origins to your domain
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',
    
    // Timezone for the calendar (Asia/Kolkata for India)
    TIMEZONE: 'Asia/Kolkata',
    
    // Calendar display settings
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CALENDAR_CONFIG;
} else {
    // Make available globally for browser use
    window.CALENDAR_CONFIG = CALENDAR_CONFIG;
} 