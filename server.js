import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes (including static files)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Disable caching for all responses
app.use((req, res, next) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  next();
});

// Serve static files from dist directory
app.use(express.static(join(__dirname, "dist")));

// API endpoint to list available files
app.get("/api/files", (req, res) => {
  const files = {
    react: {
      index: "/react/index.js",
      useAuth: "/react/useAuth.js",
    },
    framer: {
      index: "/framer/index.js",
      overrides: "/framer/overrides.js",
      test: "/framer/test.js",
    },
    authStore: "/auth-store.js",
  };

  res.json({
    message: "Outseta Toolkit - Available files",
    files,
    usage: {
      "ES6 Import Example":
        'import { useAuth } from "https://your-ngrok-url.ngrok.io/react/useAuth.js"',
      "Script Tag Example":
        '<script type="module" src="https://your-ngrok-url.ngrok.io/auth-store.js"></script>',
    },
  });
});

// Root endpoint with helpful info
app.get("/", (req, res) => {
  res.json({
    name: "@outseta/toolkit",
    description: "Outseta Toolkit development server",
    endpoints: {
      "/api/files": "List available files and usage examples",
      "/framer/overrides": "Framer overrides",
      "/framer/test": "Framer test",
    },
  });
});

function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📁 Serving files from: ${join(__dirname, "dist")}`);
      console.log(`📋 Test your files at: http://localhost:${PORT}/api/files`);
      console.log(`💡 To expose publicly, run: ngrok http ${PORT}`);
    });

    // Handle cleanup
    process.on("SIGINT", () => {
      console.log("\n🛑 Shutting down...");
      server.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

startServer();
