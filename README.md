# BookMiejsce 📚

**BookMiejsce** is a social book-tracking web application where readers can discover books, organize their reading lists, share reviews, and connect with other readers and authors. It brings together personal bookshelves, book discovery, and recommendations based on the people and authors a user follows.

Built with **Node.js**, **Express.js**, **EJS**, and **Oracle Database**.

## Features

- **User accounts and profiles:** Register, sign in, sign out, and manage a reader profile. Passwords are hashed using bcrypt; the application uses JWTs stored in cookies for authentication.
- **Book discovery:** Browse available titles and search for books by title, author, or genre. View book descriptions, author information, publication details, and reviews.
- **Personal bookshelves:** Organize books into **Currently Reading**, **Read**, and **Want to Read** lists.
- **Ratings and reviews:** Rate books, write reviews, and engage with other readers' reviews through likes and comments.
- **Social reading:** Find other readers, view their profiles, and follow them. Follow authors and browse their books.
- **Reading recommendations:** Explore books read or saved by followed readers and books by followed authors that are not already on your shelves.
- **Book and author management:** Access administrative pages for adding books, uploading cover images, and managing author information.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express.js |
| Frontend | EJS templates, HTML, CSS, JavaScript |
| Database | Oracle Database (`oracledb` driver) |
| Authentication | JSON Web Tokens (JWT), bcrypt, cookies |
| File uploads | `express-fileupload` |
| Other tooling | dotenv, Morgan, express-validator |

## Project Structure

```text
BookMiejsce/
├── app.js                 # Express application entry point
├── Database/              # Oracle configuration, queries, data access
├── controller/            # User authentication and request handlers
├── middleware/            # Authentication and authorization helpers
├── route/                 # Book, author, reader, review, and admin routes
├── views/                 # EJS templates
├── public/                # Static assets and uploaded images
├── package.json           # Project dependencies
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js and npm
- An accessible Oracle Database instance
- Oracle Client libraries / Oracle Instant Client as required by the project's `oracledb` v5 driver and your operating system
- An Oracle schema containing the tables and database routines referenced by the application

### 1. Clone the repository

```bash
git clone https://github.com/lara-62/BookMiejsce.git
cd BookMiejsce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Oracle Database

Configure the database credentials and connection descriptor in `Database/Config.js`. In the current code, the connection configuration is defined directly in that file rather than being loaded from environment variables. Make sure you update the connection details in **both** the exported database configuration and the `Database_class` connection logic.

The application expects Oracle tables for users/readers, books, authors, publishers, genres, reading-status lists, follows, reviews, and related records. Its sign-up flow also invokes an Oracle routine named `uniquemail`. Provision the schema and its dependencies before running database-backed features.

> **Important:** The repository currently contains hardcoded database credentials and a JWT secret in `Database/Config.js`. Replace these with your own values, move secrets to environment variables, and rotate any credentials that were previously used. Never commit real secrets.

### 4. Run the application

```bash
node app.js
```

Visit **http://localhost:3000** in your browser. The default port is `3000`; the application also reads a lowercase `port` environment variable when present.

> The current `package.json` does not define an `npm start` script. Use `node app.js` unless you add one.

## Main Application Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/api/login` | Login page / login handling |
| `/user-profile` | Reader dashboard and recommendations |
| `/your_book` | Personal bookshelves |
| `/Book_detail/:id` | Book details, reading status, and reviews |
| `/friends_book` | Book recommendations from followed readers |
| `/authors_book` | Books from followed authors |
| `/user-following` | Followed authors |
| `/show_Your_friends` | Followed readers |
| `/Admin/Home` | Administrative book listing |
| `/upload_book` | Add a book and cover image |

Some routes require an authenticated session, and several search and update operations use `POST` requests rather than direct browser navigation.

## How It Works

1. A reader creates an account or logs in.
2. They search for books by title, author, or genre and explore book details.
3. They add books to their **Read**, **Currently Reading**, or **Want to Read** shelves.
4. They can publish ratings and reviews, and like or comment on reviews.
5. By following readers and authors, they get additional book-discovery suggestions based on those connections.

## Development Notes

This is a project repository, not a production-ready deployment guide. A local setup needs a compatible Oracle schema and working connection settings. Before deploying publicly, review authorization on administrative and follow-related routes, secure cookie settings and JWT issuance, validate uploads, move credentials out of source code, and add automated tests. The current `npm test` script is only a placeholder.

## Repository

[github.com/lara-62/BookMiejsce](https://github.com/lara-62/BookMiejsce)

## License

The `package.json` declares **ISC**. Verify that a license file and any third-party asset licenses are included before redistributing the project.
