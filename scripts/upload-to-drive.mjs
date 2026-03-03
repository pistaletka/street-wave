import fs from "fs";
import path from "path";
import http from "http";
import { URL } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config({ override: true });

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = path.resolve("google/oauth-token.json");
const oauthClientPath = process.env.GOOGLE_OAUTH_CLIENT_PATH || "google/oauth-client.json";
const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

const filePath = process.argv[2];
const fileName = process.argv[3] || path.basename(filePath);

if (!filePath) {
  console.error("Usage: node upload-to-drive.mjs <file> [name]");
  process.exit(1);
}

// Try alternate filenames (colon vs hyphen)
function findOAuthClient() {
  const candidates = [
    path.resolve(oauthClientPath),
    path.resolve("google/google:oauth-client.json"),
    path.resolve("google/oauth-client.json"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  console.error("OAuth client file not found. Tried:", candidates);
  process.exit(1);
}

function loadCredentials(filePath) {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return raw.installed || raw.web;
}

function getOAuth2Client(credentials) {
  const { client_id, client_secret, redirect_uris } = credentials;
  return new google.auth.OAuth2(client_id, client_secret, "http://localhost:3333");
}

async function authorize() {
  const creds = loadCredentials(findOAuthClient());
  const oauth2 = getOAuth2Client(creds);

  // Check for saved token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    oauth2.setCredentials(token);

    // Auto-refresh if expired
    oauth2.on("tokens", (newTokens) => {
      const merged = { ...token, ...newTokens };
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
    });

    return oauth2;
  }

  // No token — run consent flow
  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("Open this URL to authorize:\n");
  console.log(authUrl);
  console.log("\nWaiting for callback on http://localhost:3333 ...");

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, "http://localhost:3333");
      const code = url.searchParams.get("code");
      if (code) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>OK — you can close this tab.</h2>");
        server.close();
        resolve(code);
      } else {
        res.writeHead(400);
        res.end("No code");
      }
    });
    server.listen(3333);
    server.on("error", reject);
  });

  const { tokens } = await oauth2.getToken(code);
  oauth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log("Token saved to", TOKEN_PATH);

  return oauth2;
}

async function upload() {
  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  const response = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    },
    media: {
      mimeType: "application/octet-stream",
      body: fs.createReadStream(filePath),
    },
  });

  console.log("Uploaded:", response.data.id);
  console.log("Name:", response.data.name);
}

upload();
