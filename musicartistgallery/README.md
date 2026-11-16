# Music Artists' Gallery and Booking Service

## Table of Contents
- [Description](#description)
- [Features](#features)
  - [Client Side](#client-side)
  - [Artist Side](#artist-side)
  - [Admin Side](#admin-side)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Contact Information](#contact-information)
- [Collaborators](#collaborators)
- [Future Improvements](#future-improvements)
- [Feedback](#feedback)

## Description

Immerse yourself in a world of music and connect with your favorite artists. Explore a diverse gallery of talented musicians, listen to their tracks, and easily access their music on platforms like YouTube. Our core feature allows you to effortlessly book artists for events and gigs, making it simple to bring live music to your occasions. Plus, save and like your favorites to curate a personalized library. Experience the perfect blend of discovery, connection, and booking, all in one place!

## Features

### Client Side
- **About**: View the purpose of the website and its functionality.
- **Genre List**: View available artists by genre.
- **Artists**: Search and discover artists. Through a modal, you can book artists directly from their profiles and view their channel and top hits.
- **Library**: Access liked artists and recently booked artists.
- **Contact**: Fill out a form to contact us or send messages to specific artists.

### Artist Side
- **Profile Verification**: Artists can request verification, which is reviewed by the admin.
- **Artists**: View other artists for potential gigs or collaborations.
- **Contact**: Similar to the client side for communication.

### Admin Side
- **Pending Artists**: Approve or decline artist verification requests.
- **Pending Bookings**: Manage the finalization of bookings from clients to artists.
- **Verified Artists**: View the list of verified artists.
- **Contact**: Send emails to artists if there are concerns regarding bookings.

## Tech Stack
- **React**: A JavaScript library for building user interfaces. This project transitioned from a setup using HTML and CSS to React.js for a more dynamic and interactive experience.
- **React Router**: A library for navigation and routing in React applications.
- **JSX**: A syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.
- **CSS**: External CSS files are used for styling the components, providing a clear separation of structure and design.
- **Bootstrap**: Utilized for certain UI elements, such as icons (e.g., bi bi-person, magnifying glass) and verification badges, to enhance the visual design and responsiveness.
- **API**: Utilizes SheetDB for registration and login processes, as well as role selection (client, artist, admin) to determine the appropriate navigation bar for each user type. Additionally, the API is used on the admin side for verifying artists when they submit verification requests. This ensures a tailored user experience and efficient management of artist verification.
- **React Hooks**: Functions like `useLocation`, `useState`, and `useEffect` that enable you to manage component state and lifecycle events in functional components.
- **Axios**: Used for sending and receiving data (verifying artists) using web requests, without reloading the page.


## Installation
To set up the project locally, follow these steps:
1. Download the project files from Google Drive to your local machine.
2. Navigate to the project directory in your terminal:
   cd *project name*
3. Install the dependencies:
    npm install
4. Start the development server:
    npm start
Your app should now be running on http://localhost:3000.

## How It Works
Clients can explore artists, make bookings, and easily communicate through the platform using the contact feature for sending emails. Artists can request verification, which submits their information to the admin for confirmation via Axios to a SheetDB. Their availability is displayed on their profile, and booking status is updated once accepted. Admins can view and finalize the upcoming gigs through pending bookings from clients to artists and manage artist verifications effectively.

## Contact Information
This project was developed by Calvin Jacob Bellen and Francine Anne Bhaunani. Feel free to reach out via email at bfd0233@dlsud.edu.ph.

## Collaborators
This project was completed as a pair for our college course “Web Development” in BIT33.

## Future Improvements
We plan to make this project more functional once a backend is established.

## Feedback
My pair and I welcome any feedback or suggestions for improvement!