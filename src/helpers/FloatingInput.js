import React from 'react';
import PropTypes from 'prop-types';
import { CInput } from '@coreui/react'

const FloatingInput = props => {
    const { placeholder, ...rest } = props;

    return (
        <>
            <CInput required {...rest} />
            <label className="floating-label">{placeholder}</label>
        </>
    );
};

FloatingInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
};

FloatingInput.defaultProps = {
};

export default FloatingInput;