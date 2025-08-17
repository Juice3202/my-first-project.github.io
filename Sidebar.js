function Sidebar({ currentView, onViewChange }) {
  try {
    const menuItems = [
      { id: 'dashboard', icon: 'layout-dashboard', label: 'Панель управления', description: 'Обзор системы' },
      { id: 'encryption', icon: 'lock', label: 'Текстовое шифрование', description: 'Шифрование текста' },
      { id: 'file-encryption', icon: 'file-lock', label: 'Шифрование файлов', description: 'Защита файлов' },
      { id: 'comparison', icon: 'bar-chart-3', label: 'Сравнение алгоритмов', description: 'Анализ методов' },
      { id: 'web-implementation', icon: 'code', label: 'Веб-реализация', description: 'Примеры кода' },
      { id: 'crypto-info', icon: 'book-open', label: 'База знаний', description: 'Теория криптографии' },
      { id: 'history', icon: 'history', label: 'История операций', description: 'Журнал активности' },
      { id: 'profile', icon: 'user-circle', label: 'Личный кабинет', description: 'Настройки профиля' }
    ];

    return (
      <aside className="w-80 bg-[var(--bg-primary)] border-r border-[var(--border-color)] min-h-screen shadow-lg" data-name="sidebar" data-file="components/Sidebar.js">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Навигация</h2>
            <p className="text-sm text-[var(--text-secondary)]">Выберите раздел для работы</p>
          </div>
          
          <nav>
            <ul className="space-y-3">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`w-full nav-item ${
                      currentView === item.id ? 'nav-item-active' : 'nav-item-inactive'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      currentView === item.id 
                        ? 'bg-white bg-opacity-20' 
                        : 'bg-[var(--bg-tertiary)]'
                    }`}>
                      <div className={`icon-${item.icon} text-xl`}></div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{item.label}</div>
                      <div className={`text-xs ${
                        currentView === item.id 
                          ? 'text-white text-opacity-80' 
                          : 'text-[var(--text-muted)]'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 p-6 bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] rounded-2xl text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <div className="icon-info text-lg"></div>
              </div>
              <h3 className="font-semibold">Справка</h3>
            </div>
            <p className="text-sm text-white text-opacity-90 mb-4">
              Система поддерживает современные алгоритмы шифрования для обеспечения безопасности данных.
            </p>
            <button className="text-sm font-medium text-white underline hover:no-underline">
              Подробнее →
            </button>
          </div>
        </div>
      </aside>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}
