const globalUrl = 'http://tangtr2-w10.corp.oocl.com:3000'
const requestUrls = {
  getTopics: globalUrl + '/home/topics', //Get topic list
  getRewards: globalUrl + '/rewards',
  login: globalUrl + '/login',
  balance: globalUrl + '/user/balance',
  getMyJoins: globalUrl + '/home/topics/joiner/1', //Get myJoins list
  getMyCreates: globalUrl + '/home/topics/owner/1', //Get mycreate list
  record: globalUrl + '/user/records'
}
export default requestUrls