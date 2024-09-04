import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};

export default Root;
