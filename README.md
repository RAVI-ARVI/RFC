# Customer Loan Management Frontend

## Description

This project is a frontend application for managing customer loans and transactions. It provides functionalities for viewing customer details, their associated loans, and payment transactions. The application is built with React and utilizes modern frontend tools and practices.

## Key Features

-   **Customer Management:** View a list of customers with their basic information.
-   **Server-Side Operations:** The main customer table supports server-side pagination, sorting, and filtering for efficient data handling of large datasets.
-   **Customer Details View:** Dedicated page to view comprehensive details of a single customer, including their loans and transaction history.
-   **Loan Information:** Display detailed information for each loan, including principal amount, interest, start/end dates, and status.
-   **Transaction Tracking:** Log and view all payment transactions associated with customers.
-   **Client-Side Pagination:** Implemented for loan and transaction tables within the customer detail view for better UX with smaller datasets.
-   **Responsive UI:** Designed to be usable across different screen sizes.
-   **Modular Structure:** Organized codebase for better maintainability.
-   **Optimistic Updates & Caching:** Utilizes React Query for efficient data fetching, caching, and optimistic updates.

## Tech Stack

-   **Framework:** React.js (with Vite)
-   **Language:** JavaScript (ES6+)
-   **Routing:** React Router DOM
-   **State Management:** React Query (for server state), React Context/useState (for UI state)
-   **Date Utility:** Day.js (replacement for Moment.js)
-   **Styling:** Tailwind CSS, Shadcn/ui components
-   **HTTP Client:** Axios
-   **Linting:** ESLint
-   **Package Management:** npm / yarn

## Prerequisites

-   Node.js (v18.x or later recommended)
-   npm (v9.x or later) or yarn (v1.22.x or later)

## Environment Variables

The application requires the following environment variable to be set in a `.env` file at the root of the project:

```
VITE_API_URL=your_backend_api_url_here
```

Replace `your_backend_api_url_here` with the actual URL of your backend API. For example: `VITE_API_URL=http://localhost:8000/api/v1`

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Create the environment file:**
    Copy the example environment file (if one is provided) or create a new `.env` file in the project root.
    ```bash
    cp .env.example .env
    ```
    (If `.env.example` does not exist, create `.env` manually)

4.  **Set up environment variables:**
    Open the `.env` file and add the necessary environment variables, primarily `VITE_API_URL`.

    ```env
    VITE_API_URL=http://localhost:8000/api/v1
    ```

## Running the Project

-   **Development Mode:**
    To run the application in development mode with hot reloading:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173` (or another port if 5173 is busy).

-   **Production Build:**
    To build the application for production:
    ```bash
    npm run build
    ```
    Or using yarn:
    ```bash
    yarn build
    ```
    This will create an optimized static build in the `dist` directory.

-   **Preview Production Build:**
    To preview the production build locally:
    ```bash
    npm run preview
    ```
    Or using yarn:
    ```bash
    yarn preview
    ```

## Project Structure

A brief overview of the key directories:

```
/public             # Static assets
/src
├── /components     # Reusable UI components (especially Shadcn/ui)
├── /lib            # Utility functions (e.g., Shadcn/ui utils)
├── /Pages          # Top-level page components and their sub-components
├── /routes         # Application routing configuration
├── /utils          # Shared utility functions (e.g., Axios instance)
├── App.jsx         # Main application component, router setup
├── main.jsx        # Entry point of the application
/README.md          # This file
```

## Available npm/yarn Scripts

-   `dev`: Starts the development server.
-   `build`: Creates a production build of the application.
-   `lint`: Lints the codebase using ESLint.
-   `preview`: Serves the production build locally for preview.

(Note: Actual scripts can be found in the `scripts` section of `package.json`)

---

This README provides a comprehensive guide for developers working on or looking to understand the Customer Loan Management Frontend project.
