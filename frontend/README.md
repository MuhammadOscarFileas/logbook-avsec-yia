# YOJO Log Book System - Frontend

A React-based frontend application for managing log book entries, activities, and reports with role-based access control.

## Features

### Authentication System
- **Login Page**: Secure authentication with email and password
- **Registration Page**: User registration with role selection
- **Role-based Access Control**: Three user roles with different permissions
  - **Officer**: Basic train and schedule management
  - **Supervisor**: Enhanced management with user oversight and reports
  - **Super Admin**: Full system control and administration

### Dashboard System
Each role has a customized dashboard with relevant features:

#### Officer Dashboard
- Basic statistics (logs, activities, reports)
- Quick actions for adding logs, activities, and reports
- Recent logs overview
- Navigation to main modules

#### Supervisor Dashboard
- Enhanced statistics including user counts
- Top categories analysis
- Recent user activities
- Management tools for users and reports
- Performance monitoring

#### Super Admin Dashboard
- Complete system overview
- System health monitoring
- System alerts and logs
- User activity tracking
- Administrative tools
- System information and resource usage

### Navigation
- **Responsive Navbar**: Role-based menu items
- **Protected Routes**: Authentication and role-based access control
- **Dynamic Navigation**: Menu items change based on user role

## User Roles and Permissions

### Officer
- View and manage log book entries
- View and manage activities
- View and manage reports
- Basic dashboard access

### Supervisor
- All Officer permissions
- User management
- Reports and analytics
- Activity monitoring
- Performance tracking

### Super Admin
- All Supervisor permissions
- System settings
- System logs
- Backup management
- Full administrative control

## Technology Stack

- **React 18**: Frontend framework
- **React Router**: Client-side routing
- **Bulma CSS**: CSS framework for styling
- **Font Awesome**: Icons
- **Axios**: HTTP client for API calls
- **Context API**: State management for authentication

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing with Dummy Data

The application now uses dummy data for testing purposes. No backend server is required.

### Changing User Role for Testing

To test different dashboards, edit the role in `src/auth/AuthProvider.js`:

```javascript
const dummyUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'officer' // Change this to 'supervisor' or 'superadmin'
};
```

### Available Roles:
- `officer` - Access to Officer Dashboard
- `supervisor` - Access to Supervisor Dashboard  
- `superadmin` - Access to Super Admin Dashboard

### Dummy Data Included:
- **Log Books**: 5 sample log entries with different statuses
- **Activities**: 5 sample activities with various priorities
- **Reports**: 5 sample reports with different types and statuses
- **Dashboard Stats**: Realistic statistics for each role
- **User Activities**: Sample user activity logs
- **System Alerts**: Sample system notifications

## Project Structure

```
src/
├── components/
│   ├── Login.js              # Login page
│   ├── Register.js           # Registration page
│   ├── Navbar.js             # Navigation component
│   ├── Dashboard.js          # Base dashboard (redirects to role-specific)
│   ├── OfficerDashboard.js   # Officer dashboard
│   ├── SupervisorDashboard.js # Supervisor dashboard
│   ├── SuperAdminDashboard.js # Super admin dashboard
│   ├── LogBookList.js        # Log book list component
│   ├── AddLogBook.js         # Add log book component
│   ├── UpdateLogBook.js      # Update log book component
│   ├── ActivitiesList.js     # Activities list component
│   ├── AddActivity.js        # Add activity component
│   ├── UpdateActivity.js     # Update activity component
│   ├── ReportsList.js        # Reports list component
│   ├── GenerateReport.js     # Generate report component
│   ├── ViewReport.js         # View report component
│   └── Home.js               # Original home component
├── auth/
│   ├── AuthProvider.js       # Authentication context provider
│   └── useAuth.js           # Authentication hook
├── api/
│   ├── axiosInstance.js     # Axios configuration
│   └── axiosInterceptor.js  # Request/response interceptors
├── utils/
│   └── config.js            # Configuration utilities
├── Router.js                # Main routing configuration
├── App.js                   # Main app component
├── index.js                 # Entry point
└── index.css                # Custom styles
```

## API Endpoints

The application expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users` - Get current user info

### Dashboard Data
- `GET /api/dashboard/stats` - Basic statistics
- `GET /api/dashboard/supervisor/stats` - Supervisor statistics
- `GET /api/dashboard/superadmin/stats` - Super admin statistics
- `GET /api/dashboard/activities` - Recent activities
- `GET /api/dashboard/top-trains` - Top performing trains
- `GET /api/dashboard/system-alerts` - System alerts
- `GET /api/dashboard/user-activity` - User activity logs
- `GET /api/dashboard/system-logs` - System logs

### Log Book Management
- `GET /api/logbook` - Get log book entries list
- `POST /api/logbook` - Create new log entry
- `PUT /api/logbook/:id` - Update log entry
- `DELETE /api/logbook/:id` - Delete log entry

### Activities Management
- `GET /api/activities` - Get activities list
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Reports Management
- `GET /api/reports` - Get reports list
- `POST /api/reports` - Generate new report
- `GET /api/reports/:id` - Get specific report
- `DELETE /api/reports/:id` - Delete report

## Security Features

- **JWT Token Authentication**: Secure token-based authentication
- **Role-based Access Control**: Route protection based on user roles
- **Protected Routes**: Automatic redirection for unauthorized access
- **Token Validation**: Automatic token validation on app startup
- **Secure Logout**: Proper token cleanup on logout

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Bulma CSS classes for styling
- Implement proper error handling
- Add loading states for better UX

## Notes

- All data is dummy data for demonstration purposes
- No actual API calls are made
- The system automatically logs in with dummy user data
- All routes are accessible for testing

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is part of the YOJO Log Book System.
