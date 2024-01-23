import { GlobalRegistry } from '@designable/core';
import headers from './headers';
import '@/pages/developer/editor/locales';

GlobalRegistry.registerDesignerLocales(headers);
