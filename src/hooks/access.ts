import { useLocation, useNavigate } from '@umijs/max';
import { useEffect, useMemo } from 'react';
export const useAccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const doNotAccess = useMemo(() => {
    return ['/login', '/home', '/', '/chat', '/onlineToolbox', '/feedback'];
  }, []);

  useEffect(() => {
    if (doNotAccess.includes(pathname)) return;

    const token = localStorage.getItem('token');

    if (!token && pathname !== '/home') {
      navigate('/login');
    }
  }, [doNotAccess, navigate, pathname]);
};
