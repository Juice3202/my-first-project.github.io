function Header({ user, theme, onToggleTheme }) {
  try {
    return (
      <header className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-8 py-6 shadow-md" data-name="header" data-file="components/Header.js">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] rounded-2xl flex items-center justify-center shadow-lg">
                <div className="icon-shield text-2xl text-white"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-color)] rounded-full border-2 border-[var(--bg-primary)]"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">CryptoSecure</h1>
              <p className="text-sm text-[var(--text-secondary)] font-medium">Профессиональная система шифрования</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[var(--bg-tertiary)] rounded-xl">
              <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Система активна</span>
            </div>
            
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            
            <div className="flex items-center space-x-4 pl-4 border-l border-[var(--border-color)]">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-light)] rounded-2xl flex items-center justify-center shadow-lg">
                <div className="icon-user text-xl text-white"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{user.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
