import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import card from './pages/component/card.vue'
import topic from './pages/component/topic.vue'
import myJoin from './pages/component/my_join.vue'
import myCreate from './pages/component/my_create.vue'
import createCommodity from './pages/component/create_commodity.vue'
import detail from './pages/component/detail.vue'
import rewardList from './pages/component/reward_list.vue'
import rewardDialog from './pages/component/reward_dialog_modal.vue'
import boboMessage from './components/bobo-message/bobo-message.vue'

Vue.component('cu-custom',cuCustom)
Vue.component('card',card)
Vue.component('topic',topic)
Vue.component('myJoin',myJoin)
Vue.component('myCreate',myCreate)
Vue.component('detail',detail)
Vue.component('rewardList',rewardList)
Vue.component('rewardDialog', rewardDialog)
Vue.component('message', boboMessage)
Vue.component('createCommodity', createCommodity)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.hostUrl = "localhost:8080"

const app = new Vue({
    ...App
})
app.$mount()
