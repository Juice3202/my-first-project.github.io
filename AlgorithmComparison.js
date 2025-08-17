function AlgorithmComparison() {
  try {
    const [selectedAlgorithms, setSelectedAlgorithms] = React.useState(['aes', 'rsa']);
    const [comparisonType, setComparisonType] = React.useState('security');

    const algorithms = {
      aes: { name: 'AES-256', security: 95, speed: 90, keySize: 256, type: 'Симметричное', year: 2001 },
      chacha20: { name: 'ChaCha20', security: 92, speed: 95, keySize: 256, type: 'Потоковое', year: 2008 },
      rsa: { name: 'RSA-2048', security: 85, speed: 20, keySize: 2048, type: 'Асимметричное', year: 1977 },
      ecc: { name: 'ECC-256', security: 90, speed: 60, keySize: 256, type: 'Эллиптические кривые', year: 1985 },
      blowfish: { name: 'Blowfish', security: 70, speed: 85, keySize: 448, type: 'Блочное', year: 1993 },
      sha256: { name: 'SHA-256', security: 95, speed: 80, keySize: 0, type: 'Хеш-функция', year: 2001 },
      ntru: { name: 'NTRU', security: 88, speed: 75, keySize: 1024, type: 'Постквантовое', year: 1996 },
      kyber: { name: 'Kyber-768', security: 92, speed: 70, keySize: 768, type: 'Постквантовое', year: 2017 }
    };

    const toggleAlgorithm = (algoId) => {
      setSelectedAlgorithms(prev => 
        prev.includes(algoId) 
          ? prev.filter(id => id !== algoId)
          : [...prev, algoId]
      );
    };

    const getColorByValue = (value) => {
      if (value >= 90) return 'text-green-600 bg-green-100';
      if (value >= 70) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    return (
      <div className="space-y-8 max-w-7xl mx-auto" data-name="algorithm-comparison" data-file="components/AlgorithmComparison.js">
        <div className="section-header">
          <h2 className="section-title">Сравнение алгоритмов шифрования</h2>
          <p className="section-subtitle">
            Детальный анализ характеристик современных криптографических алгоритмов
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Выбор алгоритмов для сравнения</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(algorithms).map(([id, algo]) => (
              <button
                key={id}
                onClick={() => toggleAlgorithm(id)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedAlgorithms.includes(id)
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)] bg-opacity-10'
                    : 'border-[var(--border-color)] hover:border-[var(--primary-color)]'
                }`}
              >
                <h4 className="font-semibold text-[var(--text-primary)]">{algo.name}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{algo.type}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="card-compact">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Тип сравнения</h3>
            <div className="space-y-2">
              {[
                { id: 'security', label: 'Безопасность', icon: 'shield' },
                { id: 'speed', label: 'Скорость', icon: 'zap' },
                { id: 'keySize', label: 'Размер ключа', icon: 'key' },
                { id: 'year', label: 'Год создания', icon: 'calendar' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setComparisonType(type.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    comparisonType === type.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <div className={`icon-${type.icon} text-lg`}></div>
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2">
            <div className="card">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                Сравнение по: {comparisonType === 'security' ? 'Безопасности' : 
                              comparisonType === 'speed' ? 'Скорости' :
                              comparisonType === 'keySize' ? 'Размеру ключа' : 'Году создания'}
              </h3>
              
              <div className="space-y-4">
                {selectedAlgorithms.map(algoId => {
                  const algo = algorithms[algoId];
                  const value = algo[comparisonType];
                  const maxValue = Math.max(...selectedAlgorithms.map(id => algorithms[id][comparisonType]));
                  const percentage = comparisonType === 'year' ? 100 : (value / maxValue) * 100;
                  
                  return (
                    <div key={algoId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--text-primary)]">{algo.name}</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          comparisonType === 'year' ? 'bg-blue-100 text-blue-700' : getColorByValue(value)
                        }`}>
                          {value}{comparisonType === 'keySize' ? ' бит' : comparisonType === 'year' ? '' : '%'}
                        </span>
                      </div>
                      <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Детальная таблица сравнения</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Алгоритм</th>
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Тип</th>
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Безопасность</th>
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Скорость</th>
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Размер ключа</th>
                  <th className="text-left p-4 font-semibold text-[var(--text-primary)]">Год</th>
                </tr>
              </thead>
              <tbody>
                {selectedAlgorithms.map(algoId => {
                  const algo = algorithms[algoId];
                  return (
                    <tr key={algoId} className="border-b border-[var(--border-light)]">
                      <td className="p-4 font-medium text-[var(--text-primary)]">{algo.name}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{algo.type}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getColorByValue(algo.security)}`}>
                          {algo.security}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getColorByValue(algo.speed)}`}>
                          {algo.speed}%
                        </span>
                      </td>
                      <td className="p-4 text-[var(--text-secondary)]">{algo.keySize || 'N/A'} бит</td>
                      <td className="p-4 text-[var(--text-secondary)]">{algo.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AlgorithmComparison component error:', error);
    return null;
  }
}