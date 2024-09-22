import { shell } from "electron";

export function addExternalLinksEventListener(window: Electron.BrowserWindow) {
    window.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });
}
