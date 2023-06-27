import ApiCalendar from "react-google-calendar-api";

const googleCalendarConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

// init google calendar api
export const googleCalendar = new ApiCalendar(googleCalendarConfig);
