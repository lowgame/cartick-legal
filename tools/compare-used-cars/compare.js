// Entries remain in this page only. No storage, network requests or app sync.
(() => {
  'use strict';
  const form = document.getElementById('compare-form');
  const fields = [...form.querySelectorAll('input, textarea')];
  const status = document.getElementById('export-status');
  form.addEventListener('submit', event => event.preventDefault());
  function syncPrint() {
    fields.forEach(field => { field.nextElementSibling.textContent = field.value.trim() || '—'; });
  }
  form.addEventListener('input', syncPrint);
  window.addEventListener('beforeprint', syncPrint);
  document.getElementById('print').addEventListener('click', () => { syncPrint(); window.print(); });
  document.getElementById('download').addEventListener('click', () => {
    const lines = ['TWO-CAR COMPARISON — YOUR NOTES', 'Blank fields are unknown, not a clean bill of health.', ''];
    for (const car of ['A', 'B']) {
      lines.push('CAR ' + car, '');
      fields.filter(field => field.dataset.car === car).forEach(field => {
        lines.push(field.dataset.label + ':', field.value.trim() || '—', '');
      });
    }
    lines.push('Prepared with the free CarTick web worksheet.', 'https://lowgame.github.io/cartick-legal/tools/compare-used-cars/', 'This worksheet does not assess condition or replace an independent inspection.');
    const url = URL.createObjectURL(new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = 'used-car-comparison.txt'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    status.textContent = 'Download requested. Check your downloads for used-car-comparison.txt.';
  });
  syncPrint();
})();
