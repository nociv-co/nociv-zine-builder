// js/vectorEngine.js
import { ZINE_PRESETS } from './config.js';

export function renderVectorSheet(state) {
  const DPI = 96;
  const preset = ZINE_PRESETS[state.presetKey];
  const w = preset.sheetWidth * DPI;
  const h = preset.sheetHeight * DPI;

  const cellW = w / preset.cols;
  const cellH = h / preset.rows;

  let svg = `<svg id="zine-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="bg-white rounded shadow-2xl">`;

  // Base Paper Background
  svg += `<rect width="${w}" height="${h}" fill="#fcfbf7"/>`;

  // Render Page Cells
  state.pages.slice(0, preset.pageCount).forEach((page, index) => {
    const col = index % preset.cols;
    const row = Math.floor(index / preset.cols);
    const x = col * cellW;
    const y = row * cellH;
    const rot = preset.orientations[index] || 0;
    const isSelected = index === state.activePageIndex;

    svg += `
      <g transform="translate(${x}, ${y})" class="cursor-pointer" data-page-index="${index}">
        <rect width="${cellW}" height="${cellH}" fill="${page.bg}" stroke="${isSelected ? '#d4af37' : '#e2ded4'}" stroke-width="${isSelected ? '3' : '1'}"/>
        <g transform="translate(${cellW/2}, ${cellH/2}) rotate(${rot})">
          <text text-anchor="middle" dominant-baseline="middle" font-family="${page.font}" font-size="16" font-weight="bold" fill="#111111">
            ${page.title || `PAGE ${index + 1}`}
          </text>
          <text y="22" text-anchor="middle" dominant-baseline="middle" font-family="JetBrains Mono" font-size="9" fill="#888888">
            [ P${index + 1} ]
          </text>
        </g>
      </g>
    `;
  });

  // Fold Lines & Cuts Overlay
  if (state.showGuides) {
    for (let c = 1; c < preset.cols; c++) {
      svg += `<line x1="${c * cellW}" y1="0" x2="${c * cellW}" y2="${h}" stroke="#a1a1aa" stroke-width="1" stroke-dasharray="4,4"/>`;
    }
    for (let r = 1; r < preset.rows; r++) {
      svg += `<line x1="0" y1="${r * cellH}" x2="${w}" y2="${r * cellH}" stroke="#a1a1aa" stroke-width="1" stroke-dasharray="4,4"/>`;
    }

    if (state.presetKey === 'mini-8') {
      const startX = cellW;
      const endX = cellW * 3;
      const midY = h / 2;
      svg += `<line x1="${startX}" y1="${midY}" x2="${endX}" y2="${midY}" stroke="#dc2626" stroke-width="3"/>`;
      svg += `<text x="${w/2}" y="${midY - 8}" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="bold" fill="#dc2626">✂ CUT CENTER SLIT</text>`;
    }
  }

  svg += `</svg>`;
  return svg;
}
