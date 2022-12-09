import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { List, InfiniteScroll, Tag, Button } from 'antd-mobile'
import _ from 'lodash';
import { history } from 'umi';
import './index.less';
import _BidConst from '../../components/const/_BidConst';
function index(props: any) {
  const [dataSource, setDataSource] = useState({})
  useEffect(() => {
    queryData();
  }, []);
  const queryData = async () => {
    let aa =
    {
      "project_code": "P202209281123",
      "project_name": "巫溪洋芋智能化生产示范项目",
      "major_code": "A01",
      "major_name": "规划",
      "id": "995207f1-5f9a-4ed4-a67d-66aebe20769c",
      "created_at": "2022-12-02T06:45:00.802226+00:00",
      "updated_at": "2022-12-02T06:45:00.802226+00:00",
      "dr": 0,
      "project_id": "805e2ad8-f337-4b48-a34d-6a9f130adb8d",
      "major_id": "b1332dfe-bc4f-4398-a1f2-faf2ff27d184",
      "case_code": "BID202212020105",
      "case_name": "招标项目名称12-2(5)",
      "case_desc": "详情请参考投标文件\n",
      "tenderee_id": "d8c85869-ed36-43df-968d-f9c657f2d0b3",
      "tenderee_code": "91500103068253370D",
      "tenderee_name": "宝庆（重庆）商贸有限公司",
      "agency_id": "d8c85869-ed36-43df-968d-f9c657f2d0b3",
      "agency_code": "91500103068253370D",
      "agency_name": "宝庆（重庆）商贸有限公司",
      "bid_type": "PUBLIC",
      "bid_modality": "AGENCY",
      "supervisor_code": null,
      "supervisor_name": null,
      "auditor_code": null,
      "auditor_name": null,
      "input_user_id": "eff98312-1739-478a-b7eb-ea51548b4ca4",
      "input_user_name": "蒋邦桃",
      "confirm_user_id": null,
      "confirm_user_name": null,
      "estimate_amount": 12344123,
      "estimate_currency": "CNY",
      "bidder_condition": null,
      "case_status": "HITTED",
      "expert_num": 1,
      "bid_qualification": "1、满足《中华人民共和国政府采购法》第二十二条规定。\n",
      "valid_days": null,
      "bid_end_time": "2022-12-12T02:00:00+00:00",
      "bid_apply_method": "在线递交",
      "earnest_amount": 10000,
      "earnest_currency": "CNY",
      "evaluation_method": "LOWEST",
      "open_time": "2022-11-12T02:00:00+00:00",
      "open_method": null,
      "qualification_method": "AFTER",
      "clarification_time": "2022-12-07T10:00:00+00:00"
    }
    setDataSource(aa as any)
  }


  return (
    <div>
      <Nav title='项目详情' />
      <div style={{ minHeight: `calc(100vh - 95px)`, marginTop: 45, marginBottom: 50 }}>
        <List >
          <List.Item arrow={false}>
            <div>{_.get(dataSource, 'case_name')}</div>
          </List.Item>
          <List.Item extra={_.get(dataSource, 'case_code')} arrow={false}>
            招标项目编码
          </List.Item>
          <List.Item extra={_.get(dataSource, 'case_status')} arrow={false}>
            招标状态
          </List.Item>
          <List.Item extra={_.get(dataSource, 'major.name')} arrow={false}>
            项目分类
          </List.Item>
          <List.Item extra={_.get(dataSource, 'bid_type')} arrow={false}>
            招标方式
          </List.Item>
          <List.Item extra={_.get(dataSource, 'bid_modality')} arrow={false}>
            招标组织形式
          </List.Item>
          <List.Item extra={_.get(dataSource, 'evaluation_method')} arrow={false}>
            评标方式
          </List.Item>
          <List.Item extra={_.get(dataSource, 'qualification_method')} arrow={false}>
            资格审查方式
          </List.Item>
          <List.Item extra={_.get(dataSource, 'bid_apply_method')} arrow={false}>
            投标文件递交方法
          </List.Item>
          <List.Item extra={_.get(dataSource, 'agency_name')} arrow={false}>
            招标代理机构
          </List.Item>
          <List.Item extra={_.get(dataSource, 'clarification_time')} arrow={false}>
            答疑澄清时间
          </List.Item>
          <List.Item extra={_.get(dataSource, 'bid_end_time')} arrow={false}>
            投标截止时间
          </List.Item>
          <List.Item extra={_.get(dataSource, 'open_time')} arrow={false}>
            开标时间
          </List.Item>
          <List.Item extra={_.get(dataSource, 'expert_num')} arrow={false}>
            专家数量
          </List.Item>
          <List.Item extra={_.get(dataSource, 'earnest_amount')} arrow={false}>
            保证金金额
          </List.Item>
          <List.Item extra={_.get(dataSource, 'estimate_amount')} arrow={false}>
            合同估算金额
          </List.Item>
          <List.Item extra={_.get(dataSource, 'case_desc')} arrow={false}>
            招标内容
          </List.Item>
          <List.Item extra={_.get(dataSource, 'input_user_name')} arrow={false}>
            录入人
          </List.Item>

        </List>
        <div className='detail_btn'>
          {/* <div className='detail_btn_box'> */}
            <div className='refused'>拒绝</div>
            <div className='accept'>接受邀请</div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}


export default index

