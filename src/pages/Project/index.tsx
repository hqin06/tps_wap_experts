import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { List, InfiniteScroll, Tag, Toast } from 'antd-mobile'
import _ from 'lodash';
import { history } from 'umi';
import './index.less';
import _RestTools from '../../components/tools/_RestTools';
import useSession from '../../components/tools/useSession';

function index(props: any) {
  const [dataSource, setDataSource] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const session = useSession()

  useEffect(() => {
    queryData();
  }, []);
  const queryData = async () => {
    setLoading(true);
    _RestTools.promiseQuery({
      url: '/bid/tenderee/case',
      queryParams: {
        paging: true,
        select: "*",
        page: 1,
        size: 10,
        order: "created_at.desc,case_code.desc",
        input_user_id: session.getUserId()
      }
    }).then((resp) => {
      let results = _.get(resp, 'body.content');
      console.log(_.get(resp, 'body.totalElement'), 'eded');
      setDataSource(results as any)
      setHasMore(false)
    }).catch((e) => {
      Toast.show({ content: e })
      setHasMore(false)
    }).finally(() => {
      setLoading(false)
    })
  }
  const queryDataw = async () => {
    const ret = [];
    for (let i = 0; i < 18; i++) {
      ret.push({ "project_name": `巫溪洋芋智能化生产示范项目${i}`, })
    }
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
    ret.unshift(aa)

  }
  const handleClick = (item: any) => {
    history.push(`/page/projectDetail?id=${_.get(item, 'id')}`)
  }

  return (
    <div>
      <Nav title='项目列表' />
      <div style={{ minHeight: `calc(100vh - 45px)`, marginTop: 45, paddingTop: 10 }}>

        {dataSource.map((item, index) => (
          <List mode='card' style={{ margin: '10px 16px' }} key={index}>
            <List.Item onClick={() => { handleClick(item) }} arrow={false}>
              <div>
                <div className='item_header'>{`(${_.get(item, 'case_code')})${_.get(item, 'case_name')}`}</div>
                <div className='item_body'>
                  <div className='item_body_content'><span>项目估算金额：</span><span>{_.get(item, 'estimate_amount')}</span></div>
                  <div className='item_body_content'><span>项目分类：</span><span>{_.get(item, 'major_name')}</span></div>
                  <div className='item_body_content'><span>所属项目：</span><span>{_.get(item, 'project_name')}</span></div>
                  <div className='item_body_content'><span>招标代理机构：</span><span>{_.get(item, 'agency_name')}</span></div>
                </div>
                <div className='item_footer'>
                  <Tag className='ml-6' color='#2db7f5'>竞争性谈判</Tag>
                  <Tag className='ml-6' color='#87d068'>委托招标</Tag>
                  <Tag className='ml-6' color='#108ee9'>最低评标价法</Tag>
                </div>
              </div>
            </List.Item>
          </List>
        ))}
        <InfiniteScroll loadMore={queryData} hasMore={hasMore} />
      </div>

    </div>
  )
}


export default index

