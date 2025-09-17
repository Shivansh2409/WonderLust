# ✈️ WonderLust - A Travel & Exploration Platform

![Project Banner](https://your-image-url-here.com/banner.png) A full-stack web application built for travel enthusiasts to discover, share, and review amazing destinations around the world.

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## About The Project

WonderLust is a platform designed to solve the problem of finding unique and well-reviewed travel spots. Users can browse a curated list of destinations, view details and photos, read reviews from other travelers, and even contribute by adding new locations they've discovered.

## ✨ Key Features

* **User Authentication:** Secure user registration and login system (e.g., using Passport.js).
* **CRUD Functionality:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their own destination listings.
* **Reviews and Ratings:** Authenticated users can leave reviews and star ratings on any listing.
* **Interactive Maps:** Integration with a mapping service (like Mapbox or Google Maps) to show destination locations.
* **Image Uploads:** Ability to upload images for new listings (e.g., using Cloudinary).
* **Responsive Design:** A mobile-first design that looks great on all devices.

## 🛠️ Tech Stack

This project is built with the MERN stack and other modern technologies.

* **Frontend:** EJS (Embedded JavaScript templates) / React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** Passport.js (Local Strategy, Google OAuth, etc.)
* **Image Hosting:** Cloudinary / Multer
* **Styling:** Bootstrap / Tailwind CSS
* **Mapping:** Mapbox / Google Maps API

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* **npm**
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Shivansh2409/WonderLust.git](https://github.com/Shivansh2409/WonderLust.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd WonderLust
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. You'll need to get your own API keys and database URL.
    ```env
    MONGO_URL=your_mongodb_connection_string
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    MAPBOX_TOKEN=your_mapbox_api_token
    SECRET=your_session_secret_key
    ```

## 🏃 Usage

To run the application in development mode, execute the following command:

```sh
npm start
