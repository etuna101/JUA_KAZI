import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Notification type definition
type Notification = {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
};

// Context type
type NotificationContextType = {
  notify: (message: string, severity?: Notification['severity']) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<Notification>({ message: '', severity: 'info' });

  const notify = (message: string, severity: Notification['severity'] = 'info') => {
    setNotification({ message, severity });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}; 