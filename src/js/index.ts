// After HTML has been loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Welcome to SWAVE!");

  // Navigate to homepage
  navigateTo("content_homepage");
});

// CONSTANTS
const TEMPLATE_BASE_PATH = "templates/";
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
    // Show loading screen first
    const loadingResponse = await fetch(
      `${TEMPLATE_BASE_PATH}content_loading.html`
    );
    if (loadingResponse.ok) {
      const loadingHtml = await loadingResponse.text();
      app.innerHTML = loadingHtml;
    } else {
      console.warn("Failed to load loading template.");
    }

    // Wait for a random delay between 200ms and 900ms
    const delay = Math.floor(Math.random() * 700) + 200;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Fetch and load the actual route
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

// Back button click handler
const backButton = document.getElementById("back_button");
if (backButton) {
  backButton.addEventListener("click", () => {
    history.back();
  });
}

// Listen to browser navigation (back/forward)
window.addEventListener("popstate", (event) => {
  const route = event.state?.route;
  if (route) {
    navigateTo(route);
  }
});
