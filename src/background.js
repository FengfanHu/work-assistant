import {
  app, protocol, BrowserWindow, globalShortcut, Notification,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import shortCut from '@/utils/shortcut'; // 引入全局快捷键

const isDevelopment = process.env.NODE_ENV !== 'production';

// 对Window的引用
let win;

// 设置协议策略
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createWindow() {
  // 创建浏览器窗口.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      // 允许Browser使用node的功能
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 开发模式加载
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    // 非开发模式
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// 所有窗口关闭之后触发
app.on('window-all-closed', () => {
  // 对于macOS来说，使用Cmd+Q退出，其他操作系统在关闭所有窗口后直接退出程序
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在调用app.quit()后触发，触发后程序退出
app.on('will-quit', () => {
  // 程序退出之后，注销程序注册的所有系统(全局，无需聚焦)快捷键
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  // 对于macOS系统，点击Dock上的图标，激活此事件
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
  // 注册全局快捷键
  const devtool = shortCut.devTools(win.webContents);
  if (!devtool) console.log('快捷键注册失败');
  // 发送通知
  const notification = new Notification({
    title: 'Title',
    body: 'body',
    sound: 'ring',
  });
  notification.show();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
