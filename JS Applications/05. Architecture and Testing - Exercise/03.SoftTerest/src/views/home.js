let section = document.getElementById('homePage')
section.remove()

export function showHome(context){
    context.showSection(section)
}