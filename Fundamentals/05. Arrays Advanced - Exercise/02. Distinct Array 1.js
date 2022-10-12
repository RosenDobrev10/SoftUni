function distinctArray(array) {
    let result = []
    array.forEach(num => result.includes(num) ? null : result.push(num))
    console.log(result.join(" "))
}
