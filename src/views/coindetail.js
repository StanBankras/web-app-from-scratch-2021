const mainContent = document.querySelector('main .container');

export default function coinDetail({ id }) {
  mainContent.innerHTML = id;
}