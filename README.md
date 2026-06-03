# YOU

YOU is a monorepo for a personal growth app built around identity onboarding, a roadmap called the YOUmap, progression, journaling, journey tracking, and collectible YOU Cards.

The repository has two primary applications:

```text
YOU/
├── mobile/   # React Native + TypeScript app
└── backend/  # Node.js + Express + MongoDB API
```

## What This Repo Contains

- React Native mobile app written in TypeScript
- Node.js and Express backend
- MongoDB models with Mongoose
- JWT authentication
- Feature-based backend modules
- API versioning under `/api/v1`
- AI module with prompts separated from controllers
- ESLint and Prettier configuration
- Developer-focused setup and architecture notes

## MVP Features

| Feature | Backend Area | Mobile Area |
| --- | --- | --- |
| Authentication | `backend/src/modules/auth` | `mobile/src/screens/auth` |
| Identity Onboarding | `backend/src/modules/onboarding` | `mobile/src/screens/onboarding` |
| Driver Cards | `backend/src/modules/cards` | `mobile/src/screens/cards` |
| YOUmap | `backend/src/modules/roadmap` | `mobile/src/screens/roadmap` |
| Progression System | `backend/src/modules/user` | `mobile/src/store` |
| Daily Streak | `backend/src/modules/journey` | `mobile/src/screens/home` |
| Journey Feed | `backend/src/modules/journey` | `mobile/src/screens/journey` |
| AI Journal | `backend/src/modules/journal`, `backend/src/modules/ai` | `mobile/src/screens/journal` |
| YOU Cards | `backend/src/modules/cards` | `mobile/src/screens/cards` |

## Prerequisites

Install these before running the project:

- Node.js 20 LTS or newer
- npm 10 or newer
- MongoDB locally or a MongoDB Atlas database
- Expo and React Native development tooling
- Android Studio for Android emulator builds
- Xcode for iOS builds on macOS

Check your local runtime:

```bash
node --version
npm --version
```

## First-Time Setup

Install dependencies from the repo root:

```bash
npm install
```

Create the backend environment file:

```bash
cd backend
cp .env.example .env
```

Update `backend/.env` with your MongoDB URI and JWT secret.

Start the backend:

```bash
npm run dev
```

Start the mobile app in another terminal:

```bash
cd mobile
npm run start
```

Run a platform build:

```bash
npm run android
npm run ios
```

## Environment

Backend variables are documented in `backend/.env.example`.

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NODE_ENV` | Yes | `development` | Runtime mode |
| `PORT` | Yes | `5000` | Backend port |
| `MONGODB_URI` | Yes | `mongodb://127.0.0.1:27017/you` | MongoDB connection |
| `JWT_SECRET` | Yes | `replace-with-a-long-random-secret` | JWT signing secret |
| `JWT_EXPIRES_IN` | Yes | `7d` | Token lifetime |
| `CORS_ORIGIN` | Yes | `http://localhost:8081` | Allowed client origin |
| `OPENAI_API_KEY` | No | empty | OpenAI provider key |
| `CLAUDE_API_KEY` | No | empty | Claude provider key |
| `GEMINI_API_KEY` | No | empty | Gemini provider key |

Mobile API configuration lives in `mobile/src/constants/env.ts`.

```ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:5000';
```

For Android emulators, use your machine host instead of mobile localhost:

```bash
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:5000 npm run start
```

## Scripts

Root workspace:

```bash
npm run lint
npm run format
```

Backend:

```bash
cd backend
npm run dev      # start API with nodemon
npm start        # start API with node
npm run lint     # lint backend source
npm run format   # format backend source
```

Mobile:

```bash
cd mobile
npm run start    # start Expo
npm run android  # run Android build
npm run ios      # run iOS build
npm run lint     # lint mobile source
npm run format   # format mobile source
```

## Backend Architecture

The backend uses feature-based architecture. Shared infrastructure lives in `config`, `middleware`, `utils`, and `validators`. Product behavior lives in `modules`.

```text
backend/src/
├── config/
├── middleware/
├── modules/
├── utils/
├── validators/
├── app.js
└── server.js
```

Every standard module follows this shape:

```text
module-name/
├── module.controller.js
├── module.service.js
├── module.routes.js
├── module.model.js
└── module.validator.js
```

Responsibilities:

- `*.routes.js` defines route paths and middleware.
- `*.controller.js` maps HTTP input and output.
- `*.service.js` owns business logic.
- `*.model.js` owns MongoDB schema and persistence.
- `*.validator.js` owns request validation schemas.

## AI Architecture

Prompts are not stored in controllers. The AI module separates prompts, provider adapters, and orchestration:

```text
backend/src/modules/ai/
├── prompts/
│   ├── roadmap.prompt.js
│   ├── journal.prompt.js
│   └── card.prompt.js
├── providers/
│   ├── openai.js
│   ├── claude.js
│   └── gemini.js
└── ai.service.js
```

