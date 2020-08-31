import { globalShortcut, BrowserWindow } from 'electron'

function devTools () {
  return globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    const contents = BrowserWindow.getFocusedWindow().webContents
    // eslint-disable-next-line no-unused-expressions
    contents.isDevToolsOpened() ? contents.closeDevTools() : contents.openDevTools()
  })
}

export default { devTools }
