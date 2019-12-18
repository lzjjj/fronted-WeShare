const globalUrl = 'http://kuangal2-w10.corp.oocl.com:3000'
// const globalUrl = 'http://8e7048dd-041c-47f7-b1a3-76b71e381cd4.mock.pstmn.io'
const requestUrls = {
	getTopics: globalUrl + '/home/topics', //Get topic list
	createTopic: globalUrl + '/home/topics/user',
	getRewards: globalUrl + '/rewards',
	login: globalUrl + '/login',
	balance: globalUrl + '/user/balance',
	getMyJoins: globalUrl + '/home/topics/joiner/1', //Get myJoins list
	getMyCreates: globalUrl + '/home/topics/owner/1', //Get mycreate list
	record: globalUrl + '/user/records',
	picUpload: "http://xuvi7-w10:3000/multerUpload/upload",
	WeChatlogin: globalUrl + '/login/',
	picLoad: "http://xuvi7-w10:9090/"
}
export default requestUrls
