import React, { useState } from 'react'
import './index.less';
import {
  Form,
  Input,
  Button,
  Toast
} from 'antd-mobile'
import { history } from 'umi';
import _Cookie from '../../components/tools/_Cookie';
import _RestTools from '../../components/tools/_RestTools';
import useSession from '../../components/tools/useSession';
import _Key from '../../components/const/_Key';
import _ from 'lodash';

let sendHandle: NodeJS.Timer;

function index(props: any) {
  const [form] = Form.useForm();
  const [isSendCode, setisSendCode] = useState(false)
  const [timer, setTimer] = React.useState(0);
  const session = useSession()


  const onFinish = (values: any) => {
    if (values) {
      session.loginByPassword(values).then(() => {
        history.push('/page/project')
      }).catch((e) => {
        Toast.show({ content: e })
      }).finally(() => {
      })
    }
  }
  React.useEffect(() => {
    return () => {
      if (sendHandle) clearInterval(sendHandle)
    }
  }, []);

  const sendCode = async () => {
    let reg = /^1\d{10}$/;
    const mobile = form.getFieldValue('mobile');
    if (mobile && reg.test(mobile)) {
      setisSendCode(true);
      let waitTimer = 60;
      setTimer(waitTimer);

      sendHandle = setInterval(() => {
        waitTimer = waitTimer - 1;
        setTimer(waitTimer);
        if (waitTimer <= 0) {
          clearInterval(sendHandle);
          setisSendCode(false)
        }
      }, 1000);
      try {
        await _RestTools.promiseQuery({
          url: `/auth/requestSmsCode`,
          queryParams: { mobile: mobile }
        });
      } catch (e) {
        setTimer(0);
        setisSendCode(false)
        if (sendHandle) clearInterval(sendHandle);
        Toast.show({ content: e })
      }
    }
  }
  const phoneIcon = <img src={require('../../assets/phone.png')} style={{ width: 24 }} />
  const passwordIcon = <img src={require('../../assets/mima.png')} style={{ width: 24 }} />
  const extraCode = isSendCode ? <a className={'sendCodeDisabled'} >{timer}秒后可重发</a> : <a className={'sendCode'} onClick={sendCode}>发送验证码</a>
  return (
    <div className='login_box'>
      <div className='login_head'>
        <div className='logo_title'>
          <div style={{ fontSize: 22, fontWeight: 700 }}>千克电子招标采购平台</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>重庆能源集团旗下网站</div>
        </div>
        <div className='logo_box'><img src={require('../../assets/zc_logo.png')} /></div>
      </div>
      <div className='myLoginForm'>
        <Form
          form={form}
          onFinish={onFinish}
          layout='horizontal'
          requiredMarkStyle={'none'}
          footer={<Button block type='submit' className='btn'>登录</Button>}
        >
          <Form.Item
            name='username'
            label={phoneIcon}
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            name='password'
            label={passwordIcon}
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
          {/* <Form.Item
            name='mobile'
            label={phoneIcon}
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
            ]}
          >
            <Input placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name='sms_code'
            label={passwordIcon}
            extra={extraCode}
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input placeholder='请输入验证码' />
          </Form.Item> */}
        </Form>
      </div>
    </div>
  )
}



export default index

