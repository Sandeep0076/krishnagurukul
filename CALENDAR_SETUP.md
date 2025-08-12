# Google Calendar Integration Setup Guide

This guide will help you set up the Google Calendar integration for the Krishna Gurukul School website.

## 🎯 Overview

The calendar integration allows you to:
- Display your school events on the website
- Automatically sync with your Google Calendar
- Show upcoming events in a beautiful, responsive design
- Allow visitors to add events to their own Google Calendar

## 📋 Prerequisites

1. **Google Account**: You need a Google account with access to Google Calendar
2. **Google Cloud Project**: You'll need to create a project in Google Cloud Console
3. **Domain Access**: Your website should be accessible via HTTPS (for production)

## 🚀 Step-by-Step Setup

### Step 1: Get Your Google Calendar ID

1. **Open Google Calendar**: Go to [calendar.google.com](https://calendar.google.com)
2. **Find Your Calendar**: Look for your school calendar in the left sidebar
3. **Access Settings**: Click the three dots (⋮) next to your calendar name
4. **Open Settings**: Select "Settings and sharing"
5. **Get Calendar ID**: Scroll down to "Integrate calendar" section
6. **Copy Calendar ID**: Copy the "Calendar ID" (it looks like `example@gmail.com` or a long string)

### Step 2: Create Google Cloud Project

1. **Go to Google Cloud Console**: Visit [console.cloud.google.com](https://console.cloud.google.com)
2. **Create New Project**: Click "Select a project" → "New Project"
3. **Name Your Project**: Enter a name like "Krishna Gurukul School Calendar"
4. **Create Project**: Click "Create"

### Step 3: Enable Google Calendar API

1. **Open API Library**: In your project, go to "APIs & Services" → "Library"
2. **Search for Calendar**: Search for "Google Calendar API"
3. **Enable API**: Click on "Google Calendar API" → "Enable"

### Step 4: Create API Key

1. **Go to Credentials**: Navigate to "APIs & Services" → "Credentials"
2. **Create Credentials**: Click "Create Credentials" → "API key"
3. **Copy API Key**: Copy the generated API key
4. **Restrict API Key** (Recommended):
   - Click on the API key name
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `*.krishnagurukulschool.in/*`)
   - Under "API restrictions", select "Restrict key" → "Google Calendar API"

### Step 5: Create OAuth 2.0 Client ID

1. **Create OAuth Client**: In Credentials, click "Create Credentials" → "OAuth 2.0 Client IDs"
2. **Configure Consent Screen**: If prompted, configure the OAuth consent screen
3. **Set Application Type**: Choose "Web application"
4. **Add Authorized Origins**: Add your domain (e.g., `https://krishnagurukulschool.in`)
5. **Add Authorized Redirect URIs**: Add `https://krishnagurukulschool.in/calendar.html`
6. **Create Client ID**: Click "Create" and copy the Client ID

### Step 6: Update Configuration

1. **Open Configuration File**: Edit `js/calendar-config.js`
2. **Update Values**: Replace the placeholder values:

```javascript
const CALENDAR_CONFIG = {
    // Replace with your actual Google Calendar ID
    CALENDAR_ID: 'your-calendar-id@gmail.com',
    
    // Replace with your Google API key
    API_KEY: 'your-api-key-here',
    
    // Replace with your Google Client ID
    CLIENT_ID: 'your-client-id.apps.googleusercontent.com',
    
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
```

### Step 7: Test the Integration

1. **Open Calendar Page**: Navigate to `your-domain.com/calendar.html`
2. **Check Display**: Verify the calendar is displaying correctly
3. **Test Navigation**: Try the month navigation buttons
4. **Test Quick Events**: Check if upcoming events are showing

## 🔧 Troubleshooting

### Calendar Not Displaying

**Problem**: Calendar shows "Calendar Setup Required" message
**Solution**: 
- Verify your Calendar ID is correct
- Check that the calendar is public or shared properly
- Ensure the API key has the correct permissions

### API Errors

**Problem**: Console shows API errors
**Solution**:
- Verify your API key is correct
- Check that Google Calendar API is enabled
- Ensure your domain is in the authorized origins

### Events Not Syncing

**Problem**: Events from Google Calendar aren't showing
**Solution**:
- Check that the calendar is public
- Verify the calendar ID is correct
- Ensure events are in the correct timezone

## 🎨 Customization

### Changing Calendar Colors

The calendar uses the website's color scheme. To customize:

1. **Edit CSS**: Modify `css/calendar.css`
2. **Update Colors**: Change the CSS variables in `css/style.css`
3. **Calendar Theme**: The calendar automatically adapts to your website's theme

### Adding More Features

You can extend the calendar with:

1. **Event Details**: Click on events to show more information
2. **Multiple Calendars**: Display multiple calendars
3. **Event Categories**: Color-code events by category
4. **Export Options**: Allow users to export events

## 📞 Support

If you encounter issues:

1. **Check Console**: Open browser developer tools and check for errors
2. **Verify Configuration**: Double-check all IDs and keys
3. **Test Permissions**: Ensure your Google account has proper permissions
4. **Contact Support**: Reach out to your web developer

## 🔒 Security Notes

- **API Key**: Keep your API key secure and restrict it to your domain
- **Client ID**: The client ID is safe to expose in frontend code
- **Calendar Privacy**: Consider making your calendar public for better integration
- **HTTPS**: Always use HTTPS in production for security

## 📈 Performance

The calendar integration is optimized for:
- **Fast Loading**: Minimal impact on page load times
- **Responsive Design**: Works on all device sizes
- **Caching**: Efficient caching of calendar data
- **Accessibility**: WCAG compliant design

---

**Last Updated**: August 2025
**Version**: 1.0 