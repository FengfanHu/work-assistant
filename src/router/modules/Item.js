import AddItem from '@/views/items/Add.vue'
import ShowItem from '@/views/items/Show.vue'
import EditItem from '@/views/items/Edit.vue'
import LayoutItem from '@/views/items/index.vue'

export default {
  path: '/item',
  component: LayoutItem,
  children: [
    { path: 'add', name: 'AddItem', component: AddItem },
    { path: 'show/:id', name: 'ShowItem', component: ShowItem },
    { path: 'edit/:id', name: 'EditItem', component: EditItem }
  ]
}
