import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { getCircularReplacer } from './../utils/_common'

//component - CoreUI / CCreateElement
const CreateElement = ({ items, components = {} }) => {
    const renderItem = (item, i) => {
        const { _tag, _children, ...rest } = item
        const Tag = components[_tag] || _tag
        const children = _children ? _children.map((child, i) => {
            return typeof child === 'object' ? renderItem(child, i) : child
        }) : ''
        return <Tag key={Tag + i} {...rest}>{children}</Tag>
    }

    const generatedItems = useMemo(() => {
        return items && items.map((item, i) => renderItem(item, i))
    }, [JSON.stringify(items, getCircularReplacer())])

    return (
        <React.Fragment>
            {generatedItems}
        </React.Fragment>
    )
}

CreateElement.propTypes = {
    items: PropTypes.array.isRequired,
    components: PropTypes.object
};

export default CreateElement