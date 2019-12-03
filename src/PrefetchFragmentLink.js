const React = require('react');
const PropTypes = require('prop-types');

export const PrefetchFragmentLink = ({ src }) => <link rel="cloze:prefetch" href={src} />;

PrefetchFragmentLink.propTypes = {
  src: PropTypes.string.isRequired,
};