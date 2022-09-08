const host = 'http://localhost:3030'
async function request(url, options){
    try {
        let response = await fetch(host + url, options)
        if (response.status === 403){
            sessionStorage.removeItem('userData')
        }
        if (response.ok === false){
            const error = await response.json()
            throw new Error(error.message)
        }

        if (response.status === 204){
            return response
        } else {
            return response.json()
        }

    } catch (error) {
        alert(error.message)
        throw error
    }
}

function createOptions(method = "get", data){
    let options = {
        method,
        headers: {}
    }

    if (data !== undefined){
        options.headers['Content-type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    let userData = JSON.parse(sessionStorage.getItem('userData'))

    if (userData !== null){
        options.headers['X-Authorization'] = userData.token
    }

    return options
}

export async function get(url){
    return request(url, createOptions())
}

export async function post(url, data){
    return request(url, createOptions('post', data))
}

export async function put(url, data){
    return request(url, createOptions('put', data))
}

export async function del(url){
    return request(url, createOptions('delete'))
}

export async function login(email, password){
    let result = await post('/users/login', {email, password})

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData))
}

export async function logout(){
    await get('/users/logout')
    sessionStorage.removeItem('userData')
}

export async function register(email, password){
    let result = await post('/users/register', {email, password})

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    sessionStorage.setItem('userData', JSON.stringify(userData))
}

window.api = {
    request,
    post, 
    put, 
    del,
    login,
    logout
}