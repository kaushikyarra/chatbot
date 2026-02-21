# Nova AI — Intelligent Assistant

A standalone AI assistant application connected to Hugging Face, built for integration into larger systems.

**Architecture:** `Frontend → Backend → Hugging Face API → Model → Backend → Frontend`

---

## Project Structure

```
├── backend/              Node.js + Express API server
│   ├── config/           Environment configuration
│   ├── controllers/      Request handlers
│   ├── routes/           API route definitions
│   ├── services/         Hugging Face API integration
│   └── server.js         Entry point
├── frontend/             React + Vite chat interface
│   └── src/
│       ├── components/   UI components
│       ├── services/     API client
│       └── index.css     Design system
└── huggingface-space/    Ready-to-deploy Gradio Space
    ├── app.py
    └── requirements.txt
```

---

## Prerequisites

- **Node.js** v18+
- **Hugging Face Account** — [Sign up free](https://huggingface.co/join)
- **HF API Token** — [Generate here](https://huggingface.co/settings/tokens)

---

## Quick Start

### 1. Configure Environment

```bash
cd backend
# Edit .env and add your Hugging Face API token
# HF_API_TOKEN=hf_your_token_here
```

### 2. Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`.

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 4. Open the App

Visit `http://localhost:5173` in your browser.

---

## API Reference

### POST `/api/ai/query`

Send a message to the AI assistant.

**Request:**
```json
{ "message": "Hello, how are you?" }
```

**Response:**
```json
{ "response": "I'm doing great! How can I help you?" }
```

**Error:**
```json
{ "error": "Error description" }
```

### GET `/api/health`

Health check endpoint.

---

## (Optional) Deploy Hugging Face Space

1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. Select **Gradio** SDK
3. Upload `huggingface-space/app.py` and `huggingface-space/requirements.txt`
4. Once deployed, set `HF_SPACE_URL` in `backend/.env`:
   ```
   HF_SPACE_URL=https://your-space-name.hf.space
   ```
5. Restart the backend

---

## Integration Notes (Step 2)

The endpoint `POST /api/ai/query` is the integration bridge.
This endpoint will be consumed by the banking application in Step 2.
**Do not rename or change this endpoint.**
