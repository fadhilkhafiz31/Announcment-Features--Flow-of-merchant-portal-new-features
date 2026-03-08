// ── MOCK DATABASE ──
// In a real app this would be MySQL, MongoDB, etc.
// For this demo everything is stored in memory.

const users = [
  {
    id: '1',
    username: 'admin',
    // bcrypt hash of 'admin123'
    password: '$2a$10$VK55GLXff3UsZ3VniFOP6edTvRlPvha0QLq7vmP2hz8UqzBoim.la',
    email: 'mis.intern@i-city.my',
    displayName: 'MIS Intern'
  }
];

const clients = [
  {
    id: 'superapp-dashboard',
    secret: 'superapp-secret',
    name: 'SuperApp Dashboard',
    redirectUri: 'http://localhost:3000/callback'
  }
];

// In-memory token store
const accessTokens = {};
const authCodes    = {};

module.exports = {
  // ── USERS ──
  findUserById(id) {
    return users.find(u => u.id === id) || null;
  },
  findUserByUsername(username) {
    return users.find(u => u.username === username) || null;
  },

  // ── CLIENTS ──
  findClientById(id) {
    return clients.find(c => c.id === id) || null;
  },
  findClientByIdAndSecret(id, secret) {
    return clients.find(c => c.id === id && c.secret === secret) || null;
  },

  // ── ACCESS TOKENS ──
  saveAccessToken(token, userId, clientId) {
    accessTokens[token] = { userId, clientId, createdAt: Date.now() };
  },
  findAccessToken(token) {
    return accessTokens[token] || null;
  },

  // ── AUTH CODES ──
  saveAuthCode(code, userId, clientId, redirectUri) {
    authCodes[code] = { userId, clientId, redirectUri, createdAt: Date.now() };
  },
  findAuthCode(code) {
    return authCodes[code] || null;
  },
  deleteAuthCode(code) {
    delete authCodes[code];
  }
};
