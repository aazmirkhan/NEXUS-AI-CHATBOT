# NexusAI Assistant

NexusAI Assistant is a simple, fast AI chatbot built as part of the Nexus AI project portfolio.

It uses the Groq API to generate responses and runs through a clean, responsive web interface. The main goal of this project was to understand how an AI model can be connected to a real frontend using a secure serverless API.

<p align="center">
  <a href="https://nexus-ai-chatbot-git-main-nexusaihq26.vercel.app/">
    <strong>Try the Live Demo</strong>
  </a>
</p>

---

## About the Project

I built NexusAI Assistant as a practical AI integration project.

Instead of calling the AI API directly from the browser, the application sends user messages to a serverless function. That function securely communicates with Groq and returns the generated response to the chat interface.

This helped me gain hands-on experience with:

- AI API integration
- Serverless functions
- Secure environment variables
- Responsive frontend development
- Error and loading-state handling
- Vercel deployment

---

## Live Demo

You can test the deployed application here:

**https://nexus-ai-chatbot-kappa.vercel.app/**

The production deployment requires a valid Groq API key configured in Vercel.

---

## Features

- Real-time AI-generated responses
- Groq API integration
- Clean and responsive chat interface
- Support for desktop and mobile screens
- Loading indicators while responses are generated
- Basic error handling
- Secure server-side API-key usage
- Vercel serverless function
- Lightweight Vite frontend

---

## Tech Stack

| JavaScript | Application and chatbot logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| Vite | Local development and production builds |
| Groq API | AI-generated responses |
| Vercel Functions | Secure backend API route |
| Vercel | Hosting and deployment |

---

## Project Structure

```text
NEXUS-AI-CHATBOT/
├── api/
│   └── chat.js
├── src/
│   ├── main.js
│   └── style.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── LICENSE
