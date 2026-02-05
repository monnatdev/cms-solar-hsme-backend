# Solar Cell CMS - Backend (Payload CMS)

This is the backend repository for the Solar Cell CMS system, built with Payload CMS 2.0+.

## Tech Stack

- **Payload CMS 2.0+**: Headless CMS for content management
- **Express.js**: Web server framework
- **MongoDB**: Database for storing content
- **TypeScript**: Type-safe development

## Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URI`: MongoDB connection string
- `PAYLOAD_SECRET`: Secret key for Payload CMS (use a strong random string in production)
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

### 3. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

For local MongoDB:
```bash
mongod
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3001` and the admin panel will be available at `http://localhost:3001/admin`.

### 5. Create First Admin User

On first run, navigate to `http://localhost:3001/admin` and create your first admin user.

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm run serve`: Run production build
- `npm run generate:types`: Generate TypeScript types from Payload config
- `npm run lint`: Run ESLint

## Project Structure

```
backend/
├── src/
│   ├── server.ts           # Express server setup
│   ├── payload.config.ts   # Payload CMS configuration
│   ├── collections/        # Payload collections (to be added)
│   └── payload-types.ts    # Generated TypeScript types
├── dist/                   # Compiled JavaScript (generated)
├── media/                  # Uploaded media files (generated)
├── .env                    # Environment variables (not in git)
├── .env.example            # Example environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

Once running, the following endpoints are available:

- `GET /admin`: Admin panel UI
- `GET /api/users`: Users API
- `GET /health`: Health check endpoint

Additional collection endpoints will be added as collections are created.

## CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `FRONTEND_URL` environment variable. By default, this is set to `http://localhost:3000`.

## MongoDB Connection

The backend connects to MongoDB using the connection string in `DATABASE_URI`. 

Example connection strings:
- Local: `mongodb://localhost:27017/solar-cell-cms`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/solar-cell-cms`

## Security Notes

- Always use a strong, random `PAYLOAD_SECRET` in production
- Never commit `.env` file to version control
- Use environment-specific configuration for different deployment environments
- Enable MongoDB authentication in production

## Next Steps

1. Add collections for Articles, Services, Reviews, Leads, and Media
2. Configure access control for each collection
3. Set up media upload handling
4. Add custom validation hooks
5. Configure SEO fields

## Troubleshooting

### MongoDB Connection Issues

If you see connection errors:
1. Ensure MongoDB is running
2. Check the `DATABASE_URI` in `.env`
3. Verify network connectivity to MongoDB

### Port Already in Use

If port 3001 is already in use, change the `PORT` in `.env` to another port.

### CORS Errors

If you see CORS errors from the frontend:
1. Verify `FRONTEND_URL` in `.env` matches your frontend URL
2. Ensure the frontend is running on the specified URL

## Documentation

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
