export default (list: any[]): any[] => {
    let result: any[] = [];
    
    for (let element of list)
        if (result.indexOf(element) === -1)
            result.push(element);

    return result;
}
