import { insertHTML } from '../modules/templating.js';

// Used when rerendering, sometimes the same message can just be used if there is no new one
let messageCached = ''; 

// Inserts loader on element
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

// Removes the loader from the page
function remove() {
  const loader = document.querySelector('#loader');
  if(loader) loader.remove();
}

// Takes the loader out of the page and then inserts it again
function reRender(on) {
  remove();
  insert(on, messageCached);
}

export default { insert, remove, reRender };