// js/store.js
import { ZINE_PRESETS } from './config.js';

class ZineStore {
  constructor() {
    this.state = {
      presetKey: 'mini-8',
      activePageIndex: 0,
      showGuides: true,
      pages: [
        { title: 'COVER TITLE', bg: '#faf6ee', font: 'Permanent Marker' },
        { title: 'PAGE 2', bg: '#ffffff', font: 'Courier Prime' },
        { title: 'PAGE 3', bg: '#ffffff', font: 'Courier Prime' },
        { title: 'PAGE 4', bg: '#ffffff', font: 'Courier Prime' },
        { title: 'PAGE 5', bg: '#ffffff', font: 'JetBrains Mono' },
        { title: 'PAGE 6', bg: '#ffffff', font: 'JetBrains Mono' },
        { title: 'PAGE 7', bg: '#ffffff', font: 'JetBrains Mono' },
        { title: 'BACK COVER', bg: '#e3ded3', font: 'Playfair Display' }
      ]
    };
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify() {
    this.subscribers.forEach(fn => fn(this.state));
  }

  setActivePage(index) {
    this.state.activePageIndex = index;
    this.notify();
  }

  updateActivePageText(title) {
    this.state.pages[this.state.activePageIndex].title = title;
    this.notify();
  }

  setPreset(presetKey) {
    this.state.presetKey = presetKey;
    this.notify();
  }
}

export const store = new ZineStore();
