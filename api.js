// const globalUrl = 'http://localhost:3000'
// const globalUrl = 'http://kuangal2-w10.corp.oocl.com:3000'
const globalUrl = 'http://d7javb.natappfree.cc'
const requestUrls = {
	getTopics: globalUrl + '/home/topics', //Get topic list
	createTopic: globalUrl + '/home/topics/user',
	getRewards: globalUrl + '/rewards',
	login: globalUrl + '/login',
	balance: globalUrl + '/user/balance',
	getMyJoins: globalUrl + '/home/topics/joiner', //Get myJoins list
	getMyCreates: globalUrl + '/home/topics/owner', //Get mycreate list
	record: globalUrl + '/user/records',
	picUpload: "http://efdgqr.natappfree.cc/multerUpload/upload",
	WeChatlogin: globalUrl + '/login/',
	picLoad: "http://639cgy.natappfree.cc/",
	getUserInfo: globalUrl + "/users"
}
export default requestUrls
