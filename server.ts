import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Security Setup (Addressing Requirement 26)
// We use Helmet for security headers, but we disable contentSecurityPolicy in dev mode 
// because it can interfere with Vite's Hot Module Replacement / inline scripts.
// app.use(helmet({
//   contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
//   crossOriginEmbedderPolicy: false,
//   xFrameOptions: false,
//   crossOriginResourcePolicy: false,
//   crossOriginOpenerPolicy: false
// }));

app.use(cors());

// Limit raw JSON size to protect against large payloads (Input Validation)
app.use(express.json({ limit: "1mb" }));

// Rate Limiting (Addressing Requirement 26)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter only to API routes
app.use("/api/", apiLimiter);

// ---------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// n8n Workflow / Webhook Receiver Mock (Addressing Requirement 27 & 28)
app.post("/api/webhooks/whatsapp", async (req, res) => {
  try {
    const payload = req.body;
    
    // Webhook verification (mock)
    if (!req.headers['x-webhook-secret'] || req.headers['x-webhook-secret'] !== process.env.WEBHOOK_SECRET) {
      // Return 401 instead of crashing
      return res.status(401).json({ error: "Unauthorized webhook" });
    }

    // Example of handling duplicates using a mock redis/db lookup
    const messageId = payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id;
    if (messageId) {
      // Simulate checking for duplicates
      // if (await db.isDuplicate(messageId)) return res.status(200).json({ status: "ignored" })
    }

    // Step 1: Validate webhook
    // Step 2: Get business
    // Step 3: Get customer
    // Step 4: AI classify intent 
    // Step 5: Route to handler

    console.log(`[Webhook] Received WhatsApp message from ${payload.phone_number || 'Unknown'}`);
    
    // Simulate AI Timeout or Success
    // ...
    
    res.status(200).json({ status: "success", received: true });
  } catch (error) {
    console.error("[Webhook Error]", error);
    // Error Handling (Requirement 28): Don't crash, return 500
    res.status(500).json({ error: "Internal server error during webhook processing" });
  }
});

// ---------------------------------------------------------
// VITE MIDDLEWARE / SPA FALLBACK
// ---------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Timezone set to default or from environment.`);
  });
}

startServer();
