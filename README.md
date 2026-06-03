# YOU

YOU is a production-ready monorepo blueprint for a personal identity, journey, roadmap, journaling, and card-based progression app.

The repository contains exactly two primary applications:

```text
YOU/
├── package.json
├── mobile/   # React Native + TypeScript app
└── backend/  # Node.js + Express + MongoDB API
```

## Prerequisites

Install these before running the project:

- Node.js 20 LTS or newer
- npm 10 or newer
- MongoDB running locally, or a MongoDB Atlas connection string
- Expo/React Native development tooling for mobile builds
- Android Studio for Android emulator builds
- Xcode for iOS builds on macOS

Check your local versions:

```bash
node --version
npm --version
```

## Monorepo Setup

Install workspace dependencies from the repository root:

```bash
npm install
```

Run formatting or linting across both apps:

```bash
npm run format
npm run lint
```

You can also work inside each app directly:

```bash
cd backend
npm run dev
```

```bash
cd mobile
npm run start
```

## Product Scope

The MVP is built around nine core features:

| Feature | Description | App Area |
| --- | --- | --- |
| Authentication | Register, login, JWT-protected sessions | `backend/src/modules/auth`, `mobile/src/screens/auth` |
| Identity Onboarding | Capture who the user is becoming, their goal, and main driver | `onboarding` |
| Driver Cards | Motivational cards tied to the user's identity and progress | `cards` |
| YOUmap | Roadmap levels and tasks for the user's personal path | `roadmap` |
| Progression System | Level and XP tracking | `user`, `roadmap`, `cards` |
| Daily Streak | Habit and journey continuity tracking | `journey`, future streak service |
| Journey Feed | Timeline of progress events and reflections | `journey` |
| AI Journal | User journal text transformed into AI-supported insight | `journal`, `ai` |
| YOU Cards | Collectible identity/progression cards | `cards` |

## Architecture Overview

The backend uses feature-based architecture. Each domain module owns its routes, controller, service, model, and validator. Shared infrastructure lives outside modules.

```text
backend/src/
├── config/       # environment and database setup
├── middleware/   # auth, errors, not-found handling
├── modules/      # feature modules
├── utils/        # shared helpers
├── validators/   # shared validation helpers
├── app.js        # Express app composition
└── server.js     # process bootstrap
```

The mobile app uses a common React Native feature layout:

```text
mobile/src/
├── assets/
├── components/
├── screens/
├── navigation/
├── services/
├── hooks/
├── context/
├── store/
├── utils/
├── constants/
├── theme/
└── types/
```

## Backend Quick Start

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API defaults to:

```text
http://localhost:5000/api/v1
```

Health check:

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "YOU API",
  "version": "v1"
}
```

## Mobile Quick Start

```bash
cd mobile
npm install
npm run start
```

Then run the platform target:

```bash
npm run android
npm run ios
```

Set `API_BASE_URL` in the mobile environment strategy you choose for your React Native runtime. The default API URL in the placeholder service is:

```text
http://localhost:5000/api/v1
```

For Android emulators, `localhost` usually needs to become:

```text
http://10.0.2.2:5000/api/v1
```

## Environment Variables

Backend variables live in [backend/.env.example](/home/rahul/projects/YOU/backend/.env.example).

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | `development`, `test`, or `production` |
| `PORT` | Yes | API server port |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign JWT access tokens |
| `JWT_EXPIRES_IN` | Yes | Token lifetime, for example `7d` |
| `CORS_ORIGIN` | Yes | Allowed frontend origin |
| `OPENAI_API_KEY` | No | AI provider credential |
| `CLAUDE_API_KEY` | No | AI provider credential |
| `GEMINI_API_KEY` | No | AI provider credential |

## API Versioning

All backend routes are mounted under:

```text
/api/v1
```

Current route groups:

| Route | Module |
| --- | --- |
| `/api/v1/auth` | Authentication |
| `/api/v1/users` | User profile/progression |
| `/api/v1/onboarding` | Identity onboarding |
| `/api/v1/roadmaps` | YOUmap |
| `/api/v1/journey` | Journey feed |
| `/api/v1/journals` | AI journal entries |
| `/api/v1/cards` | YOU cards |
| `/api/v1/ai` | AI orchestration |
| `/api/v1/notifications` | Notifications |

## API Endpoint Map

The scaffold includes these initial endpoints:

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/v1/health` | No | API health check |
| `POST` | `/api/v1/auth/register` | No | Create user and return JWT |
| `POST` | `/api/v1/auth/login` | No | Login and return JWT |
| `GET` | `/api/v1/users/me` | Yes | Get current user |
| `PATCH` | `/api/v1/users/me` | Yes | Update current user |
| `GET` | `/api/v1/onboarding/identity` | Yes | Get identity onboarding data |
| `PUT` | `/api/v1/onboarding/identity` | Yes | Create or update identity onboarding |
| `GET` | `/api/v1/roadmaps` | Yes | List user roadmaps |
| `POST` | `/api/v1/roadmaps` | Yes | Create a roadmap |
| `GET` | `/api/v1/journey` | Yes | List journey feed entries |
| `POST` | `/api/v1/journey` | Yes | Create journey feed entry |
| `GET` | `/api/v1/journals` | Yes | List journal entries |
| `POST` | `/api/v1/journals` | Yes | Create journal entry |
| `GET` | `/api/v1/cards` | Yes | List YOU cards |
| `POST` | `/api/v1/cards` | Yes | Create YOU card |
| `POST` | `/api/v1/ai/generate` | Yes | Generate AI roadmap, journal, or card output |
| `GET` | `/api/v1/notifications` | Yes | List notifications |
| `POST` | `/api/v1/notifications` | Yes | Create notification |

