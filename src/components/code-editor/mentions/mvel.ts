import { Completion } from '../interface';

// describe mvel language
// @see http://mvel.documentnode.com/
export default [
  {
    label: '@foreach{}',
    detail: '@foreach{} Foreach iteration',
    info: 'The foreach tag allows you to iterate either collections or arrays in your template.',
    section: {
      name: 'mvel',
    },
  },
  {
    label: '@if{}',
    detail: '@if{}@else{} Control Flow Tags',
    info: 'The @if{} and @else{} tags provide full if-then-else functionality in MVEL Templates.',
    section: {
      name: 'mvel',
    },
  },
  {
    label: '@else{}',
    detail: '@if{}@else{} Control Flow Tags',
    info: 'The @if{} and @else{} tags provide full if-then-else functionality in MVEL Templates.',
    section: {
      name: 'mvel',
    },
  },
  {
    label: '@end{}',
    detail: '@end{} @foreach and @if-else end',
    section: {
      name: 'mvel',
    },
  },
  {
    label: '@code{}',
    detail: '@code{} Silent Code Tag',
    info: 'The silent code tag allows you to execute MVEL expression code in your template. It does not return a value and does not affect the formatting of the template in any way.',
    section: {
      name: 'mvel',
    },
  },
] as Completion[];
