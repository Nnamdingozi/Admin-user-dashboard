'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { AccessLog, UpdateAccessLog, LoginRequest } from '@/app/utilities/definitions';
import { getAccessLogs, getAccessLogById, createAccessLog, updateAccessLog, deleteAccessLog } from '@/app/api/accessLogApi'; // assuming your API functions are in this file
import { useUserContext } from './userContext';

interface AccessLogContextType {
  accessLogs: AccessLog[];
  accessLog: AccessLog | null;
  loading: boolean;
  error: string | null;
  getLogs: (token: string) => void;
  getLogById: (id: number) => void;
  createLog: (log: AccessLog) => void;
  updateLog: (id: number, log: UpdateAccessLog) => void;
  deleteLog: ( id: number) => void;
}

const AccessLogContext = createContext<AccessLogContextType | undefined>(undefined);

export const useAccessLog = (): AccessLogContextType => {
  const context = useContext(AccessLogContext);
  if (!context) {
    throw new Error('useAccessLog must be used within an AccessLogProvider');
  }
  return context;
};

interface AccessLogProviderProps {
  children: React.ReactNode;
}

export const AccessLogProvider: React.FC<AccessLogProviderProps> = ({ children }) => {
    const [accessLogs, setAccessLogs] = useState<AccessLog[]>(() => {
    const savedLogs = localStorage.getItem('accessLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
 
 
  const [accessLog, setAccessLog] = useState<AccessLog | null>(() => {
    const savedLog = localStorage.getItem('accessLog');
    return savedLog ? JSON.parse(savedLog) : null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {token} = useUserContext();

  const getLogs = async () => {
    if(accessLogs.length > 0) return;
   
    try {
      setLoading(true);
      setError(null)

      const fetchedlogs = await getAccessLogs(token!);
      setAccessLogs(fetchedlogs || []);
      localStorage.setItem('accessLogs', JSON.stringify(fetchedlogs))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch AccessLogs');
    } finally {
      setLoading(false);
    }
  };
 

  const getLogById = async (id: number) => {
    if (!id) throw new Error('Invalid user ID');

    setLoading(true);
    setError(null);

    try {
      const savedLog = localStorage.getItem(`accessLog_${id}`);
      if (savedLog) return JSON.parse(savedLog);

      const fetchedlog = await getAccessLogById(token!, id);
      if(!fetchedlog) throw new Error('Access Log for user not found');
      localStorage.setItem(`accessLog_${id}`, JSON.stringify(fetchedlog));
      return fetchedlog;
    }

      catch (err: any) {
        setError(err.message || 'Failed to fetch log for  user.');
        return null
     
    } finally {
      setLoading(false);
    }
  };

  const createLog = async (log: AccessLog): Promise<AccessLog | null>  => {
    setLoading(true);
    setError(null)
    try {
      const newLog = await createAccessLog(log);
    setAccessLog(newLog)
    return newLog
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
    return null
  };



  const updateLog = async (id: number, log: UpdateAccessLog) => {
    setLoading(true);
    setError(null)
    try {
      const updatedLog = await updateAccessLog(token!, id, log);
      setAccessLog(updatedLog); // Update specific log

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

 
  const deleteLog = async (id: number) => {
    setLoading(true);
    setError(null)
    try {
      await deleteAccessLog(token!, id);
      setAccessLogs((prevLogs) => prevLogs.filter((log) => log.id !== id)); // Remove log by id
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };



  return (
    <AccessLogContext.Provider
      value={{
        accessLogs,
        accessLog,
        loading,
        error,
        getLogs,
        getLogById,
        createLog,
        updateLog,
        deleteLog,
      }}
    >
      {children}
    </AccessLogContext.Provider>
  );
};
