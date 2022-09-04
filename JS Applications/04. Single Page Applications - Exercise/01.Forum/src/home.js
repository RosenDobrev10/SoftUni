import { showDetails } from "./details.js";

const section = document.getElementById('homeView')
section.querySelector('div.topic-title').addEventListener('click', showDetails)
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)
section.querySelector('[name="cancel"]').addEventListener('click', clearForm)
section.remove()

export async function showHome(event) {
    event?.preventDefault()
    document.getElementById('main').replaceChildren('Loading...')

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    const posts = await response.json()

    document.getElementById('main').replaceChildren(section)


}

function createPostPreview(post){
    
}

function onSubmit(event) {
    event.preventDefault()
    const formData = new formData(form)
    const title = formData.get('topicName')
    const username = formData.get('userName')
    const content = formData.get('postText')

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: "post",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                username,
                content,
                dateCreated: new Date()
            })

        })

        if (response.ok === false) {
            const error = await response.json()
            throw new Error(error.message)
        }

        form.reset()
        showHome()
    } catch (error) {
        alert(error.message)
    }
}

function clearForm() {
    form.reset()
}