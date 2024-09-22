import exposeContexts from "./helpers/ipc/context-exposer";
import { contextBridge, ipcRenderer } from 'electron';

exposeContexts();

contextBridge.exposeInMainWorld('adblocker', {
  getStatus: () => ipcRenderer.invoke('adblocker-status'),
  toggle: (enable: boolean) => ipcRenderer.invoke('adblocker-toggle', enable),
});
