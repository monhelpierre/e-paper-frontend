# Next.js Frontend Application for Document Management

This project is a Next.js frontend application that communicates with a Node.js backend server to manage documents and interact with the database using Prisma ORM. It allows users to view, upload and delete documents, with an interactive UI to manage document-related data.

## Table of Contents

- [Next.js Frontend Application for Document Management](#nextjs-frontend-application-for-document-management)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)

---

## Features

- **Document Management Interface**: View and upload documents via an intuitive UI.
- **Communication with Backend**: Uses REST API calls to interact with the Node.js backend that handles document storage and retrieval.
- **File Upload**: Integrates file upload functionality to store PDF documents.
- **Dynamic Pages**: Fetches documents from the backend and displays them dynamically.
- **Modern UI**: Built with Next.js and Material-UI for a responsive and modern design.

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running instance of the Node.js backend server (see the backend setup [here](https://github.com/monhelpierre/e-paper-prisma-backend)).

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <https://github.com/monhelpierre/e-paper-frontend>
   cd <e-paper-frontend>
   ```

2. **Install dependencies**

   ```bash
       npm install
   ```

   Or

   ```bash
       yarn install
   ```

3. **Set up environment**

   ```bash
       NEXT_PUBLIC_API_URL=http://localhost:3001" # Change this URL to your backend URL
   ```

4. **Start the Server**
   For development

   ```bash
       npm run dev
   ```

   For development

   ```bash
      npm start
   ```
