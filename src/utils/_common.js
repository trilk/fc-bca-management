export const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

export const setFullName = (first, last, lang) => {
    if (lang === 'en') {
        return [first, last].filter(Boolean).join(' ');
    } else {
        return [last, first].filter(Boolean).join(' ');
    }
};

export const setAddress = (address) => {
    return [address.street, address.province, address.country].filter(Boolean).join(', ');
};