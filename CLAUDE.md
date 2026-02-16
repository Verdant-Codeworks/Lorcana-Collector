# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Illumineer Vault — a fan-made Disney Lorcana trading card game collection tracker, powered by Verdant Codeworks.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Backend**: NestJS + TypeScript + MikroORM + PostgreSQL (`apps/api`)
- **Frontend**: React + Vite + TypeScript + Tailwind CSS v4 + shadcn-style components (`apps/web`)
- **Shared**: Pure TypeScript DTOs, enums, types (`packages/shared`)
- **Auth**: Email/password + Google/Discord OAuth via Passport.js + JWT

## Common Commands

```bash
pnpm install                                  # Install all workspace deps
pnpm build                                    # Build all packages
pnpm --filter @illumineer-vault/shared build  # Build shared types
pnpm --filter @illumineer-vault/api build     # Build backend
pnpm --filter @illumineer-vault/api dev       # Run backend in dev mode
pnpm --filter @illumineer-vault/web build     # Build frontend
pnpm --filter @illumineer-vault/web dev       # Run frontend dev server
```

## Architecture

- `packages/shared` — Shared DTOs, enums (Color, CardType, Rarity, SetId), and TypeScript interfaces
- `apps/api` — NestJS backend with MikroORM entities (Card, Set, User, Collection, CollectionCard), Passport auth, card sync cron from Lorcast API (lorcast.com)
- `apps/web` — React SPA with Zustand auth store, TanStack Query for server state, React Router

## Database

PostgreSQL with 5 tables: users, sets, cards, collections, collection_cards. Cards sync from external API every 6 hours.

## Environment

Copy `.env.example` to `.env` and configure database credentials, JWT secret, and OAuth client IDs.
