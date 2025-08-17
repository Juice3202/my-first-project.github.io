// Storage utilities for managing encryption history

function getEncryptionHistory() {
  try {
    const history = localStorage.getItem('encryptionHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading encryption history:', error);
    return [];
  }
}

function addToHistory(operation) {
  try {
    const history = getEncryptionHistory();
    history.unshift(operation); // Add to beginning
    
    // Keep only last 100 operations
    if (history.length > 100) {
      history.splice(100);
    }
    
    localStorage.setItem('encryptionHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}

function clearHistory() {
  try {
    localStorage.removeItem('encryptionHistory');
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}

function exportHistory() {
  try {
    const history = getEncryptionHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'encryption_history.json';
    link.click();
  } catch (error) {
    console.error('Error exporting history:', error);
  }
}
