const React = require('react');
const cheerio = require('cheerio');
const _ = require('lodash');

const { PrefetchFragmentLink } = require('./PrefetchFragmentLink');

exports.onRenderBody = ({ setHeadComponents, bodyHtml }) => {
    const $ = cheerio.load(bodyHtml);
    const fragmentPrefetchUrls = _.uniq(
        $('cloze\\:include')
            .get()
            .map(element => $(element).attr('src')),
    );

    setHeadComponents(
        <>
            {fragmentPrefetchUrls.map(url => (
                <PrefetchFragmentLink src={url} />
            ))}
        </>,
    );
};