Flow:

1. Route receives `POST /api/v1/ai/generate`.
2. Controller validates and forwards input.
3. `ai.service.js` selects the prompt builder.
4. `ai.service.js` selects the provider adapter.
5. The AI request and output are stored through `ai.model.js`.

## Mobile Architecture

The mobile app is organized by reusable app layers and feature screens:

```text
mobile/src/
├── assets/
├── components/
├── constants/
├── context/
├── hooks/
├── navigation/
├── screens/
├── services/
├── store/
├── theme/
├── types/
└── utils/
```

Responsibilities:

- `screens` contains user-facing feature screens.
- `components` contains shared UI.
- `navigation` contains route types and navigators.
- `services` contains API clients.
- `context` contains React context providers.
- `store` is prepared for shared client state.
- `theme` contains colors, spacing, and design constants.
- `types` contains shared TypeScript types.
- `utils` contains pure helpers.

## API Base URL

Backend base URL:

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

## API Endpoints

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/v1/health` | No | Health check |
| `POST` | `/api/v1/auth/register` | No | Register a user |
| `POST` | `/api/v1/auth/login` | No | Login a user |
| `GET` | `/api/v1/users/me` | Yes | Get current profile |
| `PATCH` | `/api/v1/users/me` | Yes | Update current profile |
| `GET` | `/api/v1/onboarding/identity` | Yes | Get identity onboarding |
| `PUT` | `/api/v1/onboarding/identity` | Yes | Save identity onboarding |
| `GET` | `/api/v1/roadmaps` | Yes | List roadmaps |
| `POST` | `/api/v1/roadmaps` | Yes | Create roadmap |
| `GET` | `/api/v1/journey` | Yes | List journey feed entries |
| `POST` | `/api/v1/journey` | Yes | Create journey feed entry |
| `GET` | `/api/v1/journals` | Yes | List journals |
| `POST` | `/api/v1/journals` | Yes | Create journal |
| `GET` | `/api/v1/cards` | Yes | List YOU cards |
| `POST` | `/api/v1/cards` | Yes | Create YOU card |
| `POST` | `/api/v1/ai/generate` | Yes | Generate AI output |
| `GET` | `/api/v1/notifications` | Yes | List notifications |
| `POST` | `/api/v1/notifications` | Yes | Create notification |

Protected routes require:

```text
Authorization: Bearer <token>
```

## Authentication Flow

1. Mobile calls `POST /api/v1/auth/register` or `POST /api/v1/auth/login`.
2. Backend validates the request body with Zod.
3. Passwords are hashed with bcrypt before storage.
4. Backend signs a JWT with `JWT_SECRET`.
5. Mobile stores the token using a secure storage strategy.
6. Mobile sends the token in the `Authorization` header for protected calls.
7. Backend middleware verifies the token and loads `req.user`.

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

The implementation also stores `passwordHash` for authentication.

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

## Development Workflow

1. Add backend behavior inside `backend/src/modules/<feature>`.
2. Keep HTTP mapping in the controller.
3. Keep business rules in the service.
4. Keep MongoDB persistence in the model.
5. Keep input validation in the validator.
6. Register routes in `backend/src/app.js`.
7. Add mobile API calls in `mobile/src/services`.
8. Add mobile screens in `mobile/src/screens/<feature>`.
9. Add shared UI in `mobile/src/components`.
10. Run syntax, lint, and format checks before handoff.

## Adding A Backend Module

Create the module folder:

```text
backend/src/modules/example/
├── example.controller.js
├── example.service.js
├── example.routes.js
├── example.model.js
└── example.validator.js
```

Mount it in `backend/src/app.js`:

```js
const exampleRoutes = require('./modules/example/example.routes');

