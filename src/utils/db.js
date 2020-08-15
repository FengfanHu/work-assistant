const Datastore = window.require('lowdb');
const LodashId = window.require('lodash-id');
const FileSync = window.require('lowdb/adapters/FileSync');
const path = window.require('path');
const fs = window.require('fs-extra');
const { remote } = window.require('electron');

const APP = remote.app;
const STORE_PATH = APP.getPath('userData');

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
  }
}

const adapter = new FileSync(path.join(STORE_PATH, '/data.json'));

const db = Datastore(adapter);
db._.mixin(LodashId);

if (!db.has('tags').value()) {
  db.set('tags', [
    {
      action: 'mdi-ticket',
      title: 'Attractions',
      items: [
        { title: 'List Item' },
      ],
    },
    {
      action: 'mdi-food',
      title: 'Dining',
      active: true,
      items: [
        { title: 'Breakfast & brunch' },
        { title: 'New American' },
        { title: 'Sushi' },
      ],
    },
    {
      action: 'mdi-school',
      title: 'Education',
      items: [
        { title: 'List Item' },
      ],
    },
    {
      action: 'mdi-run',
      title: 'Family',
      items: [
        { title: 'List Item' },
      ],
    },
    {
      action: 'mdi-stethoscope',
      title: 'Health',
      items: [
        { title: 'List Item' },
      ],
    },
    {
      action: 'mdi-briefcase',
      title: 'Office',
      items: [
        { title: 'List Item' },
      ],
    },
    {
      action: 'mdi-tag',
      title: 'Promotions',
      items: [
        { title: 'List Item' },
      ],
    },
  ]).write();
}

// 初始化
// db.defaults({ tags: [] }).write();

export default db;
