import 'i18next';
// load prime lang as references
import enCommon from '../locales/en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof enCommon;
    };
    // !!! NOT RECOMMENDED If set this to true, prevents type errors
    //  caused by inserting objects in <Trans>.
    allowObjectInHTMLChildren: false;
  }
}
