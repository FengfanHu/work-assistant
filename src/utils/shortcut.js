// eslint-disable-next-line import/no-extraneous-dependencies
import { globalShortcut } from 'electron';

function devTools(contents) {
  return globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    // eslint-disable-next-line no-unused-expressions
    contents.isDevToolsOpened() ? contents.closeDevTools() : contents.openDevTools();
  });
}

export default { devTools };
