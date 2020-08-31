const { dialog } = window.require('electron').remote

function confirm (msg, window) {
  const browserWindow = window || null
  const options = {
    type: 'warning',
    title: '您确定执行此操作？',
    buttons: ['取消', '确认'],
    defaultId: 0,
    cancelId: 1,
    message: msg
  }
  return dialog.showMessageBoxSync(browserWindow, options)
}

function selectDirectory (window) {
  const browserWindow = window || null
  const options = {
    title: '选择指定目录',
    message: '请选择一个目录路径作来存放您的笔记',
    properties: ['openDirectory', 'createDirectory']
  }
  return dialog.showOpenDialogSync(browserWindow, options)
}

export default {
  confirm,
  selectDirectory
}
