import AddTag from '@/views/tags/Add.vue'
import ManageTag from '@/views/tags/Manage.vue'
import LayoutTag from '@/views/tags/index.vue'

export default {
  path: '/tag',
  component: LayoutTag,
  children: [
    { path: 'add', name: 'AddTag', component: AddTag },
    { path: 'manage', name: 'ManageTag', component: ManageTag }
  ]
}
