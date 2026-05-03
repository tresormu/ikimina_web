# IkiminaPass Web Application

A comprehensive web application for the IkiminaPass rotating savings platform, serving treasurers, lenders, and platform administrators.

## Features

### Treasurer Dashboard
- Group overview with member statistics
- Member management and profile viewing
- Contribution tracking with visual grid
- Rotation management with drag-and-drop
- Dispute resolution system
- Earnings and revenue analytics

### Lender Portal
- Credit report search and purchase
- Member credit history viewing
- Billing and invoice management
- Prepaid credit system

### Admin Panel
- Platform-wide user management
- Group and lender oversight
- Dispute escalation handling
- Revenue and analytics dashboard

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom brand colors
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ikimina_web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

- `REACT_APP_API_URL`: Backend API endpoint URL

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base components (Button, Input, etc.)
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components by role
│   ├── treasurer/       # Treasurer dashboard pages
│   ├── lender/          # Lender portal pages
│   ├── admin/           # Admin panel pages
│   ├── auth/            # Authentication pages
│   └── dashboard/       # General dashboard
├── hooks/               # Custom React hooks
├── services/            # API services
├── stores/              # Zustand stores
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── constants/           # App constants
```

## Brand Colors

- Primary: #F97316 (Orange)
- Hover/Darker: #EA580C 
- Active/Deep: #C2410C

These colors are configured in the TailwindCSS theme and used throughout the application for consistency with the mobile app.

## Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Input validation and sanitization
- XSS protection
- CSRF prevention
- Secure token storage
- API request/response encryption

## Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Write tests for new features
4. Ensure all linting passes before committing
