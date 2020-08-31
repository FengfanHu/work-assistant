import {
  app, protocol, BrowserWindow, ipcMain,
  globalShortcut, Notification, Menu, dialog
} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { createTray } from '@/utils/tray'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 对Window的引用
let win
const tray = []

// 设置协议策略
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow () {
  // 创建浏览器窗口.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    // eslint-disable-next-line no-undef
    icon: `${__static}/icon/icon-128.png`,
    webPreferences: {
      // 允许Browser使用node的功能
      nodeIntegration: true,
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 开发模式加载
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    // 非开发模式
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// 禁用同源策略
// eslint-disable-next-line no-undef,no-unused-expressions
process.platform === 'darwin' ? app.dock.setIcon(`${__static}/icon/icon-128.png`) : null

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

// 所有窗口关闭之后触发
app.on('window-all-closed', () => {
  // 对于macOS来说，使用Cmd+Q退出，其他操作系统在关闭所有窗口后直接退出程序
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在调用app.quit()后触发，触发后程序退出
app.on('will-quit', () => {
  // 程序退出之后，注销程序注册的所有系统(全局，无需聚焦)快捷键
  globalShortcut.unregisterAll()
})

app.on('activate', () => {
  // 对于macOS系统，点击Dock上的图标，激活此事件
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  // 应用图标
  const tray1 = createTray('icon-20.png')
  tray1.setToolTip('FUN WORK')
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click () {
        dialog.showMessageBox({
          type: 'info',
          // eslint-disable-next-line no-undef
          icon: `${__static}/icon/icon-64.png`,
          title: 'FunWork',
          message: 'FunWork',
          detail: 'Author: Frank\nGithub: https://github.com/FengfanHu/work-assistant'
        })
      }
    },
    { type: 'separator' },
    {
      label: '音乐',
      type: 'submenu',
      submenu: [
        {
          label: '播放/暂停',
          click () {
            win.webContents.send('music', 'playOrPause')
          }
        },
        {
          label: '下一首',
          click () {
            win.webContents.send('music', 'next')
          }
        }
      ]
    }
  ])
  tray1.on('right-click', () => {
    tray1.popUpContextMenu(contextMenu)
  })
  tray1.on('click', () => {
    win.show()
  })
  // 播放暂停
  const tray2 = createTray('play-16.png')
  tray2.setTitle('播放/暂停')
  tray2.on('click', () => {
    win.webContents.send('music', 'playOrPause')
  })
  // 下一首
  const tray3 = createTray('step-forward-16.png')
  tray3.setTitle('下一首')
  tray3.on('click', () => {
    win.webContents.send('music', 'next')
  })
  tray.push(tray1, tray2, tray3)
  // 设置音乐标题
  ipcMain.on('music-title', (event, name) => {
    console.log(name)
    tray1.setTitle(name)
  })

  createWindow()

  // 发送通知
  const notification = new Notification({
    title: 'Welcome',
    body: '欢迎使用FUN WORK',
    sound: 'ring'
  })
  notification.show()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
