// const globalUrl = 'http://localhost:3000'
// const globalUrl = 'http://kuangal2-w10.corp.oocl.com:3000'
const globalUrl = 'http://gvw8ae.natappfree.cc'
// const globalUrl = 'http://hanry-w10:3000'
const requestUrls = {
	getTopics: globalUrl + '/home/topics', //Get topic list
	createTopic: globalUrl + '/home/topics/user',
	getRewards: globalUrl + '/commodity',
	deleteRewards: globalUrl + '/commodity',
	login: globalUrl + '/login',
	getMyJoins: globalUrl + '/home/topics/joiner', //Get myJoins list
	getMyCreates: globalUrl + '/home/topics/owner', //Get mycreate list
	registration: globalUrl + '/home/topics/registration',
	topics: globalUrl + '/home/topics',
	record: globalUrl + '/user/records',
	picUpload: "http://7s79mz.natappfree.cc/multerUpload/upload",
	WeChatlogin: globalUrl + '/login',
	picLoad: "http://6ewam3.natappfree.cc/",
	getUserInfo: globalUrl + "/users",
	getRecord: globalUrl + "/bills",
	getExchangeHistory:globalUrl + "/users/exchangeHistory",
	completeTopic:globalUrl + "/home/topics/support/",
}
export default requestUrls
