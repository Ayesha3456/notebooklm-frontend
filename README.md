# NotebookLM Frontend

This is the Angular frontend of the NotebookLM Clone app. It allows users to upload PDFs and chat with an AI about the content.

## 🌐 Live URL
🔗 https://notebooklm-frontend-93jq.vercel.app/upload

## 🚀 Tech Stack
- Angular
- Bootstrap 5
- Bootstrap Icons
- PDF Viewer
- Hosted on Vercel

## 🛠️ Setup Instructions

```bash
cd frontend
npm install
ng serve
```

### 📦 Build for Production
```bash
ng build --configuration production
```

## 🔌 Backend API Configuration

Make sure the following API is used in your `ChatComponent`:

```ts
this.http.post<any>('https://notebooklm-backend-40m9.onrender.com/chat', { question: msg });
```

## 💡 Features
- Upload and preview PDF
- Chat interface to ask questions
- Page navigation from chat responses

## 📁 Folder Highlights
```
src/
├── app/
│   ├── chat/        # Chat interface component
│   └── upload/      # Upload UI
├── styles.scss      # Global styles
```
