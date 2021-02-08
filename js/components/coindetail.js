const mainContent = document.querySelector('main .container');

export default function coinDetail(params) {
  mainContent.innerHTML = params.id;
}