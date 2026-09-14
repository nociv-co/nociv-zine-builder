// js/main.js
import { store } from './store.js';
import { renderVectorSheet } from './vectorEngine.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  const pageGrid = document.getElementById('page-grid');
  const textInput = document.getElementById('page-text-input');
  const presetSelect = document.getElementById('preset-select');
  const exportBtn = document.getElementById('btn-export');

  // 1. Render function triggered whenever state changes
  function renderUI(state) {
    // Render the interactive vector sheet canvas
    container.innerHTML = renderVectorSheet(state);

    // Re-bind click events on SVG pages directly
    container.querySelectorAll('[data-page-index]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-page-index'), 10);
        store.setActivePage(idx);
      });
    });

    // Render Page Workbench Selector Buttons
    let gridHtml = '';
    state.pages.forEach((_, idx) => {
      const active = idx === state.activePageIndex;
      gridHtml += `
        <button data-page="${idx}" class="p-2 border rounded font-bold transition ${
          active
            ? 'bg-amber-400 text-black border-amber-400'
            : 'bg-[#18181c] border-zinc-800 text-zinc-300 hover:border-zinc-600'
        }">
          P${idx + 1}
        </button>
      `;
    });
    pageGrid.innerHTML = gridHtml;

    // Bind click events for page grid buttons
    pageGrid.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-page'), 10);
        store.setActivePage(idx);
      });
    });

    // Sync input box text with active page title
    const activePage = state.pages[state.activePageIndex];
    if (document.activeElement !== textInput) {
      textInput.value = activePage ? activePage.title : '';
    }
  }

  // 2. Listen to state updates
  store.subscribe(renderUI);

  // 3. UI Input Handlers
  textInput.addEventListener('input', (e) => {
    store.updateActivePageText(e.target.value);
  });

  presetSelect.addEventListener('change', (e) => {
    store.setPreset(e.target.value);
  });

  // 4. PDF Print Export Action
  exportBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [11, 8.5]
    });

    html2canvas(container).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 0, 0, 11, 8.5);
      doc.save('nociv-zine-print.pdf');
    });
  });

  // Initial draw
  store.notify();
});
