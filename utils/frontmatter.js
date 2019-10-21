import parser from 'js-yaml';

const optionalByteOrderMark = '\\ufeff?';
const platform = typeof process !== 'undefined' ? process.platform : '';
const pattern =
  `^(${optionalByteOrderMark}(= yaml =|---)` +
  `$([\\s\\S]*?)` +
  `^(?:\\2|\\.\\.\\.)\\s*` +
  `$${platform === 'win32' ? '\\r?' : ''}(?:\\n)?)`;

// NOTE: If this pattern uses the 'g' flag the `regex` variable definition will
// need to be moved down into the functions that use it.
const regex = new RegExp(pattern, 'm');

const parse = string => {
  const match = regex.exec(string);

  if (!match) {
    return {
      attributes: {},
      body: string,
    };
  }

  const yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '');
  const attributes = parser.load(yaml) || {};
  const body = string.replace(match[0], '');

  return { attributes, body, frontmatter: yaml };
};

export const frontmatter = input => {
  const string = input || '';

  const lines = string.split(/(\r?\n)/);
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse(string);
  }
  return { attributes: {}, body: string };
};

export const test = string => regex.test(string || '');

export default frontmatter;
