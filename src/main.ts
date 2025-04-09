import {
  app,
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron";
import { findPackageJSON } from "node:module";
import path from "node:path";

function createWindow(): void {
  const options: BrowserWindowConstructorOptions = {
    // Width and Height are configured to match the size of the touchscreen panel
    width: 800,
    height: 480,
    useContentSize: true, // The size is required
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  };

  const win = new BrowserWindow(options);

  // Disabling Menubar as it is not required
  win.setMenuBarVisibility(false)
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
