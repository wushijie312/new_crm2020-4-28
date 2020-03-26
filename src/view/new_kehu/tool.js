var tools = {}
tools.occupy = function (val) {
	if(!val) return "-";
	return val;
} // 还可以在这个文件里面添加多个函数
tools.install = function (Vue, options) {
  Vue.prototype.$tools = tools
  Vue.tools = tools
}
export default tools