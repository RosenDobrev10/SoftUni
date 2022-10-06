(array) => array.forEach(num => num === Number(String(num).split("").reverse().join("")) ? console.log('true') : console.log('false'))
