// js/config.js

export const ZINE_PRESETS = {
  'mini-8': {
    name: '8-Page Micro Zine (1 Sheet, Single Cut)',
    cols: 4,
    rows: 2,
    pageCount: 8,
    sheetWidth: 11,
    sheetHeight: 8.5,
    orientations: [0, 0, 0, 0, 180, 180, 180, 180] // Inverts top row for folding
  },
  'accordion-6': {
    name: '6-Panel Accordion',
    cols: 3,
    rows: 2,
    pageCount: 6,
    sheetWidth: 11,
    sheetHeight: 8.5,
    orientations: [0, 0, 0, 0, 0, 0]
  },
  'saddle-8': {
    name: '8-Page Half-Letter Saddle Stitch',
    cols: 2,
    rows: 2,
    pageCount: 8,
    sheetWidth: 11,
    sheetHeight: 8.5,
    orientations: [0, 0, 0, 0]
  }
};
