(() => {
  const links = [
    { label: "DexBuilder 官网", href: "https://www.dexbuilder.com/" },
    { label: "交易演示", href: "https://demo.dexbuilder.com/en/perps" },
    { label: "打开 Builder", href: "https://www.dexbuilder.com/en/dex" }
  ];

  const hrefs = new Set(links.map((item) => item.href.replace(/\/$/, "")));
  let rafId = 0;

  function normalizeHref(value) {
    try {
      return new URL(value, window.location.origin).href.replace(/\/$/, "");
    } catch {
      return value.replace(/\/$/, "");
    }
  }

  function positionSidebarLinks(sidebar, container) {
    const rect = sidebar.getBoundingClientRect();

    // Keep the block visually attached to the sidebar, but fixed to the viewport.
    container.style.left = rect.left + "px";
    container.style.width = rect.width + "px";
  }

  function renderSidebarLinks() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    // Hide any legacy copies of these links rendered by previous navigation config.
    sidebar.querySelectorAll("a[href]").forEach((anchor) => {
      if (hrefs.has(normalizeHref(anchor.href))) {
        const wrapper = anchor.closest("li") || anchor;
        wrapper.setAttribute("data-dexbuilder-hidden-anchor", "true");
      }
    });

    let container = document.getElementById("dexbuilder-sidebar-links");
    if (!container) {
      container = document.createElement("div");
      container.id = "dexbuilder-sidebar-links";
      container.setAttribute("aria-label", "DexBuilder links");

      links.forEach((item) => {
        const anchor = document.createElement("a");
        anchor.href = item.href;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.textContent = item.label;
        container.appendChild(anchor);
      });

      // Append to body so position: fixed is always relative to the viewport,
      // not to the sidebar's scroll container.
      document.body.appendChild(container);
    }

    positionSidebarLinks(sidebar, container);
  }

  function scheduleRender() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(renderSidebarLinks);
  }

  scheduleRender();

  const observer = new MutationObserver(scheduleRender);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener("resize", scheduleRender);
  window.addEventListener("orientationchange", scheduleRender);
})();
