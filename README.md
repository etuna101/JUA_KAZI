# Local Services Marketplace

A web platform connecting local service providers (artisans, house helps, etc.) with customers.

## Tech Stack

### Frontend
- React.js
- Material-UI for components
- Redux for state management
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MySQL Database
- JWT for authentication
- CORS middleware

### Hosting
- Frontend: Vercel/Netlify
- Backend: Heroku/AWS
- Database: AWS RDS/PlanetScale

## Project Structure
```
JuaKazi/
├── frontend/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── theme.ts
├── backend/                  # Node.js/Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── app.js
└── README.md
```

## Features

### For Service Providers
- Profile creation and management
- Service listing and pricing
- Booking management
- Earnings tracking
- Reviews and ratings

### For Customers
- Service search and filtering
- Booking and payment
- Provider reviews and ratings
- Booking history
- Chat with providers

## Setup Instructions

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file based on your configuration):
   ```bash
   cp .env.example .env
   # Edit .env with your DB and JWT settings
   ```
4. Start development server:
   ```bash
   npm start
   # or
   node app.js
   ```

## Database Schema

### Users Table
- id (Primary Key)
- username
- email
- password_hash
- user_type (provider/customer)
- created_at
- updated_at

### Service Providers Table
- id (Primary Key)
- user_id (Foreign Key)
- business_name
- description
- service_type
- hourly_rate
- availability
- location
- rating

### Services Table
- id (Primary Key)
- provider_id (Foreign Key)
- title
- description
- price
- category
- status

### Bookings Table
- id (Primary Key)
- service_id (Foreign Key)
- customer_id (Foreign Key)
- provider_id (Foreign Key)
- booking_date
- status
- total_amount
- payment_status

### Reviews Table
- id (Primary Key)
- booking_id (Foreign Key)
- rating
- comment
- created_at

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### Users
- GET /api/users/profile
- PUT /api/users/profile
- GET /api/users/{id}

### Services
- GET /api/services
- POST /api/services
- GET /api/services/{id}
- PUT /api/services/{id}
- DELETE /api/services/{id}

### Bookings
- POST /api/bookings
- GET /api/bookings
- GET /api/bookings/{id}
- PUT /api/bookings/{id}/status

### Reviews
- POST /api/reviews
- GET /api/reviews/service/{service_id}
- GET /api/reviews/provider/{provider_id}

## Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   npm run build
   ```
2. Deploy to Vercel/Netlify

### Backend Deployment
1. Set up environment variables on hosting platform
2. Deploy to Heroku/AWS
3. Set up database on AWS RDS/PlanetScale

## Security Considerations
- Implement JWT authentication
- Use HTTPS
- Input validation
- Rate limiting
- Data encryption
- Regular security audits

## Future Enhancements
- Real-time chat
- Push notifications
- Mobile app
- Payment gateway integration
- Analytics dashboard
- Service provider verification system 