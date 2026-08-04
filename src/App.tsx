import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { supabase } from './utils/supabase';

export default function App() {
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkSupabaseConnection() {
      try {
        const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
        setSupabaseConnected(!error);
      } catch (err) {
        setSupabaseConnected(false);
      }
    }
    checkSupabaseConnection();
  }, []);

  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
