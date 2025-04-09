import {
  app,
  BrowserWindow,
  type BrowserWindowConstructorOptions,
} from "electron";
import path from "node:path";

function createWindow(): void {
  const options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  };

  const win = new BrowserWindow(options);

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
