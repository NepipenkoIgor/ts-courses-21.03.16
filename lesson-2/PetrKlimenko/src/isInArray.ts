type genericInt = (string|number|boolean);

export default (list: genericInt[], ...elements: genericInt[]): boolean => {
    for (let element of elements)
        if (list.indexOf(element) === -1)
            return false;

    return true;
}
