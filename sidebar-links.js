(() => {
  const links = [
    { label: "DexBuilder 官网", href: "https://www.dexbuilder.com/" },
    { label: "交易演示", href: "https://demo.dexbuilder.com/en/perps" },
    { label: "打开 Builder", href: "https://www.dexbuilder.com/en/dex" }
  ];

  function mountLinks() {
    if (document.getElementById("dexbuilder-sidebar-links")) return;

    const container = document.createElement("div");
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

    document.body.appendChild(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountLinks, { once: true });
  } else {
    mountLinks();
  }
})();
