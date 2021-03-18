import React from 'react';
import { icons } from '../assets/icons';
import PropTypes from 'prop-types';

const SVGViewer = props => {
    const styles = {
        svg: {
            display: 'inline-block',
            verticalAlign: 'middle',
        }
    };

    const svgData = icons[props.name];
    const viewBox = '0 0 ' + svgData[0];
    const textMsg = props.text || '';
    const url = props.url || '';
    const width = props.width || '100%';
    const height = props.height || '100%';
    const imgData = svgData[1].replace('{0}', textMsg).replace('{1}', url);

    return (
        <svg
            style={styles.svg}
            width={width}
            height={height}
            viewBox={viewBox}
            dangerouslySetInnerHTML={{ __html: imgData }}
        >
        </svg>
    );
};

SVGViewer.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
};

SVGViewer.defaultProps = {
};

export default SVGViewer;