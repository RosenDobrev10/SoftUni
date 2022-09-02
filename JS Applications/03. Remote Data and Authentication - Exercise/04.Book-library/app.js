let loadBookButton = document.querySelector('#loadBooks')
let url = 'http://localhost:3030/jsonstore/collections/books'
let tBodyElement = document.getElementsByTagName('tbody')[0]
let formElement = document.getElementsByName('form')[0]

loadBookButton.addEventListener('click', loadBooks)

async function loadBooks(){
    try {
        let response = await fetch(url)
        if (response.status !== 200){
            throw new Error('Problem loading data ')
        }
        let data = await response.json()

        let entries = Object.entries(data)

        tBodyElement.innerHTML = ''

        for (let [key, {author, title}] of entries){
            let trElement = document.createElement('tr')
            let titleTDElement = document.createElement('td')
            titleTDElement.textContent = title
            let authorTDElement = document.createElement('td')
            authorTDElement.textContent = author

            trElement.appendChild(titleTDElement)
            trElement.appendChild(authorTDElement)

            let newTdElement = document.createElement('td')
            let editButton = document.createElement('button')
            editButton.textContent = 'Edit'
            let deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            deleteButton.addEventListener('click', remove)

            newTdElement.appendChild(editButton)
            newTdElement.appendChild(deleteButton)

            trElement.appendChild(newTdElement)
            tBodyElement.appendChild(trElement)

            function remove(event){
                event.preventDefault()
                fetch(`${url}/${key}`, {
                    method: 'delete'
                })

                trElement.remove()
            }
        }
    } catch (error) {
        
    }
}
