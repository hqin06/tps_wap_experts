import {_Color} from "components";

// 招标类型
const BID_TYPE = {
    "PUBLIC": { label: "公开招标", value: "PUBLIC", color: 'blue' },
    "INVITATION": { label: "邀请招标", value: "INVITATION", color: 'green' },
    "NEGOTIATION": { label: "竞争性谈判", value: "NEGOTIATION", color: 'cyan' },
    "CONSULT": { label: "竞争性磋商", value: "CONSULT", color: 'volcano' },
    "SINGLE": { label: "单一来源采购", value: "SINGLE", color: 'orange' },
    "ENQUIRE": { label: "询价采购", value: "ENQUIRE", color: 'geekblue' },
};

// 招标组织方式
const BID_MODALITY = {
    // "1": {label: "自行招标", value: "1"},
    // "2": {label: "委托招标", value: "2"},
    // "9": {label: "其他", value: "9"},
    "SELF": { label: "自行招标", value: "SELF", color: 'orange' },
    "AGENCY": { label: "委托招标", value: "AGENCY", color: 'blue' },
};

// 招标状态
const BID_STATUS = {
    INIT: {label:"准备中", value:"INIT", color:"orange"},
    REJECTED: {label:"已拒绝", value:"REJECTED", color:"red"},
    SUBMITTED: {label:"已提交", value:"SUBMITTED", color:"blue"},
    CONFIRMED: {label:"已审核", value:"CONFIRMED", color:"blue"},
    PUBLISHED: {label:"已发布", value:"PUBLISHED", color:"blue"},
    WAITING: {label:"等待开标", value:"WAITING", color:"blue"},
    OPENED: {label:"已开标", value:"OPENED", color:"green"},
    EVALUATED: {label:"已评标", value:"EVALUATED", color:"green"},
    FINISHED: {label:"已完成", value:"FINISHED", color:_Color.success},
    STOPPED: {label:"已中止", value:"STOPPED", color:"red"},
    PAUSED: {label:"已暂停", value:"PAUSED", color:"red"},
    FAILED: {label:"已流标", value:"FAILED", color:"red"},
    REMOVED: {label:"已删除", value:"REMOVED", color:"grey"},
};

const BID_ACTION = {
    EDIT: {
        label:"编辑", value:"EDIT", danger:false,
        allowStatus: [BID_STATUS.INIT.value,BID_STATUS.REJECTED.value,BID_STATUS.PAUSED.value]
    },
    REMOVE: {
        label: "删除", value: "REMOVE", nextStatus: BID_STATUS.REMOVED.value, danger: true,
        allowStatus: [BID_STATUS.INIT.value]
    },
    REJECT: {
        label: "拒绝", value: "REJECT", nextStatus: BID_STATUS.REJECTED.value, danger: true,
        allowStatus: [BID_STATUS.SUBMITTED.value]
    },
    SUBMIT: {
        label: "提交", value: "SUBMIT", nextStatus: BID_STATUS.SUBMITTED.value, danger: false,
        allowStatus: [BID_STATUS.INIT.value, BID_STATUS.REJECTED.value, BID_STATUS.PAUSED.value]
    },
    CONFIRM: {
        label: "审核", value: "CONFIRM", nextStatus: BID_STATUS.CONFIRMED.value, danger: false,
        allowStatus: [BID_STATUS.SUBMITTED.value]
    },
    PUBLISH: {
        label: "发布", value: "PUBLISH", nextStatus: BID_STATUS.PUBLISHED.value, danger: false,
        allowStatus: [BID_STATUS.CONFIRMED.value]
    },
    PAUSE: {
        label: "暂停", value: "PAUSE", nextStatus: BID_STATUS.PAUSED.value, danger: true,
        allowStatus: [BID_STATUS.PUBLISHED.value]
    },
    OPEN: {
        label: "开标", value: "OPEN", nextStatus: BID_STATUS.OPENED.value, danger: false,
        allowStatus: [BID_STATUS.PUBLISHED.value]
    },
    EVALUATE: {
        label: "评标完成", value: "EVALUATE", danger: false,
        nextStatus: BID_STATUS.EVALUATED.value,
        allowStatus: [BID_STATUS.OPENED.value]
    },
    FINISH: {
        label: "完成", value: "FINISH", danger: false,
        nextStatus: BID_STATUS.FINISHED.value,
        allowStatus: [BID_STATUS.OPENED.value]
    },
    GO_BACK: {
        label: "恢复", value: "GO_BACK", nextStatus: BID_STATUS.PUBLISHED.value, danger: false,
        allowStatus: []
        // allowStatus: [BID_STATUS.PAUSED.value]
    },
    STOP: {
        label: "中止", value: "STOP", nextStatus: BID_STATUS.STOPPED.value, danger: true,
        allowStatus: [BID_STATUS.PUBLISHED.value]
    },
    FAIL: {
        label: "流标", value: "FAIL", nextStatus: BID_STATUS.FAILED.value, danger: true,
        allowStatus: [BID_STATUS.OPENED.value,BID_STATUS.EVALUATED.value]
    },
};

