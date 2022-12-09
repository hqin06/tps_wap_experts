import { Outlet, history } from 'umi';
import React, { useEffect } from 'react';
import './index.less';
export default () => {
  useEffect(() => {
    if(!localStorage.getItem('token')){
      history.push('/login')
    }
  }, [])
  return (
    <div className='box'>
      <Outlet />
    </div>
  );
}
