# Project Accel - Backend API

A comprehensive, production-ready backend API for Project Accel, an Agile project management SaaS platform. Built with Node.js, TypeScript, Express.js, and MongoDB.

## 🚀 Features

### Core Functionality
- **Multi-tenant SaaS Architecture** - Support for multiple workspaces
- **User Management** - Complete CRUD operations with workspace-specific roles
- **Role-Based Access Control (RBAC)** - Granular permissions system
- **Workspace Management** - Auto-generated workspace IDs (WS0001, WS0002, etc.)
- **Invite System** - Email-based workspace invitations
- **Authentication** - JWT with access/refresh tokens
- **Audit Logging** - Complete action tracking

### Security Features
- **JWT Authentication** with access and refresh tokens
- **Password Hashing** with bcryptjs
- **Rate Limiting** on sensitive endpoints
- **CORS Protection** with configurable origins
- **Helmet Security** headers
- **Input Validation** and sanitization

### Permission System
- **17 Modules** with CRUD permissions:
  - **Core**: Projects, Tasks, Sprints, Team, Files, Reports, Workspace
  - **Team Management**: Members, Roles & Permissions
  - **Communication**: Comments, Notifications, Chat, Messages
  - **Administration**: Billing, Integrations, System Settings

### Role Hierarchy
- **Super Admin** - Cross-workspace management
- **Admin** - Full workspace access
- **Manager** - Project and team management
- **Member** - Standard workspace access
- **Guest** - Limited read-only access

## 📋 Prerequisites

- **Node.js** 18+ 
- **MongoDB** 4.4+
- **Docker & Docker Compose** (optional)
- **Redis** (optional, for caching)

## 🛠️ Installation

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projectaccel-v2/api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   
   # Or use your local MongoDB installation
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Option 2: Docker Development

1. **Start services**
   ```bash
   docker-compose --profile dev up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f api-dev
   ```

### Option 3: Production Deployment

1. **Production build**
   ```bash
   docker-compose --profile prod up -d
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Environment
NODE_ENV=development

# Server
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/projectaccel

# JWT Secrets (Change in production!)
JWT_ACCESS_SECRET=your-super-secret-jwt-access-key
JWT_REFRESH_SECRET=your-super-secret-jwt-refresh-key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=12

# Email (for invites)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@projectaccel.com

# Frontend
FRONTEND_URL=http://localhost:3000

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🌱 Database Seeding

To create sample data including a super admin and test workspaces:

```bash
# Development seeding
npm run seed

# Or run directly
npx ts-node src/scripts/seed.ts
```

### Default Accounts Created:
- **Super Admin**: `superadmin@projectaccel.com` / `SuperAdmin123!`
- **Acme Corp Admin**: `admin@acme.com` / `Admin123!`
- **Agency Owner**: `owner@agency.com` / `Owner123!`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
```
POST   /auth/signup           # User registration
POST   /auth/login            # User login
POST   /auth/refresh          # Refresh access token
POST   /auth/logout           # Logout from current device
POST   /auth/logout-all       # Logout from all devices
POST   /auth/switch-workspace # Switch workspace context
GET    /auth/workspaces       # Get user's workspaces
GET    /auth/me               # Get current user profile
```

### User Management
```
GET    /users                 # Get workspace users
POST   /users                 # Create new user
GET    /users/:id             # Get user details
PUT    /users/:id             # Update user
PUT    /users/:id/role        # Update user role
DELETE /users/:id             # Deactivate user
GET    /users/search          # Search all users (Super Admin)
GET    /users/stats           # Get user statistics
```

### Workspace Management
```
GET    /workspaces/:id        # Get workspace details
POST   /workspaces            # Create workspace
PUT    /workspaces/:id        # Update workspace
DELETE /workspaces/:id        # Delete workspace
GET    /workspaces/:id/members # Get workspace members
POST   /workspaces/:id/members # Add member
GET    /workspaces/:id/stats   # Get workspace statistics
```

### Role Management
```
GET    /roles                 # Get workspace roles
POST   /roles                 # Create custom role
GET    /roles/:id             # Get role details
PUT    /roles/:id             # Update role
DELETE /roles/:id             # Delete role
POST   /roles/:id/duplicate   # Duplicate role
GET    /roles/permission-template # Get permission template
```

### Invite Management
```
GET    /invites               # Get workspace invites
POST   /invites               # Send invitation
DELETE /invites/:id           # Revoke invitation
POST   /invites/:id/resend    # Resend invitation
GET    /invites/validate/:token # Validate invite token
POST   /invites/accept        # Accept invitation
```

## 🔐 Authentication Flow

### 1. User Signup
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "Password123!",
    "workspaceName": "My Company"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

### 3. Authenticated Requests
```bash
curl -X GET http://localhost:5000/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🏗️ Architecture

### Project Structure
```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # MongoDB schemas
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── scripts/         # Database scripts
```

### Design Patterns
- **Layered Architecture** - Separation of concerns
- **Repository Pattern** - Data access abstraction
- **Service Layer** - Business logic encapsulation
- **Middleware Pattern** - Request/response processing
- **Singleton Pattern** - Database connection management

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Production Deployment

### Docker Production
```bash
# Build and deploy
docker-compose --profile prod up -d

# Scale API instances
docker-compose --profile prod up -d --scale api=3
```

### Environment Checklist
- [ ] Change all default secrets
- [ ] Configure SMTP for email
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy
- [ ] Set up monitoring
- [ ] Configure backups

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```bash
curl http://localhost:5000/api/v1/health
```

### Database Health
```bash
curl http://localhost:5000/api/v1/health/database
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   ```bash
   # Check MongoDB status
   docker ps | grep mongo
   
   # Restart MongoDB
   docker restart mongodb
   ```

2. **JWT Token Errors**
   ```bash
   # Verify JWT secrets are set
   echo $JWT_ACCESS_SECRET
   ```

3. **Permission Denied**
   ```bash
   # Check user permissions
   curl -X GET http://localhost:5000/api/v1/auth/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## 📈 Performance

- **Database Indexing** - Optimized queries
- **Connection Pooling** - Efficient DB connections
- **Rate Limiting** - API protection
- **Compression** - Response compression
- **Caching** - Redis integration ready

## 🔒 Security

- **Input Validation** - Joi/Express-validator
- **SQL Injection Protection** - Parameterized queries
- **XSS Protection** - Helmet middleware
- **CSRF Protection** - SameSite cookies
- **Rate Limiting** - Express-rate-limit

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@projectaccel.com

---

**Built with ❤️ for modern project management**
