
import { createLucideIcon } from 'lucide-vue-next'


export const ExtraIcons = {
  ColumnDelete: createLucideIcon('ColumnDelete', [
    [
      'path',
      {
        d: 'M5.5 3c1.404 0 2.107 0 2.611.38c.219.164.406.375.552.62C9 4.568 9 5.358 9 6.938v10.125c0 1.58 0 2.37-.337 2.937a2.1 2.1 0 0 1-.552.621c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C2 19.432 2 18.642 2 17.062V6.938c0-1.58 0-2.37.337-2.938a2.1 2.1 0 0 1 .552-.62C3.393 3 4.096 3 5.5 3M20 11.938v5.124c0 1.58 0 2.37-.337 2.938a2.1 2.1 0 0 1-.552.62c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C13 19.433 13 18.642 13 17.063V6.938c0-1.58 0-2.37.337-2.938M22 9l-6-6m6 0l-6 6',
        key: 'ColumnDelete',
        fill: 'none'
      },
    ],
  ]),
  RowDelete: createLucideIcon('RowDelete', [
    [
      'path',
      {
        d: 'M21 18.5c0 1.404 0 2.107-.38 2.611a2.1 2.1 0 0 1-.62.552c-.567.337-1.358.337-2.937.337H6.938c-1.58 0-2.37 0-2.938-.337a2.1 2.1 0 0 1-.62-.552C3 20.607 3 19.904 3 18.5s0-2.107.38-2.611c.163-.218.374-.406.62-.552C4.567 15 5.357 15 6.938 15h10.125c1.58 0 2.37 0 2.937.337c.246.146.457.334.62.552c.38.504.38 1.207.38 2.611M12.063 4H6.937C5.358 4 4.568 4 4 4.337a2.1 2.1 0 0 0-.62.552C3 5.393 3 6.096 3 7.5s0 2.107.38 2.611c.163.218.374.406.62.552C4.567 11 5.357 11 6.938 11h10.125c1.58 0 2.37 0 2.937-.337M21 8l-6-6m6 0l-6 6',
        key: 'RowDelete',
        fill: 'none'
      },
    ],
  ]),
  Word: createLucideIcon('Word', [
    [
      'path',
      {
        d: "M10 3v4a1 1 0 0 1-1 1H5m4 4l1 5l2-3.333L14 17l1-5m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1"
      }
    ],
  ]),
  SizeS: createLucideIcon('SizeS', [
    [
      'path',
      {
        d: "M11 7c-1.1 0-2 .9-2 2v2a2 2 0 0 0 2 2h2v2H9v2h4c1.11 0 2-.89 2-2v-2a2 2 0 0 0-2-2h-2V9h4V7z",
        'stroke-width': '0',
        'fill': 'currentColor'
      }
    ],
  ]),
  SizeM: createLucideIcon('SizeM', [
    [
      'path',
      {
        d: "M9 7c-1.1 0-2 .9-2 2v8h2V9h2v7h2V9h2v8h2V9a2 2 0 0 0-2-2z",
        'stroke-width': '0',
        'fill': 'currentColor'
      }
    ],
  ]),
  SizeL: createLucideIcon('SizeL', [
    [
      'path',
      {
        d: "M9 7v10h6v-2h-4V7z",
        'stroke-width': '0',
        'fill': 'currentColor'
      }
    ],
  ]),
  Comment: createLucideIcon('Comment', [
    [
      'path',
      {
        d: 'M12.75 18.5H10.5L5.5 21V18.5H2V3.5H22V9',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M6 7.5H7.5H9',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M6 10.5H9H12',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M14.75 15.5H23.25',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M19 11.25V19.75',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  // AI 相关图标 
  AIImprove: createLucideIcon('AIImprove', [
    [
      'path',
      {
        d: 'M18 3.5L21.5 6.73081L18 10.5',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M20 7H8.5034C5.06184 7 2.13918 9.81014 2.00507 13.2499C1.8633 16.8848 4.86671 20 8.5034 20H17.001',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AILonger: createLucideIcon('AILonger', [
    [
      'path',
      {
        d: 'M21 21H3M14 8L12 6L10 8M14 16L12 18L10 16M21 12H3M21 3H3',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AIShorter: createLucideIcon('AIShorter', [
    [
      'path',
      {
        d: 'M9 18L12 15L15 18',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M12 15.5V22',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M9 6L12 9L15 6',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M12 8.5V2',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M3 12H21',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AISummarize: createLucideIcon('AISummarize', [
    [
      'path',
      {
        d: 'M3 18.1527H21',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M3 21H21',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M15 11.5L12 14.5L9 11.5',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M12 3V14.5',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AITranslate: createLucideIcon('AITranslate', [
    [
      'path',
      {
        d: 'M14.1426 18.5H19.8569M14.1426 18.5L13 21M14.1426 18.5L16.9998 12L19.8569 18.5M19.8569 18.5L20.9997 21',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M8.00025 3L8.50025 4.5',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M3 5.5H14',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M5.00025 8C5.00025 8 5.8955 11.1305 8.13185 12.8696C10.3682 14.6088 14.0003 16 14.0003 16',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M12 5.5C12 5.5 11.1053 9.60864 8.8684 11.8912C6.63161 14.1738 3 16 3 16',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AIFlowchart: createLucideIcon('AIFlowchart', [
    [
      'path',
      {
        d: 'M4 6h4v4H4zM16 6h4v4h-4zM10 13h4v4h-4zM4 20h4v-4H4zM16 20h4v-4h-4z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M8 8h4M8 8v7M16 8h-4M16 8v7M12 10v3M8 15h4M16 15h-4M8 18v-3M16 18v-3',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
  AITable: createLucideIcon('AITable', [
    [
      'path',
      {
        d: 'M3 3h18v18H3z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
    [
      'path',
      {
        d: 'M3 9h18M3 15h18M9 3v18M15 3v18',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
      }
    ],
  ]),
}
