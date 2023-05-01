const container = document.querySelector('#errorBox');
const span = container.querySelector('span');

export function notify(message) {
	span.textContent = message;
	container.style.display = 'block';

	setTimeout(() => (container.style.display = 'none'), 3000);
}
