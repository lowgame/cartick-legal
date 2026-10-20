'use strict';
const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) {
  const target = new URL(canonical.href);
  target.search = location.search;
  target.hash = location.hash;
  location.replace(target.href);
}
