# Project_Name — Developer Guide

> **Project_Name** — Full-stack application with NestJS backend, Next.js frontend, and Flutter mobile app.
>
> This guide is step by step guideline to start new fullstack project and for new developers joining the project. It covers architecture, conventions, and step-by-step instructions for adding new modules.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. Getting Started](#3-getting-started)
- [4. Backend Architecture (NestJS)](#4-backend-architecture-nestjs)
  - [4.1 Directory Structure](#41-directory-structure)
  - [4.2 Clean Architecture Layers](#42-clean-architecture-layers)
  - [4.3 Request Lifecycle](#43-request-lifecycle)
  - [4.4 Database & Prisma](#44-database--prisma)
  - [4.5 Authentication & Authorization](#45-authentication--authorization)
  - [4.6 Shared Utilities](#46-shared-utilities)
  - [4.7 API Response Format](#47-api-response-format)
  - [4.8 Step-by-Step: Adding a New Backend Module](#48-step-by-step-adding-a-new-backend-module)
- [5. Frontend Architecture (Next.js)](#5-frontend-architecture-nextjs)
  - [5.1 Directory Structure](#51-directory-structure)
  - [5.2 Clean Architecture Layers](#52-clean-architecture-layers)
  - [5.3 BFF Proxy Pattern](#53-bff-proxy-pattern)
  - [5.4 Authentication & RBAC](#54-authentication--rbac)
  - [5.5 Key Patterns & Components](#55-key-patterns--components)
  - [5.6 State Management](#56-state-management)
  - [5.7 Step-by-Step: Adding a New Frontend Module](#57-step-by-step-adding-a-new-frontend-module)
- [6. Adding a Complete Feature End-to-End](#6-adding-a-complete-feature-end-to-end)
- [7. Environment Variables](#7-environment-variables)
- [8. Database Migrations](#8-database-migrations)
- [9. Coding Conventions](#9-coding-conventions)
- [10. Common Patterns Reference](#10-common-patterns-reference)

---

## 1. Project Overview

Define in short about the project

| Domain          | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| **RBAC**        | Users, Roles, Permissions, Audit Logs                                |
| **Geography**   | Region → Zone → Woreda → Kebele (Ethiopian administrative hierarchy) |
| **Master Data** | Will list Later                                                      |
| **Admin**       | Demand Windows, System Configuration                                 |
| **Dashboard**   | Analytics and reporting endpoints                                    |

---

## 2. Tech Stack

### Backend (`backend/`)

| Technology         | Version | Purpose                         |
| ------------------ | ------- | ------------------------------- |
| NestJS             | 11.x    | Application framework           |
| TypeScript         | 5.9     | Language                        |
| Prisma             | 7.10.x  | ORM + migrations                |
| PostgreSQL         | 16.x    | Database                        |
| Zod                | 4.5.x   | Runtime DTO validation          |
| Passport + JWT     | —       | Authentication                  |
| Swagger            | —       | API documentation (`/api/docs`) |
| Helmet + Throttler | —       | Security + rate limiting        |

### Frontend (`frontend/`)

| Technology     | Version  | Purpose                       |
| -------------- | -------- | ----------------------------- |
| Next.js        | 16.x     | React framework (App Router)  |
| React          | 19.x     | UI library                    |
| TypeScript     | 5.9.x    | Language                      |
| NextAuth v5    | 5.0-beta | Authentication (JWT strategy) |
| TanStack Query | 5.x      | Server-state management       |
| Zustand        | 5.x      | Client-state management       |
| shadcn/ui      | 4.x      | Component library             |
| Tailwind CSS   | 4.x      | Styling                       |
| Axios          | 1.x      | HTTP client                   |
| Formik + Zod   | —        | Form handling + validation    |
| Recharts       | 3.x      | Dashboard charts              |

---

## 3. Complete Full-Stack Development Roadmap

                    FMS SYSTEM
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      Web Browser    Mobile App    PostgreSQL
          │             │
          ▼             ▼
      Next.js        Flutter
       Frontend
          │
          │ HTTPS/HTTP
          ▼
      BFF / API
          │
          ▼
      NestJS Backend
          │
          ▼
        Prisma
          │
          ▼
      PostgreSQL


### PART 0: Understand the System Before Coding

- Understand the business of the system

### PART 1: Define Requirements

- Before database design, define what the system must actually do.

### 1.1 Identify users/|Roles

- Admin, Woreda user and other

- Then define what can this user can did

### 1.2 Define organizational hierarchy

    Region
       ↓
    Zone
       ↓
    Woreda
       ↓
    Kebele
    ***********

- Below can help as for RBAC and database queries
  Federal user
  ↓
  Can see all regions

  Regional user
  ↓
  Can see only their region

  Zone user
  ↓
  Can see only their zone

  Woreda user
  ↓
  Can see only their woreda

  Kebele user
  ↓
  Can see only their kebele

## 4. Design the System

### 4.1 High-level architecture

                    INTERNET / LAN
                          │
                          ▼
                    Next.js 16
                     Frontend
                          │
                     /api/v1/*
                          │
                          ▼
                    BFF Proxy
                          │
                          ▼
                    NestJS 11
                     Backend
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ▼             ▼             ▼
          Auth          RBAC        Business Modules
            │             │             │
            └─────────────┼─────────────┘
                          │
                          ▼
                       Prisma
                          │
                          ▼
                    PostgreSQL


## 5. Decide the Project Structure

    n3project/
    │
    ├── backend/
    ├── frontend/
    ├── node_modules/
    ├── docker-compose.yml
    └── ...

### 5.1. Project structure 1 - Two independent npm projects:

    n3project/
    ├── backend/
    │   └── package.json
    └── frontend/
    	└── package.json


### 5.2. Project structure 2 - monorepo/workspace.

## 6. Getting Started

### 6.1 Install/check

- Node.js | node --version
- npm | npm --version
- PostgreSQL | psql --version (PostgreSQL is installed locally)
- Git | git --version
- VS Code
- Docker | docker --version

### 6.2. Create Project Directory

    mkdir n3project
    cd n3project

### 6.3. Stepup PostgreSQL with Docker

- before prisma understand PostgreSQL architecture

  PostgreSQL Server
  │
  ▼
  N3 Database
  │
  ▼
  Prisma
  │
  ▼
  NestJS

- Lets use docker for postgresql, by creating docker-compose.yml under root folder.
  Docker
  │
  └── PostgreSQL container
  │
  ├── Database: db_name
  ├── Port: 5432
  └── Persistent volume

  n3project/
  frontend/
  backend/
  docker-compose.yml

#### and put for docker-compose.yml:

    ```bash
    services:
      postgres:
    	image: postgres:16
    	container_name: n3-postgres
    	restart: unless-stopped
    	environment:
    	  POSTGRES_USER: postgres
    	  POSTGRES_PASSWORD: postgres
    	  POSTGRES_DB: n3_db
    	ports:
    	  - "5432:5432"
    	volumes:
    	  - postgres_data:/var/lib/postgresql/data

    volumes:
      postgres_data:

````
#### Start PostgreSQL
	docker compose up -d

#### Check
	docker ps

## 7. Git Setup
- Initialize Git
	git init
- Create .gitignore and add minimium of
	```bash
	node_modules/
	.env
	.env.local
	dist/
	.next/
	coverage/
	*.log
	```
- after the basic project structure works , create the first commit
	git add .
	git commit -m "chore: initialize project"

## 8. Backend Initialization
### 8.1 build NestJS
	backend/

	npm install -g @nestjs/cli
	nest new backend

	√ Which package manager would you ❤️  to use? ### npm
	√ Would you like to enable auto-instrumented observability (@nestjs/observe)? ### N
	√ Which module system would you like to use? ### ESM (ES Modules)         [ with vitest ]

### 8.2 install libraries inside of backend folder
	#### dotenv
		npm install dotenv

	#### Prisma
		npm install prisma@7.5.0 @prisma/client@7.5.0

	#### PostgreSQL driver
		npm install pg
		npm install -D @types/pg

	#### Zod
		npm install zod

	#### JWT
		npm install @nestjs/jwt

	#### Passport
		npm install @nestjs/passport passport

	##### To implement JWT authentication with Passport:
		npm install passport-jwt
		npm install -D @types/passport-jwt

	#### Swagger
		npm install @nestjs/swagger

	#### Helmet
		npm install helmet

	#### Throttler
		npm install @nestjs/throttler
	#### bcrypt
		npm install bcrypt
		npm install -D @types/bcrypt

		npm install -D tsx

	#### To Install everything at once
		npm install dotenv prisma @prisma/client zod @nestjs/jwt @nestjs/passport passport passport-jwt helmet @nestjs/throttler

	#### Initialize Prisma
		npx prisma init

	#### To verify prisma
		npx prisma validate

## 9. Prisma Setup
### The structure should be
	backend/
	│
	├── prisma/
	│   └── schema.prisma
	│
	├── prisma.config.ts
	│
	├── .env
	└── package.json

### create .env on backend and put below
	```bash
	PORT=4000
	DATABASE_URL="postgresql://postgres:postgres@localhost:5432/n3_db?schema=public"
	```
	- Now Prisma can connect to PostgreSQL.


### on prisma.config.ts
	```bash
	import "dotenv/config";
	import { defineConfig } from "prisma/config";

	export default defineConfig({
	  schema: "prisma/schema.prisma",
	  migrations: {
	    path: "prisma/migrations",
	  },
	  datasource: {
	    url: process.env.DATABASE_URL!,
	  },
	});
	```


### Design the Database Before Business Modules
- lets start by designing the data model. we can start with-
	RBAC
	Geography
	Master Data

- conceptual dependency
	RBAC
	 │
	 └── Users
		  │
		  └── Roles
			   │
			   └── Permissions


	Geography
	 │
	 └── Region
		  └── Zone
			   └── Woreda
					└── Kebele


### Database Modeling Rules
- Before creating models, define rules. Every major entity should have:
	```bash
	id
	createdAt
	updatedAt
	deletedAt
	createdBy
	updatedBy

  ------------
	id String @id @default(uuid()) @db.Uuid
	createdAt DateTime @default(now()) @map("created_at")
	@@map("users")
  ------------
  ```
- decide
	```bash
	UUID strategy
	foreign keys
	cascade behavior
	soft delete
	indexes
	unique constraints
	nullable fields
	audit fields
	timestamps
	enum strategy
	```
### Create Database ERD
- Before writing Prisma models, create an ERD. which helps as to design Prisma schema much easier.like below-
	Region
	  │
	  └──< Zone
			 │
			 └──< Woreda
					│
					└──< Kebele
						   │
						   └──< Farmer

### Create your first database model
	- Open backend/prisma/schema.prisma
#### Then add:
	```bash
	// ============================================================================
	// Project_Name- Prisma Schema
	// Phase 1: RBAC + Geography Hierarchy + Master Data
	// ============================================================================

	generator client {
	  provider = "prisma-client-js"
	}

	datasource db {
	  provider = "postgresql"
	}

	// ============================================================================
	// RBAC Models
	// ============================================================================

	model User {
	  id           String   @id @default(uuid()) @db.Uuid
	  email        String   @unique @db.VarChar(255)
	  username     String   @unique @db.VarChar(100)
	  mobileNumber String?  @unique @map("mobile_number") @db.VarChar(20)
	  password     String   @db.VarChar(255)
	  firstName    String   @map("first_name") @db.VarChar(100)
	  lastName     String   @map("last_name") @db.VarChar(100)
	  phone        String?  @db.VarChar(20)
	  avatar       String?  @db.VarChar(500)
	  isActive     Boolean  @default(true) @map("is_active")
	  isLocked     Boolean  @default(false) @map("is_locked")
	  lastLoginAt       DateTime? @map("last_login_at")
	  failedLoginAttempts Int @default(0) @map("failed_login_attempts")
	  passwordChangedAt DateTime? @map("password_changed_at")

	  // Geography assignment (only one should be set for non-admin users)
	  regionId String? @map("region_id") @db.Uuid
	  zoneId   String? @map("zone_id") @db.Uuid
	  woredaId String? @map("woreda_id") @db.Uuid
	  kebeleId String? @map("kebele_id") @db.Uuid

	  // Audit fields
	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  // Relations
	  userRoles     UserRole[]
	  refreshTokens RefreshToken[]
	  auditLogs     AuditLog[]
	  region        Region? @relation(fields: [regionId], references: [id])
	  zone          Zone?   @relation(fields: [zoneId], references: [id])
	  woreda        Woreda? @relation(fields: [woredaId], references: [id])
	  kebele        Kebele? @relation(fields: [kebeleId], references: [id])
	  warehousesCreated Warehouse[] @relation("WarehouseCreatedBy")
	  warehousesUpdated Warehouse[] @relation("WarehouseUpdatedBy")

	  @@map("users")
	  @@index([email])
	  @@index([username])
	  @@index([mobileNumber])
	  @@index([deletedAt])
	  @@index([regionId])
	  @@index([zoneId])
	  @@index([woredaId])
	  @@index([kebeleId])
	}


	model Role {
	  id          String  @id @default(uuid()) @db.Uuid
	  name        String  @unique @db.VarChar(100)
	  displayName String  @map("display_name") @db.VarChar(150)
	  description String? @db.VarChar(500)
	  isSystem    Boolean @default(false) @map("is_system")
	  isActive    Boolean @default(true) @map("is_active")

	  // Audit fields
	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  // Relations
	  userRoles       UserRole[]
	  rolePermissions RolePermission[]

	  @@map("roles")
	  @@index([name])
	  @@index([deletedAt])
	}

	model Permission {
	  id          String  @id @default(uuid()) @db.Uuid
	  name        String  @unique @db.VarChar(150)
	  displayName String  @map("display_name") @db.VarChar(200)
	  description String? @db.VarChar(500)
	  module      String  @db.VarChar(100)
	  action      String  @db.VarChar(50)
	  isActive    Boolean @default(true) @map("is_active")

	  // Audit fields
	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  // Relations
	  rolePermissions RolePermission[]

	  @@unique([module, action])
	  @@map("permissions")
	  @@index([module])
	  @@index([deletedAt])
	}

	model UserRole {
	  id     String @id @default(uuid()) @db.Uuid
	  userId String @map("user_id") @db.Uuid
	  roleId String @map("role_id") @db.Uuid

	  // Audit fields
	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  // Relations
	  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
	  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

	  @@unique([userId, roleId])
	  @@map("user_roles")
	  @@index([userId])
	  @@index([roleId])
	  @@index([deletedAt])
	}

	model RolePermission {
	  id           String @id @default(uuid()) @db.Uuid
	  roleId       String @map("role_id") @db.Uuid
	  permissionId String @map("permission_id") @db.Uuid

	  // Audit fields
	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  // Relations
	  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
	  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

	  @@unique([roleId, permissionId])
	  @@map("role_permissions")
	  @@index([roleId])
	  @@index([permissionId])
	  @@index([deletedAt])
	}

	model RefreshToken {
	  id        String    @id @default(uuid()) @db.Uuid
	  token     String    @unique @db.VarChar(500)
	  userId    String    @map("user_id") @db.Uuid
	  expiresAt DateTime  @map("expires_at")
	  revokedAt DateTime? @map("revoked_at")
	  ipAddress String?   @map("ip_address") @db.VarChar(45)
	  userAgent String?   @map("user_agent") @db.VarChar(500)

	  // Audit fields
	  createdAt DateTime @default(now()) @map("created_at")
	  updatedAt DateTime @updatedAt @map("updated_at")

	  // Relations
	  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

	  @@map("refresh_tokens")
	  @@index([userId])
	  @@index([token])
	  @@index([expiresAt])
	}

	model AuditLog {
	  id        String   @id @default(uuid()) @db.Uuid
	  userId    String?  @map("user_id") @db.Uuid
	  action    String   @db.VarChar(50)
	  entity    String   @db.VarChar(100)
	  entityId  String?  @map("entity_id") @db.VarChar(100)
	  oldValues Json?    @map("old_values")
	  newValues Json?    @map("new_values")
	  ipAddress String?  @map("ip_address") @db.VarChar(45)
	  userAgent String?  @map("user_agent") @db.VarChar(500)
	  createdAt DateTime @default(now()) @map("created_at")

	  // Relations
	  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

	  @@map("audit_logs")
	  @@index([userId])
	  @@index([entity])
	  @@index([action])
	  @@index([createdAt])
	}

	// ============================================================================
	// Geography Hierarchy Models
	// ============================================================================

	model Region {
	  id       String  @id @default(uuid()) @db.Uuid
	  name     String  @unique @db.VarChar(200)
	  code     String  @unique @db.VarChar(20)
	  isActive Boolean @default(true) @map("is_active")

	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  zones      Zone[]
	  users      User[]
	  warehouses Warehouse[]

	  @@map("regions")
	  @@index([deletedAt])
	}

	model Zone {
	  id       String  @id @default(uuid()) @db.Uuid
	  name     String  @db.VarChar(200)
	  code     String  @unique @db.VarChar(20)
	  regionId String  @map("region_id") @db.Uuid
	  isActive Boolean @default(true) @map("is_active")

	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  region     Region     @relation(fields: [regionId], references: [id])
	  woredas    Woreda[]
	  users      User[]
	  warehouses Warehouse[]

	  @@unique([name, regionId])
	  @@map("zones")
	  @@index([regionId])
	  @@index([deletedAt])
	}

	model Woreda {
	  id       String  @id @default(uuid()) @db.Uuid
	  name     String  @db.VarChar(200)
	  code     String  @unique @db.VarChar(20)
	  zoneId   String  @map("zone_id") @db.Uuid
	  isActive Boolean @default(true) @map("is_active")

	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  zone         Zone                @relation(fields: [zoneId], references: [id])
	  kebeles      Kebele[]
	  unions       FmsUnion[]
	  destinations Destination[]
	  stopAdjustments StopAdjustment[]
	  users           User[]
	  warehouses      Warehouse[]

	  @@unique([name, zoneId])
	  @@map("woredas")
	  @@index([zoneId])
	  @@index([deletedAt])
	}

	model Kebele {
	  id       String  @id @default(uuid()) @db.Uuid
	  name     String  @db.VarChar(200)
	  code     String  @unique @db.VarChar(20)
	  woredaId String  @map("woreda_id") @db.Uuid
	  isActive Boolean @default(true) @map("is_active")

	  createdAt DateTime  @default(now()) @map("created_at")
	  updatedAt DateTime  @updatedAt @map("updated_at")
	  deletedAt DateTime? @map("deleted_at")
	  createdBy String?   @map("created_by") @db.Uuid
	  updatedBy String?   @map("updated_by") @db.Uuid

	  woreda       Woreda              @relation(fields: [woredaId], references: [id])
	  cooperatives PrimaryCooperative[]
	  farmers      Farmer[]
	  stopAdjustments StopAdjustment[]
	  users           User[]
	  warehouses      Warehouse[]

	  @@unique([name, woredaId])
	  @@map("kebeles")
	  @@index([woredaId])
	  @@index([deletedAt])
	}
	```

#### Add on seed.ts
####================
```bash
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 12;

const MODULES = ['users', 'roles', 'permissions', 'audit'];
const ACTIONS = ['create', 'read', 'update', 'delete', 'manage', 'export'];

async function main() {
console.log('🌱 Seeding database...');

// Create permissions for each module
const permissions: any[] = [];
for (const module of MODULES) {
  for (const action of ACTIONS) {
    const name = `${module}:${action}`;
    const displayName = `${action.charAt(0).toUpperCase() + action.slice(1)} ${module.charAt(0).toUpperCase() + module.slice(1)}`;

    const permission = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: {
        name,
        displayName,
        description: `Permission to ${action} ${module}`,
        module,
        action,
        isActive: true,
      },
    });
    permissions.push(permission);
    console.log(`  ✅ Permission: ${name}`);
  }
}

// Create roles
const superAdminRole = await prisma.role.upsert({
  where: { name: 'super_admin' },
  update: {},
  create: {
    name: 'super_admin',
    displayName: 'Super Administrator',
    description: 'Full system access with all permissions',
    isSystem: true,
    isActive: true,
  },
});
console.log('  ✅ Role: Super Admin');

const adminRole = await prisma.role.upsert({
  where: { name: 'admin' },
  update: {},
  create: {
    name: 'admin',
    displayName: 'Administrator',
    description: 'Administrative access for user and role management',
    isSystem: true,
    isActive: true,
  },
});
console.log('  ✅ Role: Admin');

const managerRole = await prisma.role.upsert({
  where: { name: 'manager' },
  update: {},
  create: {
    name: 'manager',
    displayName: 'Manager',
    description: 'Manager with read and limited update access',
    isSystem: false,
    isActive: true,
  },
});
console.log('  ✅ Role: Manager');

const userRole = await prisma.role.upsert({
  where: { name: 'user' },
  update: {},
  create: {
    name: 'user',
    displayName: 'Standard User',
    description: 'Basic user with read-only access',
    isSystem: false,
    isActive: true,
  },
});
console.log('  ✅ Role: User');

// Assign all permissions to super_admin
for (const permission of permissions) {
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: superAdminRole.id,
      permissionId: permission.id,
    },
  });
}
console.log('  ✅ Super Admin: All permissions assigned');

// Assign admin permissions (all except permission management)
const adminPermissions = permissions.filter(
  (p) => p.module !== 'permissions' || p.action === 'read',
);
for (const permission of adminPermissions) {
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: adminRole.id,
      permissionId: permission.id,
    },
  });
}
console.log('  ✅ Admin: Permissions assigned');

// Manager: read on users, roles, and audit
const managerPermissions = permissions.filter(
  (p) =>
    (p.module === 'users' && ['read'].includes(p.action)) ||
    (p.module === 'roles' && ['read'].includes(p.action)) ||
    (p.module === 'audit' && ['read'].includes(p.action)),
);
for (const permission of managerPermissions) {
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: managerRole.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: managerRole.id,
      permissionId: permission.id,
    },
  });
}
console.log('  ✅ Manager: Permissions assigned');

// User: read only on users
const userPermissions = permissions.filter(
  (p) => p.module === 'users' && p.action === 'read',
);
for (const permission of userPermissions) {
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: userRole.id,
        permissionId: permission.id,
      },
    },
    update: {},
    create: {
      roleId: userRole.id,
      permissionId: permission.id,
    },
  });
}
console.log('  ✅ User: Permissions assigned');

// Create super admin user
const hashedPassword = await bcrypt.hash('Admin@123456', SALT_ROUNDS);
const superAdmin = await prisma.user.upsert({
  where: { email: 'admin@fms.com' },
  update: {},
  create: {
    email: 'admin@fms.com',
    username: 'superadmin',
    password: hashedPassword,
    firstName: 'Super',
    lastName: 'Admin',
    phone: '+1234567890',
    isActive: true,
  },
});
console.log('  ✅ Super Admin User created (admin@fms.com / Admin@123456)');

// Assign super_admin role to the user
await prisma.userRole.upsert({
  where: {
    userId_roleId: {
      userId: superAdmin.id,
      roleId: superAdminRole.id,
    },
  },
  update: {},
  create: {
    userId: superAdmin.id,
    roleId: superAdminRole.id,
  },
});
console.log('  ✅ Super Admin role assigned to admin user');

// Create a demo regular user
const demoPassword = await bcrypt.hash('User@123456', SALT_ROUNDS);
const demoUser = await prisma.user.upsert({
  where: { email: 'user@fms.com' },
  update: {},
  create: {
    email: 'user@fms.com',
    username: 'demouser',
    password: demoPassword,
    firstName: 'Demo',
    lastName: 'User',
    isActive: true,
  },
});

await prisma.userRole.upsert({
  where: {
    userId_roleId: {
      userId: demoUser.id,
      roleId: userRole.id,
    },
  },
  update: {},
  create: {
    userId: demoUser.id,
    roleId: userRole.id,
  },
});
console.log('  ✅ Demo User created (user@fms.com / User@123456)');

console.log('\n🎉 Seeding completed!');
}

main()
.catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
````

#### Validate prisma

    	npx prisma validate

    #### Then, Run->
    	npx prisma migrate dev --name init,
    - later i may use : npx prisma migrate dev --name add_model_name

    #### Then->
    	npx prisma generate
    #### Insert initial/default data
    	/// npx ts-node prisma/seeds/seed.ts
    	npx prisma db seed

    #### To check seeded data on prisma studio
    	npx prisma studio
    #### We can also check the postgresql on docker using window powershell
    	docker exec -it n3-postgres psql -U postgres -d n3_db
    ##### List Database
    	\l

    #####List Tables
    	\dt		\d users

#### Now we have:

    	NestJS
    	  |
    	Prisma
    	  |
    	PostgreSQL

---

### Default Credentials

| User             | Password       | Role        |
| ---------------- | -------------- | ----------- |
| `admin@test.com` | `Admin@123456` | super_admin |
| `user@test.com`  | `User@123456`  | user        |

### Useful URLs

| URL                                | Description               |
| ---------------------------------- | ------------------------- |
| `http://localhost:4000/api/docs`   | Swagger API documentation |
| `http://localhost:4000/api/v1/...` | Backend API               |
| `http://localhost:3016`            | Frontend                  |
| `http://localhost:3016/api/v1/...` | BFF proxy to backend      |

---

##10. Backend Architecture(NestJS)

- Modular Monolith
- Clean Architecture
- 3-Tier
- select architecture, for now Clean Architecture.

### 10.1 Directory Structure

    src/
    │
    ├── domain/
    ├── application/
    ├── infrastructure/
    ├── presentation/
    └── shared/

### domain - The business is:

    Entity
    Repository interface
    Business rules

### application, which does:

    Create Farmer
    Update Farmer
    Get Farmer
    Delete Farmer

### infrastructure- How the application accesses external systems.

    Prisma
    PostgreSQL
    Repository implementations

### presentation - How users communicate with the backend.

    HTTP
    Controllers
    NestJS modules

### Dependency Flow, the flow is

    Presentation
    	  ↓
    Application
    	  ↓
    Domain

- Instead of domain knows Prisma directily , Infrastructure must implements domain contracts
  Infrastructure
  ↓
  implements
  ↓
  Domain interfaces

### 10.1.1 Detail Directory Structure

```
backend/src/
├── main.ts                          # Bootstrap, global pipes/filters/interceptors
├── app.module.ts                    # Root module — imports all feature modules
│
├── domain/                          # LAYER 1: Domain (innermost)
│   └── <module>/
│       ├── entities/                # Entity interfaces (pure TypeScript)
│       │   └── <entity>.entity.ts
│       ├── repositories/            # Repository interfaces (contracts)
│       │   └── <entity>.repository.ts
│       └── services/                # Domain services (pure business logic, optional)
│           └── <module>.service.ts
│
├── application/                     # LAYER 2: Application
│   └── <module>/
│       ├── dto/                     # Zod validation schemas + TypeScript types
│       │   └── <module>.dto.ts
│       └── use-cases/               # Injectable use case classes
│           └── <entity>.usecases.ts
│
├── infrastructure/                  # LAYER 3: Infrastructure
│   └── <module>/
│       └── database/
│           ├── entities/            # ORM mappers (Prisma → domain entity)
│           │   └── <entity>.orm-entity.ts
│           └── repositories/        # Prisma repository implementations
│               └── <entity>.repository.impl.ts
│
├── presentation/                    # LAYER 4: Presentation (outermost)
│   └── <module>/
│       ├── <module>.module.ts       # NestJS module definition
│       ├── controllers/             # HTTP controllers
│       │   └── <entity>.controller.ts
│       └── providers/               # DI provider bindings
│           └── <module>.providers.ts
│
└── shared/                          # Cross-cutting concerns
    ├── constants/                   # DI tokens, audit action names
    ├── dto/                         # PaginationQuery, ApiResponse
    ├── enums/                       # Permission enums
    ├── filters/                     # GlobalExceptionFilter
    ├── interceptors/                # LoggingInterceptor, TransformInterceptor
    ├── interfaces/                  # ICurrentUser, IJwtPayload, IPaginationMeta
    ├── pipes/                       # ZodValidationPipe
    └── utils/                       # PasswordUtil, PaginationUtil, StringUtil
```

#### Create folder structure based on the below code, run it on backend folder

```
$folders = @(
    "src/domain",
    "src/application",
    "src/infrastructure",
    "src/presentation",
    "src/shared/constants",
    "src/shared/dto",
    "src/shared/enums",
    "src/shared/filters",
    "src/shared/interceptors",
    "src/shared/interfaces",
    "src/shared/pipes",
    "src/shared/utils"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force $folder | Out-Null
}
```

#### and for modules

```
$folders = @(
    "src/domain/users/entities",
    "src/domain/users/repositories",
    "src/domain/users/services",
    "src/application/users/dto",
    "src/application/users/use-cases",
    "src/infrastructure/users/database/entities",
    "src/infrastructure/users/database/repositories",
    "src/presentation/users/controllers",
    "src/presentation/users/providers"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force $folder | Out-Null
}
```

### 10.1.2 Clean Architecture Layers

The backend follows **strict Clean Architecture** with dependency inversion. Dependencies only flow inward.

```
┌──────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER                                       │
│  Controllers, Modules, Guards, Decorators                 │
│  (NestJS-specific — HTTP request/response handling)       │
│  • Receives HTTP requests                                 │
│  • Validates input via ZodValidationPipe                  │
│  • Calls use cases                                        │
│  • Returns response (auto-wrapped by TransformInterceptor)│
├──────────────────────────────────────────────────────────┤
│  APPLICATION LAYER                                        │
│  Use Cases (Injectable classes) + DTOs (Zod schemas)      │
│  • Each use case = one business operation                 │
│  • Orchestrates: repo calls, audit logging, error throws  │
│  • Depends on domain interfaces, NOT implementations      │
├──────────────────────────────────────────────────────────┤
│  DOMAIN LAYER (innermost — zero framework dependencies)   │
│  Entity interfaces, Repository interfaces, Domain Services│
│  • Pure TypeScript — no NestJS, no Prisma imports         │
│  • Defines WHAT operations exist, not HOW they work       │
│  • Domain services contain pure business rules            │
├──────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                                     │
│  Prisma repository implementations + ORM mappers          │
│  • Implements repository interfaces from domain layer     │
│  • Talks to PostgreSQL via PrismaService                  │
│  • Handles soft-delete filtering, audit fields            │
├──────────────────────────────────────────────────────────┤
│  SHARED LAYER (cross-cutting)                             │
│  Constants, DTOs, Filters, Interceptors, Pipes, Utils     │
│  • Used by any layer                                      │
│  • Contains framework-specific utilities                  │
└──────────────────────────────────────────────────────────┘
```

#### Dependency Inversion in Practice

Instead of use cases depending on Prisma repositories directly, we use **Symbol-based injection tokens**:

```
Domain layer defines:     IRegionRepository (interface)
Infrastructure implements: PrismaRegionRepository (class)
Shared layer defines:      GEOGRAPHY_TOKENS.REGION_REPOSITORY (Symbol token)
Providers file binds:      { provide: GEOGRAPHY_TOKENS.REGION_REPOSITORY, useClass: PrismaRegionRepository }
Use case injects:          @Inject(GEOGRAPHY_TOKENS.REGION_REPOSITORY) private repo: IRegionRepository
```

This means you can swap Prisma for any other data source without changing domain or application layer code.

- Before user, Implement and test the below. ......
  ZodValidationPipe
  PaginationUtil
  PasswordUtil
  GlobalExceptionFilter
  LoggingInterceptor
  TransformInterceptor

### 10.1.3 Request Lifecycle

```
HTTP Request
    │
    ▼
┌─ Global Guards (applied in order) ──────────────────┐
│  1. JwtAuthGuard  — verify JWT (skip if @Public())  │
│  2. RolesGuard    — check @Roles() (super_admin     │
│                     bypasses)                        │
│  3. PermissionsGuard — check @Permissions()          │
│  4. ThrottlerGuard   — rate limiting                 │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─ Controller Method ─────────────────────────────────┐
│  @Query(new ZodValidationPipe(Schema)) → validates  │
│  @Body(new ZodValidationPipe(Schema))  → validates  │
│  @CurrentUser() → extracts user from JWT            │
│  Calls use case → use case returns data             │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─ Global Interceptors ───────────────────────────────┐
│  1. LoggingInterceptor  — logs method + duration    │
│  2. TransformInterceptor — wraps in ApiResponseDto: │
│     { success, message, data, timestamp }           │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─ GlobalExceptionFilter (if error) ──────────────────┐
│  Catches all exceptions → structured error response │
│  { success: false, message, errors?, timestamp }    │
└─────────────────────────────────────────────────────┘
    │
    ▼
HTTP Response
```

### 10.1.4 Database & Prisma

**Schema location:** `prisma/schema.prisma`

**Common model patterns:**

```prisma
model Example {
  id        String   @id @default(uuid()) @db.Uuid
  name      String   @db.VarChar(200)
  code      String   @unique @db.VarChar(20)
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at")       // Soft delete
  createdBy String?  @db.Uuid @map("created_by")
  updatedBy String?  @db.Uuid @map("updated_by")
  @@map("examples")                             // Table name
}
```

**PrismaService helpers** (available in all repo implementations):

```typescript
this.prisma.softDeleteFilter(); // → { deletedAt: null }
this.prisma.auditCreate(userId); // → { createdBy: userId, updatedBy: userId }
this.prisma.auditUpdate(userId); // → { updatedBy: userId }
this.prisma.softDelete(); // → { deletedAt: new Date() }
```

### 10.1.5 Authentication & Authorization

**Guards** are applied globally in `AppModule`. All routes require authentication by default.

| Decorator                        | Effect                                                 |
| -------------------------------- | ------------------------------------------------------ |
| `@Public()`                      | Skips JWT authentication                               |
| `@Roles('admin', 'manager')`     | Requires user to have ANY of the listed roles          |
| `@Permissions('geography:read')` | Requires user to have the permission                   |
| `@CurrentUser()`                 | Injects `ICurrentUser` (id, email, roles, permissions) |

**Permission format:** `module:action` (e.g., `geography:read`, `demand:create`, `users:delete`)

**Super admin** (`super_admin` role) bypasses all role and permission checks.

### 10.1.6 Shared Utilities

| Utility                 | Location              | Methods                                                        |
| ----------------------- | --------------------- | -------------------------------------------------------------- |
| `PaginationUtil`        | `shared/utils`        | `calculateSkip(page, limit)`, `buildMeta(page, limit, total)`  |
| `PasswordUtil`          | `shared/utils`        | `hash(password)`, `compare(plain, hash)`                       |
| `ZodValidationPipe`     | `shared/pipes`        | Validates `@Query`/`@Body` against Zod schema                  |
| `PaginationQuerySchema` | `shared/dto`          | Base Zod schema: page, limit, sortBy, sortOrder, search        |
| `TransformInterceptor`  | `shared/interceptors` | Wraps all responses in `{ success, message, data, timestamp }` |

### 10.1.7 API Response Format

**All endpoints** return a consistent envelope:

```jsonc
// Success
{
  "success": true,
  "message": "Success",
  "data": { /* ... */ },
  "timestamp": "2026-03-28T10:00:00.000Z"
}

// Paginated
{
  "success": true,
  "message": "Success",
  "data": {
    "items": [ /* ... */ ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasNext": true,
      "hasPrevious": false
    }
  },
  "timestamp": "2026-03-28T10:00:00.000Z"
}

// Error
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name is required" }
  ],
  "timestamp": "2026-03-28T10:00:00.000Z"
}
```

---

### 10.1.8 Step-by-Step: Adding a New Backend Module

> **Example:** Adding a `Warehouse` module with CRUD operations.

#### Step 1: Define the Prisma Model

Edit `prisma/schema.prisma`:

```prisma
model Warehouse {
  id          String    @id @default(uuid()) @db.Uuid
  name        String    @db.VarChar(200)
  code        String    @unique @db.VarChar(20)
  location    String?   @db.VarChar(500)
  capacity    Float     @default(0)
  isActive    Boolean   @default(true) @map("is_active")
  kebeleId    String    @db.Uuid @map("kebele_id")
  kebele      Kebele    @relation(fields: [kebeleId], references: [id])
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  deletedAt   DateTime? @map("deleted_at")
  createdBy   String?   @db.Uuid @map("created_by")
  updatedBy   String?   @db.Uuid @map("updated_by")

  @@index([deletedAt])
  @@index([kebeleId])
  @@map("warehouses")
}
```

Run migration:

```bash
npx prisma migrate dev --name add_warehouse
npx prisma generate
```

#### Step 2: Define DI Tokens

Create or update `src/shared/constants/warehouse.constants.ts`:

```typescript
export const WAREHOUSE_TOKENS = {
  WAREHOUSE_REPOSITORY: Symbol("IWarehouseRepository"),
};
```

Export in `src/shared/constants/index.ts`.

#### Step 3: Domain Layer — Entity + Repository Interface

**`src/domain/warehouse/entities/warehouse.entity.ts`**

```typescript
export interface WarehouseEntity {
  id: string;
  name: string;
  code: string;
  location: string | null;
  capacity: number;
  isActive: boolean;
  kebeleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface WarehouseResponseModel {
  id: string;
  name: string;
  code: string;
  location: string | null;
  capacity: number;
  isActive: boolean;
  kebele?: { id: string; name: string };
  createdAt: Date;
  updatedAt: Date;
}
```

**`src/domain/warehouse/entities/index.ts`**

```typescript
export * from "./warehouse.entity";
```

**`src/domain/warehouse/repositories/warehouse.repository.ts`**

```typescript
export interface IWarehouseRepository {
  findAll(query: {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
    search?: string;
    isActive?: boolean;
    kebeleId?: string;
  }): Promise<{ items: any[]; total: number }>;
  findById(id: string): Promise<any | null>;
  create(data: any, userId?: string): Promise<any>;
  update(id: string, data: any, userId?: string): Promise<any>;
  softDelete(id: string, userId?: string): Promise<void>;
  lookup(kebeleId?: string): Promise<any[]>;
}
```

**`src/domain/warehouse/repositories/index.ts`**

```typescript
export * from "./warehouse.repository";
```

#### Step 4: Application Layer — DTOs + Use Cases

**`src/application/warehouse/dto/warehouse.dto.ts`**

```typescript
import { z } from "zod";
import { PaginationQuerySchema } from "../../../shared/dto";

export const CreateWarehouseSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  code: z.string().min(1, "Code is required").max(20),
  location: z.string().max(500).optional(),
  capacity: z.number().min(0).default(0),
  isActive: z.boolean().optional().default(true),
  kebeleId: z.string().uuid("Invalid kebele ID"),
});

export const UpdateWarehouseSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  code: z.string().min(1).max(20).optional(),
  location: z.string().max(500).optional(),
  capacity: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  kebeleId: z.string().uuid().optional(),
});

export const WarehouseQuerySchema = PaginationQuerySchema.extend({
  isActive: z.coerce.boolean().optional(),
  kebeleId: z.string().uuid().optional(),
});

export type CreateWarehouseDto = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouseDto = z.infer<typeof UpdateWarehouseSchema>;
export type WarehouseQueryDto = z.infer<typeof WarehouseQuerySchema>;
```

**`src/application/warehouse/dto/index.ts`**

```typescript
export * from "./warehouse.dto";
```

**`src/application/warehouse/use-cases/warehouse.usecases.ts`**

```typescript
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { WAREHOUSE_TOKENS } from "../../../shared/constants";
import { REPOSITORY_TOKENS } from "../../../shared/constants";
import { PaginationUtil } from "../../../shared/utils";
import { IWarehouseRepository } from "../../../domain/warehouse/repositories";
import { IAuditRepository } from "../../../domain/rbac/repositories";
// import mapper
import { WarehouseMapper } from "../../../infrastructure/warehouse/database/entities";

@Injectable()
export class GetWarehousesUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
  ) {}

  async execute(query: any) {
    const { items, total } = await this.repo.findAll(query);
    return {
      items: WarehouseMapper.toResponseDtoList(items),
      meta: PaginationUtil.buildMeta(query.page, query.limit, total),
    };
  }
}

@Injectable()
export class GetWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repo.findById(id);
    if (!item) throw new NotFoundException("Warehouse not found");
    return WarehouseMapper.toResponseDto(item);
  }
}

@Injectable()
export class CreateWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
    @Inject(REPOSITORY_TOKENS.AUDIT_REPOSITORY)
    private readonly auditRepo: IAuditRepository,
  ) {}

  async execute(data: any, userId: string) {
    const warehouse = await this.repo.create(data, userId);
    await this.auditRepo.create({
      action: "WAREHOUSE_CREATED",
      entity: "Warehouse",
      entityId: warehouse.id,
      userId,
      newValues: data,
    });
    return WarehouseMapper.toResponseDto(warehouse);
  }
}

@Injectable()
export class UpdateWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
    @Inject(REPOSITORY_TOKENS.AUDIT_REPOSITORY)
    private readonly auditRepo: IAuditRepository,
  ) {}

  async execute(id: string, data: any, userId: string) {
    const old = await this.repo.findById(id);
    if (!old) throw new NotFoundException("Warehouse not found");
    const updated = await this.repo.update(id, data, userId);
    await this.auditRepo.create({
      action: "WAREHOUSE_UPDATED",
      entity: "Warehouse",
      entityId: id,
      userId,
      oldValues: old,
      newValues: data,
    });
    return WarehouseMapper.toResponseDto(updated);
  }
}

@Injectable()
export class DeleteWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
    @Inject(REPOSITORY_TOKENS.AUDIT_REPOSITORY)
    private readonly auditRepo: IAuditRepository,
  ) {}

  async execute(id: string, userId: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException("Warehouse not found");
    await this.repo.softDelete(id, userId);
    await this.auditRepo.create({
      action: "WAREHOUSE_DELETED",
      entity: "Warehouse",
      entityId: id,
      userId,
    });
  }
}

@Injectable()
export class LookupWarehousesUseCase {
  constructor(
    @Inject(WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY)
    private readonly repo: IWarehouseRepository,
  ) {}

  async execute(kebeleId?: string) {
    return this.repo.lookup(kebeleId);
  }
}
```

**`src/application/warehouse/use-cases/index.ts`**

```typescript
export * from "./warehouse.usecases";
```

#### Step 5: Infrastructure Layer — Mapper + Repository Implementation

**`src/infrastructure/warehouse/database/entities/warehouse.orm-entity.ts`**

```typescript
export const WAREHOUSE_INCLUDE = {
  kebele: { select: { id: true, name: true } },
};

export class WarehouseMapper {
  static toResponseDto(warehouse: any) {
    return {
      id: warehouse.id,
      name: warehouse.name,
      code: warehouse.code,
      location: warehouse.location,
      capacity: warehouse.capacity,
      isActive: warehouse.isActive,
      kebele: warehouse.kebele
        ? { id: warehouse.kebele.id, name: warehouse.kebele.name }
        : undefined,
      createdAt: warehouse.createdAt,
      updatedAt: warehouse.updatedAt,
    };
  }

  static toResponseDtoList(items: any[]) {
    return items.map((i) => WarehouseMapper.toResponseDto(i));
  }
}
```

**`src/infrastructure/warehouse/database/entities/index.ts`**

```typescript
export * from "./warehouse.orm-entity";
```

**`src/infrastructure/warehouse/database/repositories/warehouse.repository.impl.ts`**

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../rbac/database/prisma.service";
import { PaginationUtil } from "../../../../shared/utils";
import { IWarehouseRepository } from "../../../../domain/warehouse/repositories";
import { WAREHOUSE_INCLUDE } from "../entities";

@Injectable()
export class PrismaWarehouseRepository implements IWarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: any) {
    const where: any = { ...this.prisma.softDeleteFilter() };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { code: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.isActive !== undefined) where.isActive = query.isActive;
    if (query.kebeleId) where.kebeleId = query.kebeleId;

    const skip = PaginationUtil.calculateSkip(query.page, query.limit);
    const [items, total] = await Promise.all([
      this.prisma.warehouse.findMany({
        where,
        include: WAREHOUSE_INCLUDE,
        orderBy: { [query.sortBy || "createdAt"]: query.sortOrder || "desc" },
        skip,
        take: query.limit,
      }),
      this.prisma.warehouse.count({ where }),
    ]);
    return { items, total };
  }

  async findById(id: string) {
    return this.prisma.warehouse.findFirst({
      where: { id, ...this.prisma.softDeleteFilter() },
      include: WAREHOUSE_INCLUDE,
    });
  }

  async create(data: any, userId?: string) {
    return this.prisma.warehouse.create({
      data: { ...data, ...this.prisma.auditCreate(userId) },
      include: WAREHOUSE_INCLUDE,
    });
  }

  async update(id: string, data: any, userId?: string) {
    return this.prisma.warehouse.update({
      where: { id },
      data: { ...data, ...this.prisma.auditUpdate(userId) },
      include: WAREHOUSE_INCLUDE,
    });
  }

  async softDelete(id: string, userId?: string) {
    await this.prisma.warehouse.update({
      where: { id },
      data: { ...this.prisma.softDelete(), ...this.prisma.auditUpdate(userId) },
    });
  }

  async lookup(kebeleId?: string) {
    return this.prisma.warehouse.findMany({
      where: {
        isActive: true,
        ...this.prisma.softDeleteFilter(),
        ...(kebeleId ? { kebeleId } : {}),
      },
      select: { id: true, name: true, code: true },
      orderBy: { name: "asc" },
    });
  }
}
```

**`src/infrastructure/warehouse/database/repositories/index.ts`**

```typescript
export * from "./warehouse.repository.impl";
```

**`src/infrastructure/warehouse/database/index.ts`**

```typescript
export * from "./entities";
export * from "./repositories";
```

#### Step 6: Presentation Layer — Controller + Module + Providers

**`src/presentation/warehouse/controllers/warehouse.controller.ts`**

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Permissions, CurrentUser } from "../../rbac/decorators";
import { ZodValidationPipe } from "../../../shared/pipes";
import { ICurrentUser } from "../../../shared/interfaces";
import {
  CreateWarehouseSchema,
  UpdateWarehouseSchema,
  WarehouseQuerySchema,
  CreateWarehouseDto,
  UpdateWarehouseDto,
  WarehouseQueryDto,
} from "../../../application/warehouse/dto";
import {
  GetWarehousesUseCase,
  GetWarehouseUseCase,
  CreateWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase,
  LookupWarehousesUseCase,
} from "../../../application/warehouse/use-cases";

@ApiTags("Warehouses")
@Controller("warehouses")
export class WarehouseController {
  constructor(
    private readonly getWarehouses: GetWarehousesUseCase,
    private readonly getWarehouse: GetWarehouseUseCase,
    private readonly createWarehouse: CreateWarehouseUseCase,
    private readonly updateWarehouse: UpdateWarehouseUseCase,
    private readonly deleteWarehouse: DeleteWarehouseUseCase,
    private readonly lookupWarehouses: LookupWarehousesUseCase,
  ) {}

  @Get()
  @Permissions("warehouse:read")
  findAll(
    @Query(new ZodValidationPipe(WarehouseQuerySchema))
    query: WarehouseQueryDto,
  ) {
    return this.getWarehouses.execute(query);
  }

  @Get("lookup")
  @Permissions("warehouse:read")
  lookup(@Query("kebeleId") kebeleId?: string) {
    return this.lookupWarehouses.execute(kebeleId);
  }

  @Get(":id")
  @Permissions("warehouse:read")
  findOne(@Param("id") id: string) {
    return this.getWarehouse.execute(id);
  }

  @Post()
  @Permissions("warehouse:create")
  create(
    @Body(new ZodValidationPipe(CreateWarehouseSchema)) dto: CreateWarehouseDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.createWarehouse.execute(dto, user.id);
  }

  @Put(":id")
  @Permissions("warehouse:update")
  update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(UpdateWarehouseSchema)) dto: UpdateWarehouseDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.updateWarehouse.execute(id, dto, user.id);
  }

  @Delete(":id")
  @Permissions("warehouse:delete")
  remove(@Param("id") id: string, @CurrentUser() user: ICurrentUser) {
    return this.deleteWarehouse.execute(id, user.id);
  }
}
```

**`src/presentation/warehouse/controllers/index.ts`**

```typescript
export * from "./warehouse.controller";
```

**`src/presentation/warehouse/providers/warehouse.providers.ts`**

```typescript
import { Provider } from "@nestjs/common";
import { WAREHOUSE_TOKENS, REPOSITORY_TOKENS } from "../../../shared/constants";
import { PrismaWarehouseRepository } from "../../../infrastructure/warehouse/database/repositories";
import { PrismaAuditRepository } from "../../../infrastructure/rbac/database/repositories";
import {
  GetWarehousesUseCase,
  GetWarehouseUseCase,
  CreateWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase,
  LookupWarehousesUseCase,
} from "../../../application/warehouse/use-cases";

export const repositoryProviders: Provider[] = [
  {
    provide: WAREHOUSE_TOKENS.WAREHOUSE_REPOSITORY,
    useClass: PrismaWarehouseRepository,
  },
  {
    provide: REPOSITORY_TOKENS.AUDIT_REPOSITORY,
    useClass: PrismaAuditRepository,
  },
];

export const useCaseProviders: Provider[] = [
  GetWarehousesUseCase,
  GetWarehouseUseCase,
  CreateWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase,
  LookupWarehousesUseCase,
];
```

**`src/presentation/warehouse/warehouse.module.ts`**

```typescript
import { Module } from "@nestjs/common";
import { WarehouseController } from "./controllers";
import {
  repositoryProviders,
  useCaseProviders,
} from "./providers/warehouse.providers";

@Module({
  controllers: [WarehouseController],
  providers: [...repositoryProviders, ...useCaseProviders],
  exports: [...repositoryProviders],
})
export class WarehouseModule {}
```

#### Step 7: Register the Module

In `src/app.module.ts`, add the import:

```typescript
import { WarehouseModule } from './presentation/warehouse/warehouse.module';

@Module({
  imports: [
    // ... existing modules
    WarehouseModule,
  ],
  // ...
})
```

#### Step 8: Seed Permissions

In `prisma/seeds/seed.ts`, add `warehouse` permissions:

```typescript
{ module: 'warehouse', action: 'create' },
{ module: 'warehouse', action: 'read' },
{ module: 'warehouse', action: 'update' },
{ module: 'warehouse', action: 'delete' },
{ module: 'warehouse', action: 'export' },
{ module: 'warehouse', action: 'manage' },
```

Re-run seeds: `npx ts-node prisma/seeds/seed.ts`

#### Backend Module Checklist

```
✅ prisma/schema.prisma          — Model defined, migration run
✅ shared/constants/             — DI tokens
✅ domain/warehouse/entities/     — Entity + Response interfaces
✅ domain/warehouse/repositories/ — Repository interface
✅ application/warehouse/dto/     — Zod schemas + types
✅ application/warehouse/use-cases/ — 6 use case classes
✅ infrastructure/warehouse/database/entities/     — ORM mapper
✅ infrastructure/warehouse/database/repositories/ — Prisma impl
✅ presentation/warehouse/controllers/  — HTTP controller
✅ presentation/warehouse/providers/    — DI bindings
✅ presentation/warehouse/warehouse.module.ts — Module
✅ app.module.ts                 — Module imported
✅ Seeds                         — Permissions created
```

---

## 11. Authentication

- Authentication should be built before ordinary business modules.
- Architecture
  Frontend
  │
  │ credentials
  ▼
  NextAuth
  │
  │ POST /auth/login
  ▼
  NestJS
  │
  ├── Validate user
  ├── Check password
  ├── Load roles
  ├── Load permissions
  └── Create JWT

## 12. RBAC

- Design
  User
  │
  ├── Roles
  │ │
  │ └── Permissions
  │
  └── Geography scope

- Permission format:
  module:action

- Examples:
  users:read
  users:create
  users:update
  users:delete

  farmer:read
  farmer:create

  demand:approve

- Then implement:
  JwtAuthGuard
  RolesGuard
  PermissionsGuard

- and:
  @Public()
  @Roles()
  @Permissions()
  @CurrentUser()

Test RBAC

### Build the First Complete Backend Module

- Now build
  users/warehouses

it demonstrates:
Prisma
↓
Repository
↓
Use Case
↓
Controller
↓
Validation
↓
Permission
↓
Audit
↓
Pagination

## 13. Summarys Users Backend Development Order

### Step 1: Prisma model

### Step 2: Migration

### Step 3: Domain entity.

### Step 4: Repository interface.

### Step 5: DI token.

### Step 6: DTO/Zod schema.

### Step 7: Use cases.

### Step 8: Mapper.

### Step 9: Repository implementation.

### Step 10: Controller.

### Step 11: Providers.

### Step 12: Module.

### Step 13: Register module.

### Step 14: Permissions.

### Step 15: Audit.

### Step 16: Swagger.

### Step 17: Test API.

## 14. Test Backend Before Frontend

### 14.1 Before writing the users frontend, test:

    ```
    POST /users
    GET /users
    GET /users/:id
    PUT /users/:id
    DELETE /users/:id
    GET /users/lookup
    ```

### Using Swagger:

```
http://localhost:4000/api/docs
```

- Verify:
  Authentication
  Validation
  Authorization
  Pagination
  Filtering
  Search
  Soft delete
  Audit logging
  Database persistence
  Error handling

## 15. Frontend Architecture (Next.js)

### 15.1. Create the Next.js project

```
npx create-next-app@latest frontend
```

### 15.2 Directory Structure

    frontend/
    └── src/
    	├── app/
    	├── domain/
    	├── infrastructure/
    	├── presentation/
    	└── shared/


- App will be, and (authenticated) is just a group
  app/
  ├── login/
  │ └── page.tsx
  │
  ├── api/
  │ └── v1/
  │
  └── (authenticated)/
  ├── layout.tsx
  ├── dashboard/
  └── users/

### 15.3 Directory Structure

```
fms-frontend/src/
├── middleware.ts                    # NextAuth session check for all routes
├── app/
│   ├── globals.css                 # Tailwind v4 + shadcn theme tokens
│   ├── layout.tsx                  # Root layout with <Providers>
│   ├── page.tsx                    # Redirects to /dashboard
│   ├── login/page.tsx              # Login page
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth handlers
│   │   └── v1/
│   │       ├── [...path]/route.ts  # BFF proxy to NestJS
│   │       └── _lib/bff.ts        # Proxy helper functions
│   └── (authenticated)/
│       ├── layout.tsx              # Auth check + AppShell
│       ├── dashboard/page.tsx
│       ├── users/page.tsx
│       ├── geography/regions/page.tsx
│       ├── demand/farmers/page.tsx
│       └── ...                     # All feature pages
│
├── domain/                         # LAYER 1: Domain (pure types)
│   ├── shared/entities/index.ts    # ApiResponse, PaginatedResponse, SessionUser
│   ├── rbac/
│   │   ├── entities/index.ts       # User, Role, Permission types
│   │   └── services/
│   │       └── rbac-domain.service.ts  # Permission checking logic
│   ├── geography/entities/index.ts
│   ├── demand/entities/index.ts
│   ├── master-data/entities/index.ts
│   └── sales/entities/index.ts
│
├── infrastructure/                 # LAYER 2: API implementations
│   ├── rbac/
│   │   ├── auth/auth.config.ts     # NextAuth v5 configuration
│   │   └── api/
│   │       ├── api-client.ts       # Shared Axios instance (/api/v1)
│   │       ├── users.api.ts
│   │       ├── roles.api.ts
│   │       └── permissions.api.ts
│   ├── geography/api/geography.api.ts
│   ├── demand/api/demand.api.ts
│   ├── master-data/api/master-data.api.ts
│   ├── sales/api/sales.api.ts
│   ├── dashboard/api/dashboard.api.ts
│   ├── admin/api/admin.api.ts
│   └── upload/api/upload.api.ts
│
├── presentation/                   # LAYER 3: React components
│   ├── components/
│   │   ├── layout/                 # AppShell, AppSidebar, AppHeader
│   │   ├── shared/                 # CrudPage, SearchInput, Pagination, etc.
│   │   ├── ui/                     # shadcn/ui components (26+)
│   │   ├── providers.tsx           # SessionProvider, QueryClient, Toaster
│   │   └── <domain>/              # Domain-specific form dialogs
│   ├── hooks/
│   │   └── useAuth.ts             # Session + permission checking
│   ├── guards/
│   │   └── PermissionGate.tsx     # Declarative permission component
│   └── utils/
│       └── export.ts              # CSV/Excel/Print utilities
│
└── shared/                         # Cross-cutting
    ├── constants/rbac.constants.ts # AUDIT_ACTIONS
    ├── stores/
    │   ├── sidebar.store.ts       # Zustand (collapsed state)
    │   └── modal.store.ts         # Zustand (modal open/close)
    └── utils/cn.ts                # clsx + tailwind-merge
```

### 15.4 Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (React Components)                   │
│  Pages (app/), Components, Hooks, Guards                 │
│  • Page components call infrastructure APIs via          │
│    TanStack Query (useQuery/useMutation)                │
│  • Permission-gated rendering via PermissionGate         │
│  • CrudPage<T> provides generic CRUD UI pattern          │
├─────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER (API Clients)                      │
│  Axios-based API modules (*.api.ts)                      │
│  • Each module exports an object with typed methods      │
│  • All requests go through /api/v1/* (BFF proxy)         │
│  • Shared Axios instance with 401 → auto-logout          │
│  • NextAuth config for JWT tokens + auto-refresh         │
├─────────────────────────────────────────────────────────┤
│  DOMAIN LAYER (Pure TypeScript)                          │
│  Entity interfaces, Domain services                      │
│  • Zero React imports — pure types and logic             │
│  • Defines request/response shapes for all API calls     │
│  • RbacDomainService: permission checking logic          │
├─────────────────────────────────────────────────────────┤
│  SHARED LAYER                                            │
│  Zustand stores, constants, utilities                    │
│  • UI state (sidebar, modals), not server state          │
│  • Server state is managed by TanStack Query             │
└─────────────────────────────────────────────────────────┘
```

### 15.4 Frontend Authentication

- Implement:
  Login
  ↓
  NextAuth
  ↓
  Session
  ↓
  Middleware
  ↓
  Authenticated layout

- Then:
  useAuth()

- provides:
  user
  roles
  permissions
  isSuperAdmin
  hasPermission()

### 15.5. BFF

- Instead of:
  Browser ──────────────> NestJS
- use:
  Browser
  │
  ▼
  Next.js
  /api/v1/\*
  │
  ▼
  BFF
  │
  ▼
  NestJS

- The browser therefore does:
  GET /api/v1/warehouses

- rather than:
  GET http://localhost:4000/api/v1/warehouses

- The BFF handles:
  session
  JWT
  authorization header
  backend URL
  response handling
  401 handling

### 15.5.1 BFF Proxy Pattern

The frontend **never** makes direct API calls to the NestJS backend. All API traffic flows through the Next.js BFF (Backend For Frontend) proxy:

```
Browser (React)  ──HTTP──>  Next.js API Route (/api/v1/*)  ──HTTP──>  NestJS Backend (port 4000)
                            │
                            ├── Reads NextAuth session
                            ├── Injects Authorization: Bearer <token>
                            ├── Normalizes paginated responses
                            └── Returns to browser
```

**Why BFF?**

- JWT access tokens never reach the browser's JavaScript
- Backend URL is never exposed to the client
- Centralized response normalization
- Same-origin API calls (no CORS issues in browser)

### 15.6 Authentication & RBAC

**NextAuth v5** handles authentication:

- **Login:** Credentials provider → calls NestJS `/auth/login`
- **Session:** JWT strategy, 7-day max age, auto-refresh at 14 min
- **Middleware:** All routes except `/login`, `/api`, static assets require session

**Frontend RBAC:**

```tsx
// In any component — check permissions
import { useAuth } from '@/presentation/hooks/useAuth';

const { hasPermission, isSuperAdmin } = useAuth();
if (hasPermission('warehouse:create')) { /* show create button */ }

// Declarative permission gate
import { PermissionGate } from '@/presentation/guards/PermissionGate';

<PermissionGate permission="warehouse:create">
  <Button>Create Warehouse</Button>
</PermissionGate>

<PermissionGate permissions={["warehouse:read", "warehouse:update"]} requireAll>
  <EditForm />
</PermissionGate>
```

### 15.7 Key Patterns & Components

#### CrudPage Component

The `CrudPage<T>` generic component is used across most CRUD pages. It provides:

- Stat cards at the top
- Search input with debounce
- Paginated data table with sortable columns
- Row action dropdown (View, Edit, Delete)
- Create button (permission-gated)
- Delete confirmation dialog
- Slot for a custom form dialog

**Usage pattern in most pages:**

```tsx
<CrudPage<WarehouseResponse>
  title="Warehouses"
  queryKey="warehouses"
  fetchFn={(params) => warehousesApi.getAll(params)}
  deleteFn={(id) => warehousesApi.delete(id)}
  columns={[...]}
  createPermission="warehouse:create"
  editPermission="warehouse:update"
  deletePermission="warehouse:delete"
  renderFormDialog={(item, onClose) => (
    <WarehouseFormDialog warehouse={item} onClose={onClose} />
  )}
/>
```

#### Infrastructure API Module Pattern

Each API module is an object with typed methods:

```typescript
// infrastructure/<module>/api/<module>.api.ts
import api from "../../rbac/api/api-client";
import {
  WarehouseResponse,
  CreateWarehouseRequest,
} from "@/domain/warehouse/entities";
import { PaginatedResponse, ApiResponse } from "@/domain/shared/entities";

export const warehousesApi = {
  getAll: (params?: Record<string, any>) =>
    api.get<PaginatedResponse<WarehouseResponse>>("/warehouses", { params }),

  getById: (id: string) =>
    api.get<ApiResponse<WarehouseResponse>>(`/warehouses/${id}`),

  create: (data: CreateWarehouseRequest) =>
    api.post<ApiResponse<WarehouseResponse>>("/warehouses", data),

  update: (id: string, data: Partial<CreateWarehouseRequest>) =>
    api.put<ApiResponse<WarehouseResponse>>(`/warehouses/${id}`, data),

  delete: (id: string) => api.delete(`/warehouses/${id}`),

  lookup: (kebeleId?: string) =>
    api.get<ApiResponse<{ id: string; name: string; code: string }[]>>(
      "/warehouses/lookup",
      { params: kebeleId ? { kebeleId } : {} },
    ),
};
```

### 15.8 Frontend State Management

| Concern           | Tool           | Where                                                  |
| ----------------- | -------------- | ------------------------------------------------------ |
| Server data (API) | TanStack Query | `useQuery` / `useMutation` in page components          |
| Authentication    | NextAuth v5    | Session provider, `useAuth()` hook                     |
| Sidebar state     | Zustand        | `useSidebarStore` (collapsed/expanded, active section) |
| Modal state       | Zustand        | `useModalStore` (open/close by ID)                     |
| Form state        | Formik         | Form dialogs                                           |
| Validation        | Zod            | Schema validation in form dialogs                      |

**Rule:** Use TanStack Query for any data from the API. Use Zustand only for UI state that doesn't come from the server.

---

### Server data, use:

    TanStack Query

    Examples:
    	farmers
    	regions
    	demands
    	sales

### UI state, Use:

    Zustand
    Examples:
    	sidebar open/closed
    	modal state
    	UI preferences

### Form state, Use:

    Formik

### Validation, Use:

    Zod

## 15.9 Build Users Frontend

### Order:

    1. Domain types
    2. API client
    3. Query hook/page logic
    4. Form dialog
    5. Validation
    6. Table
    7. Pagination
    8. Search
    9. Edit
    10. Delete
    11. PermissionGate
    12. Sidebar
    13. Loading state
    14. Error state
    15. Empty state

### Then verify the complete flow:

    Browser
     ↓
    Next.js
     ↓
    BFF
     ↓
    NestJS
     ↓
    Use Case
     ↓
    Repository
     ↓
    Prisma
     ↓
    PostgreSQL

- The first end-to-end milestone.

## 15.10 Step-by-Step: Adding a New Frontend Module

> **Example:** Adding a `Warehouse` module (matching the backend module from Section 4.8).

#### Step 1: Domain Layer — Entity Types

**`src/domain/warehouse/entities/index.ts`**

```typescript
export interface WarehouseResponse {
  id: string;
  name: string;
  code: string;
  location: string | null;
  capacity: number;
  isActive: boolean;
  kebele?: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
}

export interface CreateWarehouseRequest {
  name: string;
  code: string;
  location?: string;
  capacity?: number;
  isActive?: boolean;
  kebeleId: string;
}

export interface UpdateWarehouseRequest {
  name?: string;
  code?: string;
  location?: string;
  capacity?: number;
  isActive?: boolean;
  kebeleId?: string;
}
```

#### Step 2: Infrastructure Layer — API Client

**`src/infrastructure/warehouse/api/warehouse.api.ts`**

```typescript
import api from "../../rbac/api/api-client";
import type {
  WarehouseResponse,
  CreateWarehouseRequest,
  UpdateWarehouseRequest,
} from "@/domain/warehouse/entities";
import type { PaginatedResponse, ApiResponse } from "@/domain/shared/entities";

export const warehousesApi = {
  getAll: (params?: Record<string, any>) =>
    api.get<PaginatedResponse<WarehouseResponse>>("/warehouses", { params }),

  getById: (id: string) =>
    api.get<ApiResponse<WarehouseResponse>>(`/warehouses/${id}`),

  create: (data: CreateWarehouseRequest) =>
    api.post<ApiResponse<WarehouseResponse>>("/warehouses", data),

  update: (id: string, data: UpdateWarehouseRequest) =>
    api.put<ApiResponse<WarehouseResponse>>(`/warehouses/${id}`, data),

  delete: (id: string) => api.delete(`/warehouses/${id}`),

  lookup: (kebeleId?: string) =>
    api.get<ApiResponse<{ id: string; name: string; code: string }[]>>(
      "/warehouses/lookup",
      { params: kebeleId ? { kebeleId } : {} },
    ),
};
```

**`src/infrastructure/warehouse/api/index.ts`**

```typescript
export * from "./warehouse.api";
```

**`src/infrastructure/warehouse/index.ts`**

```typescript
export * from "./api";
```

#### Step 3: Presentation — Form Dialog

**`src/presentation/components/warehouse/warehouse-form-dialog.tsx`**

```tsx
"use client";

import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { warehousesApi } from "@/infrastructure/warehouse";
import type { WarehouseResponse } from "@/domain/warehouse/entities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Label } from "@/presentation/components/ui/label";

interface Props {
  warehouse?: WarehouseResponse | null;
  open: boolean;
  onClose: () => void;
}

export function WarehouseFormDialog({ warehouse, open, onClose }: Props) {
  const queryClient = useQueryClient();
  const isEdit = !!warehouse;

  const mutation = useMutation({
    mutationFn: (values: any) =>
      isEdit
        ? warehousesApi.update(warehouse!.id, values)
        : warehousesApi.create(values),
    onSuccess: () => {
      toast.success(isEdit ? "Warehouse updated" : "Warehouse created");
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Operation failed");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: warehouse?.name || "",
      code: warehouse?.code || "",
      location: warehouse?.location || "",
      capacity: warehouse?.capacity || 0,
      kebeleId: warehouse?.kebele?.id || "",
    },
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Create"} Warehouse</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
          </div>
          <div>
            <Label>Code</Label>
            <Input
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              required
            />
          </div>
          {/* Add kebele selector, location, capacity fields */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

#### Step 4: Presentation — Page

**`src/app/(authenticated)/warehouses/page.tsx`**

```tsx
"use client";

import { CrudPage } from "@/presentation/components/shared/CrudPage";
import { warehousesApi } from "@/infrastructure/warehouse";
import { WarehouseFormDialog } from "@/presentation/components/warehouse/warehouse-form-dialog";
import type { WarehouseResponse } from "@/domain/warehouse/entities";
import { StatusBadge } from "@/presentation/components/shared/StatusBadge";

export default function WarehousesPage() {
  return (
    <CrudPage<WarehouseResponse>
      title="Warehouses"
      queryKey="warehouses"
      fetchFn={(params) => warehousesApi.getAll(params).then((r) => r.data)}
      deleteFn={(id) => warehousesApi.delete(id)}
      columns={[
        { key: "name", label: "Name", sortable: true },
        { key: "code", label: "Code", sortable: true },
        { key: "location", label: "Location" },
        {
          key: "capacity",
          label: "Capacity (Qt)",
          render: (v) => v.capacity.toFixed(1),
        },
        {
          key: "kebele",
          label: "Kebele",
          render: (v) => v.kebele?.name || "—",
        },
        {
          key: "isActive",
          label: "Status",
          render: (v) => <StatusBadge isActive={v.isActive} />,
        },
      ]}
      createPermission="warehouse:create"
      editPermission="warehouse:update"
      deletePermission="warehouse:delete"
      renderFormDialog={(item, onClose) => (
        <WarehouseFormDialog warehouse={item} open onClose={onClose} />
      )}
    />
  );
}
```

#### Step 5: Add Navigation Entry

In `src/presentation/components/layout/AppSidebar.tsx`, add the warehouse link to the appropriate navigation category:

```typescript
// Inside the navigation items array
{
  label: "Warehouses",
  href: "/warehouses",
  icon: WarehouseIcon,
  permission: "warehouse:read",
},
```

The sidebar automatically hides items the user doesn't have permission for.

#### Frontend Module Checklist

```
✅ domain/warehouse/entities/index.ts      — Request/Response types
✅ infrastructure/warehouse/api/            — API client module
✅ presentation/components/warehouse/       — Form dialog
✅ app/(authenticated)/warehouses/page.tsx  — Page component
✅ AppSidebar navigation entry              — Sidebar link
```

---

## 16. Order of Implementation

```
1. BACKEND: Prisma Schema
   └── Define model → run migration → generate client

2. BACKEND: Domain Layer
   ├── entities/    → Entity + Response interfaces
   └── repositories/ → Repository interface

3. BACKEND: Shared
   └── constants/   → DI token Symbols

4. BACKEND: Application Layer
   ├── dto/         → Zod validation schemas
   └── use-cases/   → CRUD use case classes

5. BACKEND: Infrastructure Layer
   ├── entities/    → ORM mapper class
   └── repositories/ → Prisma repository implementation

6. BACKEND: Presentation Layer
   ├── controllers/ → HTTP controller
   ├── providers/   → DI bindings (token → implementation)
   └── module.ts    → NestJS module

7. BACKEND: Registration
   ├── app.module.ts → Import new module
   └── seeds/       → Add permissions

8. FRONTEND: Domain Layer
   └── entities/    → TypeScript interfaces

9. FRONTEND: Infrastructure Layer
   └── api/         → Axios API client module

10. FRONTEND: Presentation Layer
    ├── components/ → Form dialog
    └── page.tsx    → CrudPage or custom page

11. FRONTEND: Navigation
    └── AppSidebar  → Add nav entry with permission
```

### File Count Per Module

| Layer          | Backend Files                         | Frontend Files           |
| -------------- | ------------------------------------- | ------------------------ |
| Domain         | 2-4 (entities + repo interfaces)      | 1 (entities)             |
| Application    | 2-3 (dto + use cases)                 | —                        |
| Infrastructure | 2-4 (mapper + repo impl)              | 1-2 (API client)         |
| Presentation   | 3-4 (controller + module + providers) | 2-3 (page + form dialog) |
| Shared/Config  | 1-2 (tokens + seeds)                  | 0-1 (sidebar entry)      |
| **Total**      | **~12-15 files**                      | **~4-6 files**           |

---

## 17. Environment Variables

### Backend (`.env`)

| Variable           | Example                                     | Description                        |
| ------------------ | ------------------------------------------- | ---------------------------------- |
| `DATABASE_URL`     | `postgresql://user:pass@localhost:5432/fms` | PostgreSQL connection              |
| `PORT`             | `4000`                                      | Server port                        |
| `API_PREFIX`       | `api/v1`                                    | API route prefix                   |
| `JWT_SECRET`       | `your-secret-key`                           | JWT signing secret                 |
| `JWT_EXPIRATION`   | `15m`                                       | Access token TTL                   |
| `FRONTEND_URL`     | `http://localhost:3016`                     | CORS allowed origin                |
| `SUPER_ADMIN_ROLE` | `super_admin`                               | Role name that bypasses all checks |
| `SYSTEM_ROLES`     | `super_admin,admin`                         | Non-deletable roles                |
| `THROTTLE_TTL`     | `60000`                                     | Rate limit window (ms)             |
| `THROTTLE_LIMIT`   | `100`                                       | Max requests per window            |

### Frontend (`.env.local`)

| Variable          | Example                        | Description                |
| ----------------- | ------------------------------ | -------------------------- |
| `BACKEND_URL`     | `http://localhost:4000/api/v1` | NestJS backend URL         |
| `NEXTAUTH_URL`    | `http://localhost:3016`        | NextAuth base URL          |
| `NEXTAUTH_SECRET` | `your-nextauth-secret`         | NextAuth encryption secret |
| `AUTH_SECRET`     | `your-auth-secret`             | NextAuth v5 secret         |

---

## 18. Database Migrations

### Creating a Migration

```bash
cd fms-backend
npx prisma migrate dev --name describe_your_change
```

### Applying Migrations (production)

```bash
npx prisma migrate deploy
```

### Resetting Database (development only)

```bash
npx prisma migrate reset --force
# Then re-seed:
npx ts-node prisma/seeds/seed.ts
```

### Viewing Data

```bash
npx prisma studio  # Opens GUI at localhost:5555
```

### Migration Best Practices

- One migration per logical change
- Name migrations descriptively: `add_warehouse`, `add_farmer_phone_field`
- Always add `@@index` for foreign keys and `deletedAt`
- Every model needs: `id`, `createdAt`, `updatedAt`, `deletedAt`, `createdBy`, `updatedBy`
- Use `@@map("table_name")` for snake_case table names
- Use `@map("column_name")` for snake_case column names

---

## 19. Coding Conventions

### Backend

| Convention            | Rule                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| **File naming**       | `kebab-case.ts` (e.g., `warehouse.controller.ts`)                         |
| **Class naming**      | `PascalCase` (e.g., `WarehouseController`)                                |
| **Interface naming**  | `I` prefix for repository interfaces (e.g., `IWarehouseRepository`)       |
| **DI tokens**         | `Symbol('InterfaceName')` in `*_TOKENS` objects                           |
| **Validation**        | Zod schemas (not class-validator decorators)                              |
| **Error handling**    | Throw NestJS HTTP exceptions (`NotFoundException`, `BadRequestException`) |
| **Soft delete**       | Never use `DELETE FROM`. Always set `deletedAt`                           |
| **Audit logging**     | Every create/update/delete must log to AuditRepository                    |
| **Permission format** | `module:action` (e.g., `warehouse:create`)                                |

### Frontend

| Convention           | Rule                                                              |
| -------------------- | ----------------------------------------------------------------- |
| **File naming**      | `kebab-case.tsx` for components, `camelCase.ts` for utilities     |
| **Component naming** | `PascalCase` (e.g., `WarehouseFormDialog`)                        |
| **API modules**      | Export an object with methods (e.g., `warehousesApi.getAll(...)`) |
| **State**            | TanStack Query for server state, Zustand for UI state             |
| **Permissions**      | Use `<PermissionGate>` or `useAuth().hasPermission()`             |
| **Styling**          | Tailwind CSS utility classes, `cn()` for conditional classes      |
| **Forms**            | Formik + Zod validation                                           |
| **Notifications**    | `toast.success()` / `toast.error()` from Sonner                   |
| **Path alias**       | `@/*` maps to `src/*`                                             |

---

## 20. Common Patterns Reference

### Backend: Standard Repository Method

```typescript
async findAll(query: any) {
  const where: any = { ...this.prisma.softDeleteFilter() };
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { code: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  // Add more filters as needed
  const skip = PaginationUtil.calculateSkip(query.page, query.limit);
  const [items, total] = await Promise.all([
    this.prisma.model.findMany({ where, orderBy, skip, take: query.limit, include }),
    this.prisma.model.count({ where }),
  ]);
  return { items, total };
}
```

### Backend: Standard Use Case

```typescript
@Injectable()
export class CreateEntityUseCase {
  constructor(
    @Inject(TOKENS.ENTITY_REPOSITORY) private readonly repo: IEntityRepository,
    @Inject(REPOSITORY_TOKENS.AUDIT_REPOSITORY)
    private readonly auditRepo: IAuditRepository,
  ) {}

  async execute(data: CreateDto, userId: string) {
    const entity = await this.repo.create(data, userId);
    await this.auditRepo.create({
      action: "ENTITY_CREATED",
      entity: "Entity",
      entityId: entity.id,
      userId,
      newValues: data,
    });
    return EntityMapper.toResponseDto(entity);
  }
}
```

### Backend: Standard Controller Method

```typescript
@Post()
@Permissions('module:create')
create(
  @Body(new ZodValidationPipe(CreateSchema)) dto: CreateDto,
  @CurrentUser() user: ICurrentUser,
) {
  return this.createUseCase.execute(dto, user.id);
}
```

### Frontend: Standard CrudPage

```tsx
<CrudPage<EntityResponse>
  title="Entities"
  queryKey="entities"
  fetchFn={(params) => entitiesApi.getAll(params).then((r) => r.data)}
  deleteFn={(id) => entitiesApi.delete(id)}
  columns={[
    { key: "name", label: "Name", sortable: true },
    {
      key: "isActive",
      label: "Status",
      render: (v) => <StatusBadge isActive={v.isActive} />,
    },
  ]}
  createPermission="module:create"
  editPermission="module:update"
  deletePermission="module:delete"
  renderFormDialog={(item, onClose) => (
    <EntityFormDialog entity={item} open onClose={onClose} />
  )}
/>
```

### Frontend: Standard API Module

```typescript
export const entitiesApi = {
  getAll: (params?) =>
    api.get<PaginatedResponse<EntityResponse>>("/entities", { params }),
  getById: (id) => api.get<ApiResponse<EntityResponse>>(`/entities/${id}`),
  create: (data) => api.post<ApiResponse<EntityResponse>>("/entities", data),
  update: (id, data) =>
    api.put<ApiResponse<EntityResponse>>(`/entities/${id}`, data),
  delete: (id) => api.delete(`/entities/${id}`),
  lookup: () => api.get<ApiResponse<LookupItem[]>>("/entities/lookup"),
};
```

### Frontend: Standard Form Dialog

```tsx
const mutation = useMutation({
  mutationFn: (values) =>
    isEdit ? api.update(id, values) : api.create(values),
  onSuccess: () => {
    toast.success(isEdit ? "Updated" : "Created");
    queryClient.invalidateQueries({ queryKey: ["entities"] });
    onClose();
  },
  onError: (err) => toast.error(err?.response?.data?.message || "Failed"),
});
```

---

## 21: Testing Strategy

- We should have:

### Unit tests, that test:

    Use cases
    Domain services
    Utilities
    Validation

### Integration tests, that test:

    Repository
    Prisma
    PostgreSQL

### API/E2E tests, that test:

    HTTP endpoint
    Authentication
    Authorization
    Validation
    Database

### Frontend tests, test:

    Forms
    PermissionGate
    API handling
    Important components

## 22: Error Handling

- Define standard errors.
  400 Bad Request
  401 Unauthorized, → not logged in
  403 Forbidden, logged in but not authorized
  404 Not Found, resource doesn't exist
  409 Conflict, duplicate code
  422 Validation Error
  429 Too Many Requests
  500 Internal Server Error

## 23 : Logging and Auditing

### Application logging

    POST /api/v1/warehouses
    user=123
    status=201
    duration=83m

### Audit logging

    User 123
    created users
    id=abc

## 24. Pagination, Search and Filtering

### Standardize centralized:

    ?page=1
    &limit=20
    &search=...
    &sortBy=name
    &sortOrder=asc

### Then define:

    default page = 1
    default limit = 20
    maximum limit = 100

## 25. Security

### Backend:

    JWT
    Helmet
    CORS
    Rate limiting
    Password hashing
    Input validation
    SQL injection protection
    Authorization
    Sensitive data handling

### Frontend:

    Secure authentication
    No JWT in localStorage
    BFF
    CSRF considerations
    Environment variables
    Permission-based UI

### Never be returned by APIs:

    passwordHash
    JWT secrets
    database credentials
    internal security information

## 26. Environment Management

### backend:

    .env

### Frontend:

    .env.local

## 27. Development Workflow

    Requirement
    	↓
    Business analysis
    	↓
    Database design
    	↓
    ERD
    	↓
    Prisma model
    	↓
    Migration
    	↓
    Backend domain
    	↓
    Backend application
    	↓
    Backend infrastructure
    	↓
    Backend presentation
    	↓
    Swagger/API test
    	↓
    Frontend domain
    	↓
    Frontend API
    	↓
    Frontend UI
    	↓
    Integration test
    	↓
    Review
    	↓
    Git commit

## 28. Quick Reference Card

| Task               | Backend Location                              | Frontend Location                               |
| ------------------ | --------------------------------------------- | ----------------------------------------------- |
| Add entity type    | `domain/<mod>/entities/`                      | `domain/<mod>/entities/`                        |
| Add DB model       | `prisma/schema.prisma`                        | —                                               |
| Add validation     | `application/<mod>/dto/`                      | Zod in form dialog                              |
| Add business logic | `application/<mod>/use-cases/`                | —                                               |
| Add DB queries     | `infrastructure/<mod>/database/repositories/` | —                                               |
| Add API endpoint   | `presentation/<mod>/controllers/`             | —                                               |
| Add API client     | —                                             | `infrastructure/<mod>/api/`                     |
| Add UI page        | —                                             | `app/(authenticated)/<route>/page.tsx`          |
| Add form           | —                                             | `presentation/components/<mod>/`                |
| Add permission     | `seeds/seed.ts` + `shared/constants/`         | `AppSidebar` + `PermissionGate`                 |
| Add navigation     | —                                             | `presentation/components/layout/AppSidebar.tsx` |

---

_Last updated: September 2026_
