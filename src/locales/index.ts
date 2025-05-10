import { GlobalRegistry } from '@clearx/designable-core';
import headers from './headers';
import '@/pages/developer/editor/locales';

export type Language = 'zh-cn' | 'en-us';

GlobalRegistry.registerDesignerLocales(headers);
