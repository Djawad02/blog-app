This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

git clone https://gitlab.com/co-ios/co-mean/initialrepo.git
cd initialrepo  


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blog Application in NEXTJS

## Overview

This project is a blog application which allows users to write, edit, and delete blog posts. It is built using Next.js, Prisma, and MySQL.

## Features
- User Authentication: Implemented with  NextAuth.js. Only authenticated users can perform add/edit/delete operations
- CRUD Operations: Users can create, read, add, update, and delete blogs, categories or tags.
- Responsive Design: The application is fully responsive, ensuring a smooth experience on all devices.
- Searching: Search functionality for posts by title, category, or tag.
- Error Handling and Validation: Error handling and validation wherever required.

## Database Setup
Make sure to set up your database by creating a MySQL database and running the necessary migrations. Populate the data as per requirement.

## Environment Variables
You may need to create a .env file in the root of your project with the following variables:

- DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=<any random key value>

Make sure your database is up and running before starting the application.

## Production Mode
To run the application in production mode:

```bash
npm run build

npm start
```

