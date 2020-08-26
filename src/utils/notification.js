const { Notification } = window.require('electron').remote;

function createNotification(title, body, sound) {
  return new Notification(title, {
    body,
    sound,
  });
}

export default {
  createNotification,
};
