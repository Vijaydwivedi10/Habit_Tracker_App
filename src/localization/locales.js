import * as React from 'react';
import { enGB, enUS, es, pl } from 'date-fns/locale';

const defaultLocale = enUS;

const locales = [
  { code: 'es', label: 'Español', import: es },
  {
    code: 'en-US',
    label: 'English US',
    import: enUS,
  },
  {
    code: 'en-GB',
    label: 'English GB',
    import: enGB,
  },
  { code: 'pl', label: 'Polski', import: pl },
];

export { defaultLocale, locales };
