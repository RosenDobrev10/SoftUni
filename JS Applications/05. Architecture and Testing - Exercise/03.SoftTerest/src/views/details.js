let section = document.getElementById('detailsPage')
section.remove()

export function showDetails(context){
    context.showSection(section)
}