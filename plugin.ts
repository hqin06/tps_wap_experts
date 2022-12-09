import { IApi } from 'umi';

export default (api: IApi) => {
	// 设置logo
	api.addHTMLLinks(() => [{ rel: 'icon', type: "image/png", href: "./images/favicon.ico" }]);
	// 加载全局设置
	api.addHTMLScripts(() => [`./options.js`]);
};
