class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentView, setCurrentView] = React.useState('dashboard');
    const [user, setUser] = React.useState(() => {
      const savedUser = localStorage.getItem('userProfile');
      return savedUser ? JSON.parse(savedUser) : { name: 'Пользователь', email: 'user@example.com' };
    });
    const [theme, setTheme] = React.useState(() => {
      return localStorage.getItem('theme') || 'light';
    });

    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleUserUpdate = (userData) => {
      setUser(userData);
      localStorage.setItem('userProfile', JSON.stringify(userData));
    };

    return (
      <div className="min-h-screen bg-[var(--bg-secondary)]" data-name="app" data-file="app.js">
        <Header user={user} theme={theme} onToggleTheme={toggleTheme} />
        
        <div className="flex">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          
          <main className="flex-1 p-6">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'encryption' && <EncryptionPanel />}
            {currentView === 'file-encryption' && <FileEncryption />}
            {currentView === 'comparison' && <AlgorithmComparison />}
            {currentView === 'web-implementation' && <WebImplementation />}
            {currentView === 'crypto-info' && <CryptoInfo />}
            {currentView === 'history' && <HistoryPanel />}
            {currentView === 'profile' && <UserProfile user={user} onUserUpdate={handleUserUpdate} />}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);