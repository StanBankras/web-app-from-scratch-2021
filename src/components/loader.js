import { insertHTML } from '../modules/templating.js';

let messageCached = ''; 

function insert(on, message) {
  if(!message) {
    message = messageCached;
  }

  const loader = `
    <div id="loader">
      <h2>Loading</h2>
      ${message ? `<p>${message}</p>` : ''}
    </div>
  `;

  insertHTML(on, loader, 'beforeEnd');
}

function remove() {
  const loader = document.querySelector('#loader');
  if(loader) loader.remove();
}

function reRender(on) {
  remove();
  insert(on, messageCached);
}

export default { insert, remove, reRender };