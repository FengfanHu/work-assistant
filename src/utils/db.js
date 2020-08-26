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
      title: '您可以新增和修改分类',
      description: '这是您对该分类的描述',
      items: [],
      id: '0',
    },
  ]).write();
}

// 初始化
// db.defaults({ tags: [] }).write();

export default db;
