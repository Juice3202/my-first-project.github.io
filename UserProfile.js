function UserProfile({ user, onUserUpdate }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: user.name,
      email: user.email,
      department: 'Информационная безопасность',
      studentId: 'IB-2024-001'
    });

    const handleSave = () => {
      onUserUpdate(formData);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setFormData({
        name: user.name,
        email: user.email,
        department: formData.department,
        studentId: formData.studentId
      });
      setIsEditing(false);
    };

    return (
      <div className="space-y-8 max-w-7xl mx-auto" data-name="user-profile" data-file="components/UserProfile.js">
        <div className="section-header">
          <h2 className="section-title">Личный кабинет</h2>
          <p className="section-subtitle">
            Управление профилем пользователя и настройками системы безопасности
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] rounded-2xl flex items-center justify-center">
                    <div className="icon-user text-2xl text-white"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Профиль пользователя</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Основная информация о пользователе</p>
                  </div>
                </div>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn-primary">
                    <div className="icon-edit text-lg mr-2"></div>
                    Редактировать
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button onClick={handleSave} className="btn-primary">
                      <div className="icon-check text-lg mr-2"></div>
                      Сохранить
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                      <div className="icon-x text-lg mr-2"></div>
                      Отмена
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Полное имя</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-field"
                        placeholder="Введите ваше имя"
                      />
                    ) : (
                      <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl">
                        <p className="font-medium text-[var(--text-primary)]">{formData.name}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Email адрес</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                        placeholder="Введите email"
                      />
                    ) : (
                      <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl">
                        <p className="font-medium text-[var(--text-primary)]">{formData.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Факультет</label>
                    <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl">
                      <p className="font-medium text-[var(--text-primary)]">{formData.department}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">Номер студента</label>
                    <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl">
                      <p className="font-medium text-[var(--text-primary)]">{formData.studentId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-compact">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Статистика активности</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-xl">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Операций шифрования</span>
                  <span className="text-lg font-bold text-[var(--primary-color)]">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-xl">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Последний вход</span>
                  <span className="text-sm text-[var(--text-secondary)]">Сегодня</span>
                </div>
              </div>
            </div>

            <div className="card-compact">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Настройки безопасности</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Двухфакторная аутентификация</span>
                  <div className="w-10 h-6 bg-[var(--accent-color)] rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--text-primary)]">Уведомления о входе</span>
                  <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserProfile component error:', error);
    return null;
  }
}