import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Group from '../views/Group.vue'
import CreateTrade from '@/views/CreateTrade.vue'
import EditTradeView from '@/views/EditTradeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ConfirmView from '@/views/ConfirmView.vue'
import GroupsView from '@/views/GroupsView.vue'
import SubscriberView from '@/views/SubscriberView.vue'
import AdminGroupView from '@/views/AdminGroupView.vue'
import CreateGroup from '@/views/CreateGroupView.vue'
import MyGroupsView from '@/views/MyGroupsView.vue'
import UserInfos from '@/views/UserInfos.vue'
import Unauthorized from '@/views/UnauthorizedView.vue'
import PublicHomeView from '@/views/PublicHomeView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:userId',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'publicHome',
      component: PublicHomeView
    },
    {
      path: '/:userId/groups',
      name: 'groups',
      component: GroupsView
    },
    {
      path: '/:userId/my-informations',
      name: 'userInfos',
      component: UserInfos
    },
    {
      path: '/:userId/my-groups',
      name: 'myGroups',
      component: MyGroupsView
    },
    {
      path: '/:userId/:groupId',
      name: 'group',
      component: Group
    },
    {
      path: '/:userId/create-group',
      name: 'createGroup',
      component: CreateGroup
    },
    {
      path: '/:userId/:groupId/subscriber',
      name: 'subscriber',
      component: SubscriberView
    },
    {
      path: '/:userId/:groupId/admin',
      name: 'admin',
      component: AdminGroupView
    },
    {
      path: '/:userId/:groupId/create-trade',
      name: 'createTrade',
      component: CreateTrade
    },
    {
      path: '/:userId/:groupId/:tradeId/edit',
      name: 'edit',
      component: EditTradeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfirmView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },
    {
      path: '/policy',
      name: 'policy',
      component: PrivacyPolicyView
    }
  ]
})

export default router
