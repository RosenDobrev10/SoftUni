const homeSection = document.getElementById('home');

export function showHome() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        homeSection.querySelector('p').textContent = `Welcome back, ${userData.email}!`;
    } else {
        homeSection.querySelector('p').textContent = 'Welcome to our site';
    }

    document.querySelector('main').replaceChildren(homeSection);
}