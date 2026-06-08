# User Management Dashboard

## Project Overview

A responsive User Management Dashboard built using React, TypeScript, Vite, and Tailwind CSS.

The application consumes user data from the JSONPlaceholder API and provides powerful user management features including search, filtering, sorting, pagination, favorites, CSV export, dark mode, and detailed user profiles.

API Used:

https://jsonplaceholder.typicode.com/users

---

## Features

### User Listing

* Displays users in a responsive card layout
* Shows:

  * Name
  * Username
  * Email
  * Phone
  * Website
  * Company Name
  * City

### Search

* Real-time search
* Case-insensitive filtering
* Search by:

  * Name
  * Username
  * Email

### Sorting

* Name (Ascending / Descending)
* Username (Ascending / Descending)
* Email (Ascending / Descending)

### Filtering

* Filter by Company
* Filter by City

### Pagination

* Client-side pagination
* 5 users per page
* Previous / Next navigation
* Current page indicator

### User Details Page

Displays:

* Basic Information
* Address Information
* Company Information

### Favorites

* Mark users as favorites
* Remove favorites
* Stored using localStorage

### CSV Export

* Export filtered users as CSV

### Dark Mode

* Light/Dark theme toggle
* Theme persistence using localStorage

### Error Handling

* API failure handling
* Retry button

### Loading State

* Loading spinner while fetching data

### Performance Optimizations

* Debounced search (400ms)
* useMemo
* useCallback
* React.memo
* Lazy Loading using React.lazy and Suspense

### Responsive Design

* Mobile
* Tablet
* Desktop

---

## Tech Stack

* React
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Axios / Fetch API
* Jest
* React Testing Library
* ESLint
* Prettier

---

## Project Structure

src/

├── components/

├── hooks/

├── pages/

├── services/

├── tests/

├── types/

├── utils/

├── assets/

└── App.tsx

---

## Installation

### Clone Repository

git clone <repository-url>

### Navigate to Project

cd user-management-dashboard

### Install Dependencies

npm install

### Start Development Server

npm run dev

---

## Build Project

npm run build

---

## Run Tests

npm test

---

## Performance Optimizations Implemented

### Debounced Search

Implemented using a custom useDebounce hook to reduce unnecessary filtering operations.

### Memoization

Used:

* useMemo
* useCallback
* React.memo

to minimize re-renders and improve performance.

### Lazy Loading

User Detail Page is lazy loaded using:

* React.lazy
* Suspense

This reduces the initial bundle size.

---

## Assumptions

* API data is read-only.
* Favorites are stored locally using localStorage.
* Pagination is implemented on the client side.
* CSV export exports currently filtered users.

---

## Screenshots

Add screenshots of:

1. Dashboard Page
2. Search Functionality
3. Filters
4. User Detail Page
5. Dark Mode
6. Favorites Feature

---

## Future Improvements

* TanStack Query integration
* Zustand state management
* Advanced table view
* Accessibility improvements
* CI/CD pipeline using GitHub Actions
* Docker support

---

## Author

Gayathri M R

Frontend Intern Assessment Submission
