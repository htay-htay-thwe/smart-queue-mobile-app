import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Queue, MOCK_ACTIVE_QUEUES, MOCK_HISTORY_QUEUES } from '../constants/mockData';

interface QueueContextType {
  activeQueues: Queue[];
  historyQueues: Queue[];
  addQueue: (queue: Queue) => void;
  removeQueue: (id: string) => void;
  moveToHistory: (id: string) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [activeQueues, setActiveQueues] = useState<Queue[]>(MOCK_ACTIVE_QUEUES);
  const [historyQueues, setHistoryQueues] = useState<Queue[]>(MOCK_HISTORY_QUEUES);

  const addQueue = (queue: Queue) => {
    setActiveQueues((prev) => [queue, ...prev]);
  };

  const removeQueue = (id: string) => {
    setActiveQueues((prev) => prev.filter((q) => q.id !== id));
  };

  const moveToHistory = (id: string) => {
    const queue = activeQueues.find((q) => q.id === id);
    if (queue) {
      setHistoryQueues((prev) => [{ ...queue, status: 'expired' as const }, ...prev]);
      removeQueue(id);
    }
  };

  return (
    <QueueContext.Provider
      value={{
        activeQueues,
        historyQueues,
        addQueue,
        removeQueue,
        moveToHistory,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
