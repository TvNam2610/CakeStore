export const formatPrice = (str) => {
    return str.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
    });
};
