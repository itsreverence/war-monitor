/// <reference types="electron-vite/node" />

import { app, BrowserWindow } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
import path from "path";
import { addExternalLinksEventListener } from "./helpers/ipc/external-links/external-links-listeners";
import { initializeAdblocker, setupAdblockerIPC } from "./helpers/ipc/adblocker/adblocker";

const inDevelopment = process.env.NODE_ENV === "development";

if (require("electron-squirrel-startup")) {
    app.quit();
}

function createWindow() {
    const preload = path.join(__dirname, "preload.js");
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: inDevelopment,
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: false,
            webviewTag: true,
            preload: preload,
        },
        titleBarStyle: "hidden",
    });
    registerListeners(mainWindow);
    addExternalLinksEventListener(mainWindow);

    if (process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else if (process.env.MAIN_WINDOW_VITE_NAME) {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${process.env.MAIN_WINDOW_VITE_NAME}/index.html`)
        );
    } else {
        console.error('Unable to load the app: Missing Vite configuration');
        app.quit();
    }

    initializeAdblocker(mainWindow.webContents.session);
    setupAdblockerIPC();
}

app.whenReady().then(createWindow);

//osX only
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//osX only ends
