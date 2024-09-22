import { ElectronBlocker } from "@cliqz/adblocker-electron";
import fetch from "cross-fetch"; // Required for fetching filter lists
import { session, ipcMain } from "electron";

let blocker: ElectronBlocker | null = null;
let isEnabled: boolean = false;
let isInitialized: boolean = false;

/**
 * Initializes the Adblocker using @cliqz/adblocker-electron
 * @param electronSession - The Electron session to apply the adblocker to
 */
export async function initializeAdblocker(electronSession: Electron.Session) {
    if (isInitialized) {
        console.warn("Adblocker is already initialized.");
        return;
    }

    try {
        // Initialize the blocker with prebuilt ads and tracking filters
        blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);

        // Enable blocking in the specified Electron session
        blocker.enableBlockingInSession(electronSession);

        isEnabled = true;
        isInitialized = true;
        console.log("Adblocker initialized and enabled successfully.");
    } catch (error) {
        console.error("Failed to initialize Adblocker:", error);
    }
}

/**
 * Toggles the adblocker on or off
 * @param enable - Boolean indicating whether to enable or disable the adblocker
 */
export function toggleAdblocker(enable: boolean) {
    if (!blocker) {
        console.warn("Adblocker is not initialized.");
        return;
    }

    try {
        if (enable && !isEnabled) {
            blocker.enableBlockingInSession(session.defaultSession);
            isEnabled = true;
            console.log("Adblocker enabled.");
        } else if (!enable && isEnabled) {
            blocker.disableBlockingInSession(session.defaultSession);
            isEnabled = false;
            console.log("Adblocker disabled.");
        }
    } catch (error) {
        console.error("Failed to toggle Adblocker:", error);
    }
}

/**
 * Checks if the adblocker is currently enabled
 * @returns Boolean indicating if adblocker is enabled
 */
export function isAdblockerEnabled(): boolean {
    return isEnabled;
}

/**
 * Sets up IPC handlers for controlling the adblocker from the renderer process
 */
export function setupAdblockerIPC() {
    ipcMain.handle("adblocker-toggle", async (event, enable: boolean) => {
        toggleAdblocker(enable);
        return isAdblockerEnabled();
    });

    ipcMain.handle("adblocker-status", () => {
        return isAdblockerEnabled();
    });
}
