
function ifColaborator(item, options){
    if(item.role == 'colaborator')
        return options.fn(this)
    return ""
}

export {
    ifColaborator
}