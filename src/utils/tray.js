import { Tray } from 'electron';

export function createTray(icon) {
  // eslint-disable-next-line no-undef
  const menubarPic = `${__static}/icon/${icon}`;
  return new Tray(menubarPic);
}

export default {
  createTray,
};
