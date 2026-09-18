(() => {
  const links = [
    { label: "DexBuilder 官网", href: "https://www.dexbuilder.com/" },
    { label: "交易演示", href: "https://demo.dexbuilder.com/en/perps" },
    { label: "打开 Builder", href: "https://www.dexbuilder.com/en/dex" }
  ];

  const hrefs = new Set(links.map((item) => item.href.replace(/\/$/, "")));

  function normalizeHref(value) {
    try {
      return new URL(value, window.location.origin).href.replace(/\/$/, "");
    } catch {
      return value.replace(/\/$/, "");
    }
  }

  function renderSidebarLinks() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    // Hide any legacy copies of these links rendered by navigation config.
    sidebar.querySelectorAll("a[href]").forEach((anchor) => {
      if (anchor.closest("#dexbuilder-sidebar-links")) return;
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

      sidebar.appendChild(container);
    }
  }

  renderSidebarLinks();

  const observer = new MutationObserver(() => renderSidebarLinks());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
