import { useAccess } from '@/hooks';
import { Outlet } from 'umi';
const Layout = () => {
  useAccess();

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
