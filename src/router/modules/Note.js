import NoteLayout from '@/views/notes/index.vue'
import Add from '@/views/notes/Add.vue'
import AddCategory from '@/views/notes/AddCategory'
import ShowNote from '@/views/notes/Show'
import Edit from '@/views/notes/Edit'
import Manage from '@/views/notes/Manage'

export default {
  path: '/note',
  name: 'NoteIndex',
  component: NoteLayout,
  children: [
    {
      path: 'add',
      name: 'AddNote',
      component: Add
    },
    {
      path: 'addCategory',
      name: 'AddCategory',
      component: AddCategory
    },
    {
      path: 'show/:id',
      name: 'ShowNote',
      component: ShowNote
    },
    {
      path: 'edit/:cid/:nid',
      name: 'EditNote',
      component: Edit
    },
    {
      path: 'manage',
      name: 'ManageCategory',
      component: Manage
    }
  ]
}
