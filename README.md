# Support Desk - Ticket Management Web App

Support Desk is a web application for managing support tickets and categories. It provides CRUD (Create, Read, Update, Delete) endpoints for both ticket and category modules. This documentation will guide you on how to use and interact with the API.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Tickets](#tickets)
  - [Categories](#categories)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you start, make sure you have the following prerequisites:

- Node.js and npm installed.
- A database (e.g., PostgreSQL, MySQL) for storing data.
- An understanding of REST API concepts.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/balajipari/support-desk-api.git

2. Navigate to the project directory:

   ```bash
   cd support-desk

3. Install dependencies

   ```bash
   npm i

4. Create DB and run DB scripts. You can find the db.sql script file under src/scripts

5. Configure your database connection settings in the .env file. Use .env.example file for refernce

6. Start the application:

   ```bash
   npm start

The application should be running on http://localhost:3000.

## API Endpoints

### Tickets

#### Get All Tickets

- **URL**: `/api/tickets`
- **Method**: `GET`
- **Description**: Retrieve a list of all support tickets.
- **Response**: A JSON array of support tickets.

#### Get Ticket by ID

- **URL**: `/api/tickets/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific support ticket by its ID.
- **Response**: A JSON object representing the support ticket.

#### Create Ticket

- **URL**: `/api/tickets/create`
- **Method**: `POST`
- **Description**: Create a new support ticket.
- **Request Body**: JSON data containing ticket details.
- **Response**: A JSON object representing the newly created support ticket.

#### Update Ticket

- **URL**: `/api/tickets/update/:id`
- **Method**: `PATCH`
- **Description**: Update the details of an existing support ticket.
- **Request Body**: JSON data containing ticket details to update.
- **Response**: A JSON object representing the updated support ticket.

#### Assign Ticket

- **URL**: `/api/tickets/assign/:id`
- **Method**: `POST`
- **Description**: Assign a support ticket to a specific support agent.
- **Request Body**: JSON data specifying the assigned agent.
- **Response**: A success message.

#### Close Ticket

- **URL**: `/api/tickets/close/:id`
- **Method**: `POST`
- **Description**: Close a support ticket.
- **Response**: A success message.

### Categories

#### Get All Categories

- **URL**: `/api/categories`
- **Method**: `GET`
- **Description**: Retrieve a list of all ticket categories.
- **Response**: A JSON array of ticket categories.

#### Get Category by ID

- **URL**: `/api/categories/:id`
- **Method**: `GET`
- **Description**: Retrieve a specific category by its ID.
- **Response**: A JSON object representing the category.

#### Create Category

- **URL**: `/api/categories/create`
- **Method**: `POST`
- **Description**: Create a new ticket category.
- **Request Body**: JSON data containing category details.
- **Response**: A JSON object representing the newly created category.

#### Update Category

- **URL**: `/api/categories/update/:id`
- **Method**: `PATCH`
- **Description**: Update the details of an existing category.
- **Request Body**: JSON data containing category details to update.
- **Response**: A JSON object representing the updated category.

#### Delete Category

- **URL**: `/api/categories/delete/:id`
- **Method**: `DELETE`
- **Description**: Delete a category by its ID.
- **Response**: A success message.

