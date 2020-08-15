const { dialog } = window.require('electron').remote;

function confirm(msg, window) {
  const browserWindow = window || null;
  const options = {
    type: 'warning',
    title: '您确定执行此操作？',
    buttons: ['取消', '确认'],
    defaultId: 0,
    cancelId: 1,
    message: msg,
  };
  const flag = dialog.showMessageBoxSync(browserWindow, options);
  return flag;
}

export default {
  confirm,
};
