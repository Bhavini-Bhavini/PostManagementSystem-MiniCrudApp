# PostManagementSystem-MiniCrudApp

# 📝 Post Management System

A responsive **Post Management System** built with **React JS (Vite)** that allows users to create, read, update, and delete blog posts. The application uses **React Router DOM** for navigation and **localStorage** for persistent data storage, providing a complete frontend CRUD experience without a backend.

---

## 🚀 Features

- 📋 View all posts in a clean card layout
- 🔍 Search posts by title
- 👤 Filter posts by author
- 📄 Pagination for easy navigation
- ➕ Create new posts
- ✏️ Edit existing posts
- 🗑️ Delete posts with confirmation
- 👀 View complete post details
- 🏷️ Tags displayed as badges
- 💾 Data stored using localStorage
- ✅ Form validation with inline error messages
- 📱 Fully responsive design

---

## 🛠️ Technologies Used

- React JS
- Vite
- JavaScript (ES6+)
- React Router DOM
- CSS3
- LocalStorage

---

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Pagination.jsx
│   ├── PostCard.jsx
│   └── PostForm.jsx
│
├── pages/
│   ├── PostList.jsx
│   ├── PostCreate.jsx
│   ├── PostEdit.jsx
│   └── PostView.jsx
│
├── data/
│   └── seedPosts.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── utils/
│   └── validators.js
│
├── routes.jsx
├── App.jsx
├── main.jsx
└── styles.css
```

---

## 📸 Screenshots

### 🏠 Home Page

> Add screenshot here

```md
![Home Page](screenshots/home.png)
```

---

### ➕ Create Post

```md
![Create Post](screenshots/create-post.png)
```

---

### 📄 View Post

```md
![View Post](screenshots/view-post.png)
```

---

### ✏️ Edit Post

```md
![Edit Post](screenshots/edit-post.png)
```

---

### 🗑️ Delete Confirmation

```md
![Delete Post](screenshots/delete-post.png)
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/post-management-system.git
```

Go to the project folder:

```bash
cd post-management-system
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 📌 Routes

| Route | Description |
|--------|-------------|
| `/` | View all posts |
| `/posts/new` | Create a new post |
| `/posts/:id` | View post details |
| `/posts/:id/edit` | Edit an existing post |

---

## 📦 Data Structure

```javascript
{
  id: "uuid",
  title: "Post Title",
  author: "Author Name",
  content: "Post Content",
  tags: ["react", "javascript"],
  createdAt: "2026-07-01",
  updatedAt: "2026-07-01"
}
```

---

## 🎯 Key Functionalities

- Create, Read, Update and Delete posts
- Client-side search functionality
- Author-based filtering
- Responsive pagination
- LocalStorage persistence
- Reusable React components
- Clean and organized folder structure
- Form validation
- Responsive dashboard UI

---

## 🔮 Future Enhancements

- API integration using Axios
- Context API or Redux for state management
- Toast notifications
- Dark mode
- Sorting by title or date
- Tag filtering
- User authentication
- Rich text editor
- Unit testing with Jest and React Testing Library

---

## 👨‍💻 Author

Developed as a React CRUD application using **React JS**, **Vite**, and **JavaScript**.

---

## 📄 License

This project is created for educational and learning purposes.
