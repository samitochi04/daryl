import { createContext, useContext, useState, useCallback } from 'react'
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }, [])

  const success = useCallback((message) => addNotification(message, 'success'), [addNotification])
  const error = useCallback((message) => addNotification(message, 'error'), [addNotification])
  const info = useCallback((message) => addNotification(message, 'info'), [addNotification])
  const warning = useCallback((message) => addNotification(message, 'warning'), [addNotification])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ success, error, info, warning }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  )
}

const Notification = ({ id, message, type, onClose }) => {
  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }

  const icons = {
    success: FiCheckCircle,
    error: FiXCircle,
    info: FiInfo,
    warning: FiAlertTriangle
  }

  const Icon = icons[type]

  return (
    <div className={`${styles[type]} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-up`}>
      <Icon className="text-2xl flex-shrink-0" />
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="text-xl hover:opacity-75">×</button>
    </div>
  )
}
