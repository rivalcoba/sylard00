
function ifColaborator(item, options){
    if(item.role == 'colaborator')
        return options.fn(this)
    return ""
}

function ifSu(item, options){
    if(item.role == 'su')
        return options.fn(this)
    return ""
}

function ifVisitor(item, options){
    if(item.role == 'visitor')
        return options.fn(this)
    return ""
}

function hideIfSu(item, options){
    if(item.role == 'su')
        return ""
    return options.fn(this)
}

export {
    ifColaborator,
    ifVisitor,
    ifSu,
    hideIfSu
}