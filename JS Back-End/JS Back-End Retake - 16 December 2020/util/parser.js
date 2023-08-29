function parseError(error){
    if (error.name == 'ValidationError'){
        return Object.values(error.errors).map(value => value.message);
    } else {
        return error.message.split('\n');
    }
}

module.exports = {
    parseError,
}