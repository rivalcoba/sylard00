
function ifColaborator(item, options){
    if(item.role == 'colaborator')
        return options.fn(this)
    return ""
}
function ifVisitor(item, options){
    if(item.role == 'visitor')
        return options.fn(this)
    return ""
}

export {
    ifColaborator,
    ifVisitor
}