/* eslint-disable no-useless-escape */
module.exports = {
  escapeHTML(value) {
    if (typeof value === 'string') {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
      };

      const unsafeChars = Object.keys(escapeMap);

      const unescaped = unsafeChars.reduce((escaped, unsafeChar) => {
        const regexp = new RegExp(escapeMap[unsafeChar], 'g');
        return escaped.replace(regexp, unsafeChar);
      }, value);

      const mustBeSanitized = Object.keys(escapeMap)
        .some((unsafeChar) => unescaped.includes(unsafeChar));

      if (mustBeSanitized) {
        return Object.keys(escapeMap).reduce((escaped, unsafeChar) => {
          const regexp = new RegExp(unsafeChar, 'g');
          return escaped.replace(regexp, escapeMap[unsafeChar]);
        }, unescaped);
      }
    }

    return value;
  },
};
