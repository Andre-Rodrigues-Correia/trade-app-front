import Vuex from 'vuex'
import user from './modules/user'
import trades from './modules/trades'
import groups from './modules/groups'
import subscriptions from './modules/subscriptions'
import auth from './modules/auth'


export default new Vuex.Store({
    modules: {
      user,
      trades,
      groups,
      subscriptions,
      auth
    }
  })