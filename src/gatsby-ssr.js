const path = require('path');
const React = require('react');
const Promise = require('bluebird');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp-promise');
const {
  FragmentSheet,
  FragmentSheetManager,
} = require('@bit/braunreuther.cloze.react-cfi.cfi-sheet');

const sheetByPathname = new Map();

// eslint-disable-next-line react/prop-types,react/display-name
exports.wrapRootElement = ({ element, pathname }) => {
  const sheet = new FragmentSheet();
  sheetByPathname.set(pathname, sheet);
  return <FragmentSheetManager sheet={sheet}>{element}</FragmentSheetManager>;
};

exports.onRenderBody = async ({ setHeadComponents, pathname }) => {
  const sheet = sheetByPathname.get(pathname);
  if (sheet) {
    setHeadComponents(sheet.getPrefetchTags());
    await mkdirp(path.join(process.cwd(), '/.cloze/props'));
    await Promise.map(
      sheet.getProps(),
      ({ props, hash }) =>
        jsonfile.writeFile(
          path.join(process.cwd(), '/.cloze/props', `${hash}.json`),
          props,
        ),
      { concurrency: 10 },
    );
    sheetByPathname.delete(pathname);
  }
};
