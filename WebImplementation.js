function WebImplementation() {
  try {
    const [selectedExample, setSelectedExample] = React.useState('jwt');

    const examples = {
      jwt: {
        title: 'JWT Token Authentication',
        description: 'Реализация безопасной аутентификации с JWT токенами',
        code: `// JWT Token Implementation
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTManager {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  refreshToken(oldToken) {
    const decoded = this.verifyToken(oldToken);
    delete decoded.iat;
    delete decoded.exp;
    return this.generateToken(decoded);
  }
}`
      },
      aes: {
        title: 'AES Encryption для Web API',
        description: 'Шифрование данных в REST API с использованием AES',
        code: `// AES Encryption for Web API
const crypto = require('crypto');

class AESCrypto {
  constructor(secretKey) {
    this.algorithm = 'aes-256-gcm';
    this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.secretKey, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData) {
    const decipher = crypto.createDecipher(
      this.algorithm, 
      this.secretKey, 
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}`
      },
      oauth: {
        title: 'OAuth 2.0 Implementation',
        description: 'Реализация OAuth 2.0 для безопасной авторизации',
        code: `// OAuth 2.0 Implementation
class OAuth2Server {
  constructor() {
    this.clients = new Map();
    this.tokens = new Map();
  }

  registerClient(clientId, clientSecret, redirectUri) {
    this.clients.set(clientId, {
      clientSecret,
      redirectUri,
      scopes: ['read', 'write']
    });
  }

  generateAuthCode(clientId, userId, scopes) {
    const authCode = crypto.randomBytes(32).toString('hex');
    
    this.tokens.set(authCode, {
      clientId,
      userId,
      scopes,
      type: 'authorization_code',
      expiresAt: Date.now() + 600000 // 10 minutes
    });
    
    return authCode;
  }

  exchangeCodeForToken(authCode, clientId, clientSecret) {
    const tokenData = this.tokens.get(authCode);
    const client = this.clients.get(clientId);
    
    if (!tokenData || !client || client.clientSecret !== clientSecret) {
      throw new Error('Invalid authorization code');
    }
    
    if (tokenData.expiresAt < Date.now()) {
      throw new Error('Authorization code expired');
    }
    
    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');
    
    this.tokens.delete(authCode);
    
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600
    };
  }
}`
      },
      blockchain: {
        title: 'Blockchain Hash Implementation',
        description: 'Реализация блокчейн-хеширования для веб-приложений',
        code: `// Blockchain Hash Implementation
const crypto = require('crypto');

class BlockchainHash {
  static calculateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static createBlock(index, previousHash, data, timestamp = Date.now()) {
    const blockData = index + previousHash + JSON.stringify(data) + timestamp;
    const hash = this.calculateHash(blockData);
    
    return {
      index,
      timestamp,
      data,
      previousHash,
      hash,
      nonce: 0
    };
  }

  static mineBlock(block, difficulty = 4) {
    const target = Array(difficulty + 1).join('0');
    
    while (block.hash.substring(0, difficulty) !== target) {
      block.nonce++;
      const blockData = block.index + block.previousHash + 
                       JSON.stringify(block.data) + block.timestamp + block.nonce;
      block.hash = this.calculateHash(blockData);
    }
    
    return block;
  }
}`
      },
      webauthn: {
        title: 'WebAuthn Biometric Authentication',
        description: 'Современная биометрическая аутентификация в браузере',
        code: `// WebAuthn Implementation
class WebAuthnManager {
  async registerUser(username) {
    const publicKeyCredentialCreationOptions = {
      challenge: new Uint8Array(32),
      rp: { name: 'CryptoSecure App' },
      user: {
        id: new TextEncoder().encode(username),
        name: username,
        displayName: username
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required'
      },
      timeout: 60000,
      attestation: 'direct'
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });
      
      return {
        id: credential.id,
        rawId: credential.rawId,
        response: credential.response
      };
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async authenticateUser(credentialId) {
    const publicKeyCredentialRequestOptions = {
      challenge: new Uint8Array(32),
      allowCredentials: [{
        id: credentialId,
        type: 'public-key'
      }],
      timeout: 60000,
      userVerification: 'required'
    };

    try {
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });
      
      return assertion;
    } catch (error) {
      throw new Error('Authentication failed: ' + error.message);
    }
  }
}`
      }
    };

    return (
      <div className="space-y-8 max-w-7xl mx-auto" data-name="web-implementation" data-file="components/WebImplementation.js">
        <div className="section-header">
          <h2 className="section-title">Веб-реализация криптографии</h2>
          <p className="section-subtitle">
            Практические примеры реализации криптографических методов в современных веб-приложениях
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`card-compact text-left transition-all ${
                selectedExample === key 
                  ? 'ring-2 ring-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-5' 
                  : 'hover:shadow-xl'
              }`}
            >
              <h3 className="font-bold text-[var(--text-primary)] mb-2">{example.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{example.description}</p>
            </button>
          ))}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              {examples[selectedExample].title}
            </h3>
            <button 
              onClick={() => navigator.clipboard.writeText(examples[selectedExample].code)}
              className="btn-secondary"
            >
              <div className="icon-copy text-lg mr-2"></div>
              Копировать код
            </button>
          </div>
          
          <p className="text-[var(--text-secondary)] mb-6">{examples[selectedExample].description}</p>
          
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {examples[selectedExample].code}
            </pre>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('WebImplementation component error:', error);
    return null;
  }
}