## Backend Module Contract

Every standard backend feature module follows this shape:

```text
module-name/
├── module.controller.js
├── module.service.js
├── module.routes.js
├── module.model.js
└── module.validator.js
```

Controllers handle HTTP concerns, services handle business logic, models handle MongoDB persistence, and validators define input rules. Prompts are intentionally kept out of controllers.

## AI Module Contract

AI logic is separated by responsibility:

```text
backend/src/modules/ai/
├── prompts/       # prompt builders
├── providers/     # provider clients
└── ai.service.js  # provider orchestration
```

Provider files are thin wrappers. `ai.service.js` decides which provider method to call, while prompts stay in `prompts/`.

## Authentication Flow

1. User registers through `POST /api/v1/auth/register`.
2. Password is hashed with bcrypt before storage.
3. Backend returns a JWT and user profile.
4. Mobile stores the token using the app's secure storage strategy.
5. Protected API calls send:

```text
Authorization: Bearer <token>
```

6. `authenticate` middleware verifies the token and loads `req.user`.

## Database Models

### User

```js
{
  name,
  email,
  avatar,
  level,
  xp
}
```

### Identity

```js
{
  userId,
  becoming,
  goal,
  driver
}
```

### Roadmap

```js
{
  userId,
  levels,
  tasks
}
```

### JourneyEntry

```js
{
  userId,
  type,
  title,
  description,
  createdAt
}
```

### Journal

```js
{
  userId,
  rawText,
  aiVersion,
  createdAt
}
```

### Card

```js
{
  userId,
  cardNumber,
  rarity,
  level,
  avatar
}
```

## Scripts

Root workspace:

```bash
npm run lint     # lint backend and mobile
npm run format   # format backend and mobile
```

Backend:

```bash
cd backend
npm run dev      # start with nodemon
npm start        # start production server
npm run lint     # run ESLint
npm run format   # run Prettier
```

Mobile:

```bash
cd mobile
npm run start
npm run android
npm run ios
npm run lint
npm run format
```

## Development Workflow

1. Create or update a backend feature in `backend/src/modules/<feature>`.
2. Keep HTTP request and response mapping in the controller.
3. Put business rules in the service.
4. Put persistence rules in the model.
5. Keep validation close to the module.
6. Register routes in `backend/src/app.js` under `/api/v1`.
7. Add mobile API calls in `mobile/src/services`.
8. Add screens under the matching feature folder in `mobile/src/screens`.
9. Add shared mobile UI in `mobile/src/components`.

## Adding A Backend Module

Use the same five-file contract for normal modules:

```text
feature/
├── feature.controller.js
├── feature.service.js
├── feature.routes.js
├── feature.model.js
└── feature.validator.js
```

Then mount it in `backend/src/app.js`:

```js
const featureRoutes = require('./modules/feature/feature.routes');

apiV1.use('/features', featureRoutes);
```

## Adding A Mobile Screen

Place feature screens in `mobile/src/screens/<feature>`, then register them in the root navigator:

```tsx
<Stack.Screen name="Feature" component={FeatureScreen} />
```

Keep API calls in `mobile/src/services` so screens stay focused on rendering and interactions.

## Verification Checklist

Before opening a pull request or handing the app to another developer:

```bash
npm run format
npm run lint
```

For backend syntax-only verification without installing dependencies:

```bash
find backend/src -name '*.js' -print0 | xargs -0 -n 1 node --check
```

## Production Notes

- Use a managed MongoDB provider or a hardened self-hosted MongoDB deployment.
- Use a long, random `JWT_SECRET` and rotate it with a planned invalidation strategy.
- Store mobile auth tokens in secure storage, not plain AsyncStorage.
- Add rate limiting before public release.
- Add request logging and centralized error reporting.
- Add integration tests before locking the API contract.
- Add CI for linting, formatting, and backend tests.

## Folder Tree

```text
YOU/
├── README.md
├── package.json
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── backend/
│   ├── README.md
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── middleware/
│       ├── modules/
│       ├── utils/
│       └── validators/
└── mobile/
    ├── README.md
    ├── App.tsx
    ├── app.json
    ├── index.js
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── assets/
        ├── components/
        ├── screens/
        ├── navigation/
        ├── services/
        ├── hooks/
        ├── context/
        ├── store/
        ├── utils/
        ├── constants/
        ├── theme/
        └── types/
```
