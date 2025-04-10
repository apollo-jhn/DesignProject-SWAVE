// After HTML has been loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to SWAVE!");
});

const app = document.getElementById("app") as HTMLDivElement | null
const header_title = document.getElementById("header_title") as HTMLHeadingElement | null
const websocket_status = document.getElementById("websocket_status") as HTMLSpanElement | null