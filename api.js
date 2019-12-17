const globalUrl = 'http://tangtr2-w10.corp.oocl.com:3000'
const requestUrls = {
  getTopics: globalUrl + '/home/topics', //Get topic list
  getRewards: globalUrl + '/rewards',
  login: globalUrl + '/login',
  balance: globalUrl + '/user/balance',
  record: globalUrl + '/user/records'
}
export default requestUrls