apiV1.use('/examples', exampleRoutes);
```

## Adding A Mobile Screen

Create a screen folder:

```text
mobile/src/screens/example/
└── ExampleScreen.tsx
```

Register it in `mobile/src/types/navigation.ts`:

```ts
export type RootStackParamList = {
  Example: undefined;
};
```

Register it in `mobile/src/navigation/RootNavigator.tsx`:

```tsx
<Stack.Screen name="Example" component={ExampleScreen} />
```

## Verification

Syntax-check backend JavaScript without installing dependencies:

```bash
find backend/src -name '*.js' -print0 | xargs -0 -n 1 node --check
```

After installing dependencies:

```bash
npm run format
npm run lint
```

## Production Checklist

- Replace development `JWT_SECRET` with a long random secret.
- Use MongoDB Atlas or a hardened MongoDB deployment.
- Add request rate limiting.
- Add centralized logging and error reporting.
- Store mobile auth tokens in secure storage.
- Add integration tests for auth and protected routes.
- Add API contract tests before mobile/backend integration grows.
- Add CI for format, lint, and test checks.
- Add real AI provider SDK calls where provider files currently return placeholders.

## Complete Folder Tree

```text
YOU/
├── README.md
├── package.json
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── backend/
│   ├── README.md
│   ├── package.json
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/
│       │   ├── database.js
│       │   ├── db.js
│       │   ├── env.js
│       │   └── jwt.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── auth.middleware.js
│       │   ├── errorHandler.js
│       │   ├── error.middleware.js
│       │   ├── notFound.middleware.js
│       │   └── validate.js
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.controller.js
│       │   │   ├── auth.model.js
│       │   │   ├── auth.routes.js
│       │   │   ├── auth.service.js
│       │   │   └── auth.validator.js
│       │   ├── user/
│       │   │   ├── user.controller.js
│       │   │   ├── user.model.js
│       │   │   ├── user.routes.js
│       │   │   ├── user.service.js
│       │   │   └── user.validator.js
│       │   ├── onboarding/
│       │   │   ├── onboarding.controller.js
│       │   │   ├── onboarding.model.js
│       │   │   ├── onboarding.routes.js
│       │   │   ├── onboarding.service.js
│       │   │   └── onboarding.validator.js
│       │   ├── roadmap/
│       │   │   ├── roadmap.controller.js
│       │   │   ├── roadmap.model.js
│       │   │   ├── roadmap.routes.js
│       │   │   ├── roadmap.service.js
│       │   │   └── roadmap.validator.js
│       │   ├── journey/
│       │   │   ├── journey.controller.js
│       │   │   ├── journey.model.js
│       │   │   ├── journey.routes.js
│       │   │   ├── journey.service.js
│       │   │   └── journey.validator.js
│       │   ├── journal/
│       │   │   ├── journal.controller.js
│       │   │   ├── journal.model.js
│       │   │   ├── journal.routes.js
│       │   │   ├── journal.service.js
│       │   │   └── journal.validator.js
│       │   ├── cards/
│       │   │   ├── cards.controller.js
│       │   │   ├── cards.model.js
│       │   │   ├── cards.routes.js
│       │   │   ├── cards.service.js
│       │   │   └── cards.validator.js
│       │   ├── ai/
│       │   │   ├── ai.controller.js
│       │   │   ├── ai.model.js
│       │   │   ├── ai.routes.js
│       │   │   ├── ai.service.js
│       │   │   ├── ai.validator.js
│       │   │   ├── prompts/
│       │   │   │   ├── roadmap.prompt.js
│       │   │   │   ├── journal.prompt.js
│       │   │   │   └── card.prompt.js
│       │   │   └── providers/
│       │   │       ├── openai.js
│       │   │       ├── claude.js
│       │   │       └── gemini.js
│       │   └── notifications/
│       │       ├── notifications.controller.js
│       │       ├── notifications.model.js
│       │       ├── notifications.routes.js
│       │       ├── notifications.service.js
│       │       └── notifications.validator.js
│       ├── utils/
│       │   ├── apiError.js
│       │   ├── ApiError.js
│       │   ├── asyncHandler.js
│       │   ├── jwt.js
│       │   └── pick.js
│       └── validators/
│           ├── common.validator.js
│           └── validateRequest.js
└── mobile/
    ├── README.md
    ├── package.json
    ├── app.json
    ├── App.tsx
    ├── babel.config.js
    ├── index.js
    ├── tsconfig.json
    ├── .eslintrc.js
    ├── .prettierrc
    └── src/
        ├── assets/
        │   └── .gitkeep
        ├── components/
        │   ├── AppButton.tsx
        │   └── ScreenPlaceholder.tsx
        ├── constants/
        │   ├── app.ts
        │   └── env.ts
        ├── context/
        │   └── AuthContext.tsx
        ├── hooks/
        │   └── useAuth.ts
        ├── navigation/
        │   ├── AppNavigator.tsx
        │   ├── RootNavigator.tsx
        │   └── routes.ts
        ├── screens/
        │   ├── onboarding/
        │   │   └── OnboardingScreen.tsx
        │   ├── auth/
        │   │   ├── LoginScreen.tsx
        │   │   └── RegisterScreen.tsx
        │   ├── home/
        │   │   └── HomeScreen.tsx
        │   ├── roadmap/
        │   │   └── RoadmapScreen.tsx
        │   ├── journey/
        │   │   └── JourneyScreen.tsx
        │   ├── journal/
        │   │   └── JournalScreen.tsx
        │   ├── cards/
        │   │   └── CardsScreen.tsx
        │   └── profile/
        │       └── ProfileScreen.tsx
        ├── services/
        │   ├── api.ts
        │   └── apiClient.ts
        ├── store/
        │   ├── index.ts
        │   └── useProgressStore.ts
        ├── theme/
        │   ├── colors.ts
        │   ├── index.ts
        │   └── spacing.ts
        ├── types/
        │   ├── auth.ts
        │   ├── index.ts
        │   ├── navigation.ts
        │   └── user.ts
        └── utils/
            ├── formatDate.ts
            └── formatLevel.ts
```

