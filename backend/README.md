# YOU Backend

Node.js, Express, MongoDB, and JWT API for YOU.

## Start

```bash
npm install
cp .env.example .env
npm run dev
```

Base URL:

```text
http://localhost:5000/api/v1
```

## Architecture

This API uses feature-based modules. Each feature owns its controller, service, routes, model, and validator. Shared code belongs in `config`, `middleware`, `utils`, or `validators`.

## Auth

Protected routes use:

```text
Authorization: Bearer <token>
```

The token is verified by `src/middleware/auth.middleware.js`.

## AI

Prompts live in `src/modules/ai/prompts`. Provider wrappers live in `src/modules/ai/providers`. Controllers should call services, never prompt files directly.

