function FileEncryption() {
  try {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [algorithm, setAlgorithm] = React.useState('aes');
    const [key, setKey] = React.useState('');
    const [operation, setOperation] = React.useState('encrypt');
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const handleFileSelect = (file) => {
      setSelectedFile(file);
      setResult(null);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    };

    const handleFileProcess = async () => {
      if (!selectedFile) return;

      setIsProcessing(true);
      
      try {
        const fileContent = await readFileAsText(selectedFile);
        let processedContent;
        
        if (operation === 'encrypt') {
          processedContent = encryptText(fileContent, algorithm, key);
        } else {
          processedContent = decryptText(fileContent, algorithm, key);
        }

        const blob = new Blob([processedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        setResult({
          content: processedContent,
          downloadUrl: url,
          filename: `${operation}_${selectedFile.name}`
        });

        addToHistory({
          type: operation,
          algorithm: algorithm.toUpperCase(),
          input: `Файл: ${selectedFile.name}`,
          output: `Обработан файл размером ${blob.size} байт`,
          timestamp: Date.now()
        });
      } catch (error) {
        setResult({ error: error.message });
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <div className="space-y-8 max-w-7xl mx-auto" data-name="file-encryption" data-file="components/FileEncryption.js">
        <div className="section-header">
          <h2 className="section-title">Шифрование файлов</h2>
          <p className="section-subtitle">
            Профессиональное шифрование файлов с поддержкой различных алгоритмов и форматов
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Настройки шифрования</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Операция</label>
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
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Алгоритм</label>
                <select 
                  value={algorithm} 
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="input-field"
                >
                  <option value="aes">AES-256</option>
                  <option value="chacha20">ChaCha20</option>
                  <option value="blowfish">Blowfish</option>
                  <option value="twofish">Twofish</option>
                </select>
              </div>

              {algorithm !== 'base64' && (
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Ключ шифрования</label>
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="input-field"
                    placeholder="Введите надежный ключ"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="card">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Загрузка файла</h3>
              
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  isDragOver 
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-5' 
                    : 'border-[var(--border-color)] hover:border-[var(--primary-color)]'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
              >
                <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="icon-upload text-3xl text-[var(--text-secondary)]"></div>
                </div>
                
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 p-4 bg-[var(--bg-tertiary)] rounded-xl">
                      <div className="icon-file-text text-xl text-[var(--primary-color)]"></div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">{selectedFile.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleFileProcess}
                      disabled={isProcessing}
                      className="btn-primary w-full"
                    >
                      {isProcessing ? 'Обработка...' : `${operation === 'encrypt' ? 'Зашифровать' : 'Расшифровать'} файл`}
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      Перетащите файл сюда или выберите
                    </p>
                    <p className="text-[var(--text-secondary)] mb-6">Поддерживаются текстовые файлы до 10 МБ</p>
                    <input
                      type="file"
                      onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                      className="hidden"
                      id="fileInput"
                      accept=".txt,.json,.xml,.csv"
                    />
                    <label htmlFor="fileInput" className="btn-primary cursor-pointer">
                      <div className="icon-folder-open text-lg mr-2"></div>
                      Выбрать файл
                    </label>
                  </div>
                )}
              </div>

              {result && (
                <div className="mt-8 p-6 bg-[var(--bg-tertiary)] rounded-2xl">
                  {result.error ? (
                    <div className="text-center text-red-600">
                      <div className="icon-alert-circle text-2xl mb-2"></div>
                      <p>Ошибка: {result.error}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="icon-check-circle text-2xl text-green-600 mb-4"></div>
                      <p className="font-semibold text-[var(--text-primary)] mb-4">Файл успешно обработан</p>
                      <a
                        href={result.downloadUrl}
                        download={result.filename}
                        className="btn-primary"
                      >
                        <div className="icon-download text-lg mr-2"></div>
                        Скачать результат
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('FileEncryption component error:', error);
    return null;
  }
}