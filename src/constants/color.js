import KEY from "./keys_property";


const PREFIX = '--theme-';
const POSTFIX = '';

const TYPE_COLOR = 'COLOR';
const TYPE_THEME = 'THEME';
const TYPE_THEME_PALETTE = 'THEME_PALETTE';

const TOKENS = [
  'base', 'distant', 'nearest',
  'main', 'primary', 'secondary',
  'selection', 'selectionBase',
  'thumb', 'track',
  'disabled', 'marked', 'active', 'cover',
  'iconBase', 'iconMain',
  'success', 'warning', 'failure',
  'shadow',
  'nearest-low', 'nearest-high', 'active-low', 'active-high',
  'shadow-main', 'shadow-low', 'shadow-high',
  'selection-base', 'selection-main', 'icon-base', 'icon-main',
  'marker0', 'marker1', 'marker2', 'marker3', 'marker4', 'marker5'
];

const MIN_SIZE_THEME_PALETTE = 3;
const MAX_SIZE_THEME_PALETTE = 5;

const STATIC_PALETTE = {
  VOID: {
    id: '0', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-transparent',
    name: 'transparent',
    description: '',
    value: { r: 0, g: 0, b: 0, a: 0 }
  },
  RED: {
    id: '1', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-red',
    name: 'red',
    description: '',
    value: { r: 0xDB, g: 0x2E, b: 0x2E, a: 1 }
  },
  BLUE: {
    id: '2', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-blue',
    name: 'blue',
    description: '',
    value: { r: 0x2E, g: 0x8D, b: 0xDB, a: 1 }
  },
  GREY: {
    id: '3', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-grey',
    name: 'grey',
    description: '',
    value: { r: 0x88, g: 0x88, b: 0x88, a: 1 }
  },
  GREEN: {
    id: '4', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-green',
    name: 'green',
    description: '',
    value: { r: 0x1F, g: 0xDF, b: 0xB0, a: 1 }
  },
  YELLOW: {
    id: '5', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-yellow',
    name: 'yellow',
    description: '',
    value: { r: 0xD9, g: 0xD9, b: 0x15, a: 1 }
  },
  ORANGE: {
    id: '6', [KEY.TYPE]: TYPE_COLOR,
    key: '--theme--static-orange',
    name: 'orange',
    description: '',
    value: { r: 0xE1, g: 0x40, b: 0x0D, a: 1 }
  },
};
