function EncryptionPanel() {
  try {
    const [inputText, setInputText] = React.useState('');
    const [outputText, setOutputText] = React.useState('');
    const [algorithm, setAlgorithm] = React.useState('aes');
    const [key, setKey] = React.useState('');
    const [operation, setOperation] = React.useState('encrypt');
    const [isProcessing, setIsProcessing] = React.useState(false);

    const algorithmInfo = {
      aes: { name: 'AES-256', description: 'Симметричное шифрование', security: 'Высокая' },
      caesar: { name: 'Caesar Cipher', description: 'Классический алгоритм', security: 'Базовая' },
      base64: { name: 'Base64', description: 'Кодирование данных', security: 'Нет' }
    };

    const handleProcess = async () => {
      if (!inputText.trim()) return;
      
      setIsProcessing(true);
      
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      let result = '';
      
      try {
        if (operation === 'encrypt') {
          result = encryptText(inputText, algorithm, key);
        } else {
          result = decryptText(inputText, algorithm, key);
        }
        
        setOutputText(result);
        
        addToHistory({
          type: operation,
          algorithm: algorithm.toUpperCase(),
          input: inputText,
          output: result,
          timestamp: Date.now()
        });
      } catch (error) {
        setOutputText('Ошибка: ' + error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(outputText);
    };

    const clearFields = () => {
      setInputText('');
      setOutputText('');
      setKey('');
    };

    return (
      <div className="space-y-8 max-w-7xl mx-auto" data-name="encryption-panel" data-file="components/EncryptionPanel.js">
        <div className="section-header">
          <h2 className="section-title">Криптографическая лаборатория</h2>
          <p className="section-subtitle">
            Профессиональные инструменты для шифрования и защиты данных с поддержкой современных алгоритмов
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                <div className="icon-settings text-xl text-white"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Настройки операции</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Тип операции</label>
                <div className="grid grid-cols-2 gap-2">
                  {['encrypt', 'decrypt'].map(op => (
                    <button
                      key={op}
                      onClick={() => setOperation(op)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        operation === op 
                          ? 'bg-[var(--primary-color)] text-white shadow-lg' 
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {op === 'encrypt' ? 'Шифрование' : 'Расшифровка'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Алгоритм шифрования</label>
                <select 
                  value={algorithm} 
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="input-field"
                >
                  <option value="aes">AES-256 (Симметричное)</option>
                  <option value="caesar">Caesar Cipher (Классический)</option>
                  <option value="base64">Base64 (Кодирование)</option>
                </select>
                <div className="mt-3 p-3 bg-[var(--bg-tertiary)] rounded-xl">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{algorithmInfo[algorithm].name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{algorithmInfo[algorithm].description}</p>
                  <p className="text-xs text-[var(--accent-color)] font-medium">
                    Безопасность: {algorithmInfo[algorithm].security}
                  </p>
                </div>
              </div>

              {(algorithm === 'caesar' || algorithm === 'aes') && (
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                    {algorithm === 'caesar' ? 'Сдвиг (1-25)' : 'Ключ шифрования'}
                  </label>
                  <input
                    type={algorithm === 'caesar' ? 'number' : 'text'}
                    min={algorithm === 'caesar' ? '1' : undefined}
                    max={algorithm === 'caesar' ? '25' : undefined}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="input-field"
                    placeholder={algorithm === 'caesar' ? 'Введите сдвиг' : 'Введите ключ'}
                  />
                </div>
              )}

              <button onClick={clearFields} className="btn-secondary w-full">
                <div className="icon-refresh-cw text-lg mr-2"></div>
                Очистить поля
              </button>
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[var(--accent-color)] rounded-xl flex items-center justify-center">
                    <div className="icon-terminal text-xl text-white"></div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Обработка данных</h3>
                </div>
                {outputText && (
                  <button onClick={copyToClipboard} className="btn-secondary">
                    <div className="icon-copy text-lg mr-2"></div>
                    Копировать
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Входные данные
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="input-field h-40 resize-none"
                    placeholder="Введите текст для обработки..."
                  />
                  <p className="text-xs text-[var(--text-secondary)] mt-2">
                    Символов: {inputText.length}
                  </p>
                </div>

                <button 
                  onClick={handleProcess} 
                  disabled={!inputText.trim() || isProcessing}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="icon-loader-2 text-lg mr-2 animate-spin"></div>
                      Обработка...
                    </>
                  ) : (
                    <>
                      <div className={`icon-${operation === 'encrypt' ? 'lock' : 'unlock'} text-lg mr-2`}></div>
                      {operation === 'encrypt' ? 'Зашифровать данные' : 'Расшифровать данные'}
                    </>
                  )}
                </button>

                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
                    Результат обработки
                  </label>
                  <textarea
                    value={outputText}
                    readOnly
                    className="input-field h-40 resize-none bg-[var(--bg-tertiary)]"
                    placeholder="Результат появится здесь после обработки..."
                  />
                  {outputText && (
                    <p className="text-xs text-[var(--text-secondary)] mt-2">
                      Символов: {outputText.length}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EncryptionPanel component error:', error);
    return null;
  }
}
