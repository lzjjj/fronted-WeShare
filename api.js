const globalUrl = 'http://kuangal2-w10.corp.oocl.com:3000'
const globalPhotoUrl = 'http://xuvi7-w10:9090/'
const requestUrls = {
	getTopics: globalUrl + '/home/topics', //Get topic list
	getRewards: globalUrl + '/rewards',
	login: globalUrl + '/login',
	balance: globalUrl + '/user/balance',
	getMyJoins: globalUrl + '/home/topics/joiner/1', //Get myJoins list
	getMyCreates: globalUrl + '/home/topics/owner/1', //Get mycreate list
	record: globalUrl + '/user/records',
	picUpload: "http://xuvi7-w10:3000/multerUpload/upload",
	WeChatlogin: globalUrl + '/login/',
	picLoad: "http://xuvi7-w10:9090"
}
export default requestUrls
