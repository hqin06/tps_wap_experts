import React, { ReactNode } from 'react';
import { NavBar, Space, Toast } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'
import './index.less';
import { history } from 'umi';
interface IProps {
  title: string,
  right?: ReactNode;
}
function index(props: IProps) {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () => {
    history.back();
  }

  return (
    <div className='nav_box'>
      <NavBar right={right} onBack={back}>{props.title}</NavBar>
    </div>
  )
}


export default index

