// Utility functions for encryption and decryption

function encryptText(text, algorithm, key) {
  switch (algorithm) {
    case 'aes':
      return aesEncrypt(text, key);
    case 'chacha20':
      return chacha20Encrypt(text, key);
    case 'blowfish':
      return blowfishEncrypt(text, key);
    case 'twofish':
      return twofishEncrypt(text, key);
    case 'caesar':
      return caesarEncrypt(text, parseInt(key) || 3);
    case 'base64':
      return btoa(unescape(encodeURIComponent(text)));
    default:
      throw new Error('Неподдерживаемый алгоритм');
  }
}

function decryptText(text, algorithm, key) {
  switch (algorithm) {
    case 'aes':
      return aesDecrypt(text, key);
    case 'chacha20':
      return chacha20Decrypt(text, key);
    case 'blowfish':
      return blowfishDecrypt(text, key);
    case 'twofish':
      return twofishDecrypt(text, key);
    case 'caesar':
      return caesarDecrypt(text, parseInt(key) || 3);
    case 'base64':
      try {
        return decodeURIComponent(escape(atob(text)));
      } catch (e) {
        throw new Error('Неверный формат Base64');
      }
    default:
      throw new Error('Неподдерживаемый алгоритм');
  }
}

// Simple AES simulation (for demonstration purposes)
function aesEncrypt(text, key) {
  // Use default key if none provided for demo purposes
  const encryptionKey = key || 'defaultkey123';
  
  // Simple XOR-based encryption for demonstration
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar = encryptionKey[i % encryptionKey.length];
    const encryptedChar = String.fromCharCode(text.charCodeAt(i) ^ keyChar.charCodeAt(0));
    result += encryptedChar;
  }
  return btoa(result);
}

function aesDecrypt(text, key) {
  // Use default key if none provided for demo purposes
  const decryptionKey = key || 'defaultkey123';
  
  try {
    const decodedText = atob(text);
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      const keyChar = decryptionKey[i % decryptionKey.length];
      const decryptedChar = String.fromCharCode(decodedText.charCodeAt(i) ^ keyChar.charCodeAt(0));
      result += decryptedChar;
    }
    return result;
  } catch (e) {
    throw new Error('Ошибка расшифровки AES');
  }
}

// Caesar cipher implementation
function caesarEncrypt(text, shift) {
  return text.replace(/[a-zA-Zа-яА-Я]/g, function(char) {
    const start = char <= 'Z' ? 65 : (char <= 'z' ? 97 : (char <= 'Я' ? 1040 : 1072));
    const range = char <= 'Z' || char <= 'z' ? 26 : 33;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % range) + start);
  });
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift);
}

// ChaCha20 simulation (simplified for demo)
function chacha20Encrypt(text, key) {
  const encryptionKey = key || 'chacha20defaultkey';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar = encryptionKey[(i * 3) % encryptionKey.length];
    const encryptedChar = String.fromCharCode(text.charCodeAt(i) ^ keyChar.charCodeAt(0) ^ (i % 256));
    result += encryptedChar;
  }
  return btoa(result);
}

function chacha20Decrypt(text, key) {
  const decryptionKey = key || 'chacha20defaultkey';
  try {
    const decodedText = atob(text);
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      const keyChar = decryptionKey[(i * 3) % decryptionKey.length];
      const decryptedChar = String.fromCharCode(decodedText.charCodeAt(i) ^ keyChar.charCodeAt(0) ^ (i % 256));
      result += decryptedChar;
    }
    return result;
  } catch (e) {
    throw new Error('Ошибка расшифровки ChaCha20');
  }
}

// Blowfish simulation (simplified)
function blowfishEncrypt(text, key) {
  const encryptionKey = key || 'blowfishkey';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const keyIndex = (i * 7) % encryptionKey.length;
    const keyChar = encryptionKey[keyIndex];
    const encryptedChar = String.fromCharCode((text.charCodeAt(i) + keyChar.charCodeAt(0)) % 256);
    result += encryptedChar;
  }
  return btoa(result);
}

function blowfishDecrypt(text, key) {
  const decryptionKey = key || 'blowfishkey';
  try {
    const decodedText = atob(text);
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      const keyIndex = (i * 7) % decryptionKey.length;
      const keyChar = decryptionKey[keyIndex];
      const decryptedChar = String.fromCharCode((decodedText.charCodeAt(i) - keyChar.charCodeAt(0) + 256) % 256);
      result += decryptedChar;
    }
    return result;
  } catch (e) {
    throw new Error('Ошибка расшифровки Blowfish');
  }
}

// Twofish simulation (simplified)
function twofishEncrypt(text, key) {
  const encryptionKey = key || 'twofishsecretkey';
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const keyChar1 = encryptionKey[i % encryptionKey.length];
    const keyChar2 = encryptionKey[(i + 1) % encryptionKey.length];
    const encryptedChar = String.fromCharCode(text.charCodeAt(i) ^ keyChar1.charCodeAt(0) ^ keyChar2.charCodeAt(0));
    result += encryptedChar;
  }
  return btoa(result);
}

function twofishDecrypt(text, key) {
  const decryptionKey = key || 'twofishsecretkey';
  try {
    const decodedText = atob(text);
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      const keyChar1 = decryptionKey[i % decryptionKey.length];
      const keyChar2 = decryptionKey[(i + 1) % decryptionKey.length];
      const decryptedChar = String.fromCharCode(decodedText.charCodeAt(i) ^ keyChar1.charCodeAt(0) ^ keyChar2.charCodeAt(0));
      result += decryptedChar;
    }
    return result;
  } catch (e) {
    throw new Error('Ошибка расшифровки Twofish');
  }
}
