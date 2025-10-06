# Behmand Co. Frontend

The official **frontend** for Behmand Co., built with **React** and designed for a seamless, responsive user experience.  
This project serves both the public-facing website and the internal admin dashboard, integrating tightly with the backend API.

---

## ✨ Highlights
- Built with **React + Vite** for fast performance
- Fully responsive layout across desktop, tablet, and mobile
- Admin panel with protected routes and JWT-based authentication
- Blog listing and detail pages
- Resume submission form with file upload
- Contact form with validation and backend integration
- RTL support for Farsi content
- Clean UI with modern design patterns (cards, popups, transitions)

---

## 📁 Project Structure
behmand-co-front/ │── src/ │ ├── pages/ # Public and admin pages │ ├── components/ # Reusable UI components │ ├── layouts/ # Page layouts (e.g. AdminLayout, PublicLayout) │ ├── hooks/ # Custom React hooks │ ├── services/ # API calls and helpers │ ├── context/ # Global state (e.g. auth) │ ├── assets/ # Images, icons, fonts │ └── App.jsx # Main app entry │── public/ # Static files │── index.html # HTML template │── vite.config.js # Vite configuration │── .env.example # Example environment variables

Code

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/mehdiarz/behmand-co-front.git
cd behmand-co-front
2. Install dependencies
bash
npm install
3. Configure environment variables
Create a .env file based on .env.example:

Code
VITE_API_BASE_URL=https://your-backend-domain.com/api
4. Run the development server
bash
npm run dev
The app will be available at http://localhost:5173 by default.

🔐 Admin Panel
Accessible via /admin route

Requires login with valid credentials

JWT token stored securely in localStorage

Protected routes using custom PrivateRoute component

Sections include:

Blog management (create/edit/delete)

Resume submissions

Contact messages

Dashboard shortcuts

🌐 Public Pages
Homepage with animated hero section and feature highlights

About page with team cards and company info

Blog listing and detail view

Resume upload form

Contact form with validation and feedback

Farsi support with RTL layout and typography

🧪 Roadmap
Add unit and integration tests (Vitest + React Testing Library)

Improve accessibility (ARIA roles, keyboard navigation)

Add loading skeletons and error boundaries

Add dark mode toggle

Optimize image loading and lazy rendering

👨‍💻 Author
Developed and maintained by Mehdi Arz

📄 License
This project is licensed under the MIT License.