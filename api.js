// const globalUrl = 'http://localhost:3000'
// const globalUrl = 'http://kuangal2-w10.corp.oocl.com:3000'
// const globalUrl = 'http://d7javb.natappfree.cc'
const globalUrl = 'http://hanry-w10:3000'
const requestUrls = {
	getTopics: globalUrl + '/home/topics', //Get topic list
	createTopic: globalUrl + '/home/topics/user',
	getRewards: globalUrl + '/commodity',
	login: globalUrl + '/login',
	getMyJoins: globalUrl + '/home/topics/joiner', //Get myJoins list
	getMyCreates: globalUrl + '/home/topics/owner', //Get mycreate list
	registration: globalUrl + '/home/topics/registration',
	record: globalUrl + '/user/records',
	picUpload: "http://efdgqr.natappfree.cc/multerUpload/upload",
	WeChatlogin: globalUrl + '/login/',
	picLoad: "http://639cgy.natappfree.cc/",
	getUserInfo: globalUrl + "/users",
	getRecord: globalUrl + "/bills",
	getExchangeHistory:globalUrl + "/users/exchangeHistory"
}
export default requestUrls