const ANNOUNCEMENT_TYPE = {
    BIDDING: {value:"BIDDING", label:"公开采购公告", bidType: BID_TYPE.PUBLIC.value},
    QUALIFICATION: {value:"QUALIFICATION", label:"资格审查公告", bidType: BID_TYPE.INVITATION.value},
    INVITATION: {value:"INVITATION", label:"投标邀请公告", bidType: BID_TYPE.INVITATION.value},
    NEGOTIATION: {value:"NEGOTIATION", label:"竞争性谈判公告", bidType: BID_TYPE.NEGOTIATION.value},
    CONSULT: {value:"CONSULT", label:"竞争性磋商公告", bidType: BID_TYPE.CONSULT.value},
    SINGLE: {value:"SINGLE", label:"单一来源采购公告", bidType: BID_TYPE.SINGLE.value},
    ENQUIRE: {value:"ENQUIRE", label:"询价公告", bidType: BID_TYPE.ENQUIRE.value},
    CHANGE: {value:"CHANGE", label:"信息更正公告", bidType:""},
    SURVEY: {value:"SURVEY", label:"踏勘通知书", bidType:""},
    ANSWER: {value:"ANSWER", label:"答疑书", bidType:""},
    RESULT: {value:"RESULT", label:"中标结果公告", bidType:""},
    PAUSE: {value:"PAUSE", label:"暂停公告", bidType:""},
    RECOVERY: {value:"RECOVERY", label:"恢复采购公告", bidType:""},
    FAIL: {value:"FAIL", label:"流标公告", bidType:""},
}

const BID_CORP_QUALIFICATION_LEVEL = {
    "01": { "label": "特级", "value": "01", "color": 'gold' },
    "02": { "label": "一级", "value": "02", "color": 'green' },
    "03": { "label": "二级", "value": "03", "color": 'green' },
    "04": { "label": "三级", "value": "04", "color": 'green' },
    "05": { "label": "四级", "value": "05", "color": 'green' },
    "06": { "label": "甲级", "value": "06", "color": 'blue' },
    "07": { "label": "乙级", "value": "07", "color": 'blue' },
    "08": { "label": "丙级", "value": "08", "color": 'blue' },
    "09": { "label": "丁级", "value": "09", "color": 'blue' },
    "10": { "label": "暂定级（预乙级）", "value": "10", "color": 'blue' },
    "11": { "label": "初级", "value": "11", "color": 'purple' },
    "12": { "label": "中级", "value": "12", "color": 'purple' },
    "13": { "label": "高级", "value": "13", "color": 'purple' }
};

const INVITATION_STATUS = {
    "0": { label: "未回复", value: "0", color: "blue" },
    "1": { label: "接受", value: "1", color: "green" },
    "-1": { label: "拒绝", value: "-1", color: "red" },
}

const INVITATION_REPLY_STATUS = {
    "INIT": { label: "待回复", value: "INIT", color: "blue" },
    "ACCEPT": { label: "接受", value: "ACCEPT", color: "green" },
    "REJECT": { label: "拒绝", value: "REJECT", color: "red" },
}

