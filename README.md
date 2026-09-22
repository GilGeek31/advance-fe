INSTALASI :

1. git clone https://github.com/GilGeek31/advance-fe.git
2. cd advance-fe
3. npm install
4. npm run dev

==================================
Framework : React 19 + Vite
Styling : Tailwind CSS v4 (@theme)
Routing : React Router DOM
State : management Redux Toolkit + React Redux
HTTP : Client Axios
Database : Firebase Firestore (via REST API)
Form : validation React Hook Form + Zod
Icon : Lucide React, React Icons

=======================================

struktur project

videobelajar/
├── .env # VITE_FIRESTORE_BASE_URL
├── .gitignore # .env, serviceAccountKey.json, node_modules, dll
├── serviceAccountKey.json # Kredensial Firebase Admin (gitignored)
├── package.json
├── README.md
│
├── scripts/
│
└── src/
├── main.jsx # Entry point — bungkus <App /> dengan <Provider store={store}>
├── App.jsx # Routing (React Router)
├── index.css # Tailwind v4 @theme — design token (warna, font, typography)
│
├── assets/
│ ├── logo-video-belajar.png
│ ├── Avatar.png
│ ├── hero/
│ │ ├── hero-image-1.jpg
│ │ └── form-thumbnail.jpg
│ ├── card-image/
│ └── card-avatar/
│
├── data/
│ └── course.json # Data awal course (dipakai oleh importCourses.js)
│
├── store/
│ └── redux/
│ ├── store.js # configureStore — daftar semua reducer
│ └── courseReducer.js # Slice: setCourses, addCourseToState, updateCourseInState, removeCourseFromState
│
├── services/
│ └── api/
│ ├── axiosInstance.js # Setup axios + interceptor (baseURL dari .env)
│ ├── firestoreConverter.js # Konversi format Firestore REST ↔ JS object biasa
│ └── courseApi.js # getCourses, addCourse, updateCourse, deleteCourse
│
├── hooks/
│ └── useCourses.js # Custom hook — gabungkan courseApi + Redux (useSelector/useDispatch)
│
├── components/
│ ├── layout/ # Struktur tetap, sama di semua halaman
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ │
│ ├── section/ # Section besar, reusable, konten dinamis per halaman
│ │ ├── Hero.jsx
│ │ ├── CourseSection.jsx
│ │ ├── CourseCard.jsx
│ │ ├── CategoryTabs.jsx
│ │ ├── NewsletterSection.jsx
│ │ ├── FooterColumn.jsx
│ │ └── SocialLinks.jsx
│ │
│ ├── ui/ # Komponen primitif, generik, dipakai berulang
│ │ ├── Button.jsx
│ │ ├── InputField.jsx
│ │ ├── SelectField.jsx
│ │ ├── PhoneInput.jsx
│ │ ├── CountryCodeSelect.jsx
│ │ ├── Card.jsx
│ │ ├── Divider.jsx
│ │ ├── Rating.jsx
│ │ └── CourseFormModal.jsx
│ │
│ └── auth/ # Spesifik untuk Login/Register
│ ├── AuthHeader.jsx
│ └── GoogleButton.jsx
│
└── pages/
├── HomePage.jsx # Navbar + Hero + CourseSection + NewsletterSection + Footer
├── LoginPage.jsx
└── RegisterPage.jsx

Alur CRUD

CourseSection.jsx
│
▼
useCourses() ──── useSelector/useDispatch (baca & kirim state)
│
├──► courseApi.js ──► axiosInstance.js ──► Firestore REST API
│
▼
courseReducer.js (Redux Toolkit) ──► store.js ──► Provider (main.jsx) ──► seluruh app
