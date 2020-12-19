export const pageData = (data) =>{
    return Object.assign({}, ...data)
        .content.rendered.replace(/\n/g, '');
};

export const formatString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
