import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export interface NotificationContextProps {
  notificationMessage: string;
  setNotificationMessage: (message: string) => void;
  clearNotification: () => void;
}

export const NotificationContext =
  createContext<NotificationContextProps | null>(null);

export const NotificationProvider = () => {
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const clearNotification = () => {
    setNotificationMessage("");
  };

  const contextValue = {
    notificationMessage,
    setNotificationMessage,
    clearNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      <Outlet />
    </NotificationContext.Provider>
  );
};
