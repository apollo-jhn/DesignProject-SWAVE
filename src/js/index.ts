// After HTML has been loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to SWAVE!");

  // Navigate to homepage
  navigateTo("content_homepage");
});

// CONSTANTS
const TEMPLATE_BASE_PATH = "templates/"
const app = document.getElementById("app") as HTMLDivElement | null;
const header_title = document.getElementById(
  "header_title"
) as HTMLHeadingElement | null;
const websocket_status = document.getElementById(
  "websocket_status"
) as HTMLSpanElement | null;

async function navigateTo(route: string): Promise<void> {
  if (!app) {
    console.error("Element with ID 'app' not found in the DOM.");
    return;
  }

  try {
    const response = await fetch(`${TEMPLATE_BASE_PATH}${route}.html`);

    if (!response.ok) {
      throw new Error(`Failed to load template for route: ${route}`);
    }

    const html = await response.text();
    app.innerHTML = html;
    history.pushState({ route }, "", `#${route}`);
  } catch (error) {
    console.error("Error loading route template:", error);
  }
}