// 保证金形式
const EARNEST_MONEY_FORM = {
    "CASH": { label: "现金", value: "CASH", color: "black" },
    "GUARANTEE": { label: "保函", value: "GUARANTEE", color: "black" },
}

// 评标方法
const EVALUATION_METHOD = {
    // "10": {label:"综合评标法", value:"10", color: "black"},
    // "20": {label:"低价中标法", value:"20", color: "black"},
    "LOWEST": {label:"最低评标价法", value:"LOWEST", color: "green"},
    "POINT": {label:"综合评分法", value:"POINT", color: "blue"},
    // "INTEGRATED": {label:"综合评分法", value:"INTEGRATED", color: "blue"},
}

// 资格审查办法
const QUALIFICATION_METHOD = {
    "BEFORE": { label: "资格预审查", value: "BEFORE", color: "orange" },
    "AFTER": { label: "资格后审查", value: "AFTER", color: "blue" },
}

// 资格审查办法
const QUALIFICATION_CONFIRM_STATUS = {
    "INIT": {label:"待审核", value:"INIT", color: "blue"},
    "REJECT": {label:"审查未通过", value:"REJECT", color: "red"},
    "APPROVE": {label:"审查通过", value:"APPROVE", color: "green"},
}

const BID_CASE_EXPERT_STATUS = {
    "INIT": { label: "待回复", value: "INIT", color: "blue" },
    "ACCEPT": { label: "接受", value: "ACCEPT", color: "green" },
    "REJECT": { label: "拒绝", value: "REJECT", color: "red" },
}

const BID_CASE_EXPERT_TYPE = {
    EXPERT: {label:"行业专家", value:"EXPERT"},
    DELEGATE: {label:"业主代表", value:"DELEGATE"},
}


const BID_SOURCE_TYPE = {
    CASE: "CASE",
    CASE_ANNOUNCEMENT: "CASE_ANNOUNCEMENT",
    CASE_EARNEST: "CASE_EARNEST",
    CASE_EXPERT: "CASE_EXPERT",
    CASE_INVITATION: "CASE_INVITATION",
    CASE_QUALIFICATION: "CASE_QUALIFICATION",
    CASE_QUESTION: "CASE_QUESTION",
    CASE_SURVEY: "CASE_SURVEY",
    CASE_TENDER: "CASE_TENDER",
    CASE_TENDER_PACKAGE: "CASE_TENDER_PACKAGE",
    CASE_RESULT: "CASE_RESULT",
    EXPERT: "EXPERT",
    EXPERT_MAJOR: "EXPERT_MAJOR",
    MAJOR: "MAJOR",
    PROJECT: "PROJECT",
}

// 资金来源
const FUND_SOURCE = {
    "SELF": { label: "自筹", value: "SELF", color: "black" },
    "FINANCE": { label: "财政", value: "FINANCE", color: "black" },
}

const CURRENCY_TYPE = {
    "CNY": { label: "人民币", value: "CNY" },
    "JPY": { label: "日元", value: "JPY" },
    "EUR": { label: "欧元", value: "EUR" },
    "GBP": { label: "英镑", value: "GBP" },
    "HKD": { label: "港币", value: "HKD" },
    "USD": { label: "美元", value: "USD" },
}

const QUESTION_TYPE = {
    "INIT": { label: "未提交", value: "INIT", color: 'red' },
    "SUBMITTED": { label: "已提交", value: "SUBMITTED", color: 'green' },
}

export default {
    BID_TYPE,
    BID_MODALITY,
    BID_ACTION,
    BID_STATUS,
    BID_CORP_QUALIFICATION_LEVEL,
    ANNOUNCEMENT_TYPE,
    INVITATION_REPLY_STATUS,
    INVITATION_STATUS,
    EARNEST_MONEY_FORM,
    EVALUATION_METHOD,
    BID_CASE_EXPERT_STATUS,
    BID_SOURCE_TYPE,
    FUND_SOURCE,
    QUALIFICATION_METHOD,
    QUALIFICATION_CONFIRM_STATUS,
    CURRENCY_TYPE,
    BID_CASE_EXPERT_TYPE,
    QUESTION_TYPE
}

