import { insertHTML } from "../../modules/templating.js";

export default function error(on, message, hideAction) {
  const html = `
    <p class="error">${message}</p>
    ${hideAction ? '' : '<a href="#/" class="back-button">Back to top 20</a>'}
  `;
  
  insertHTML(
    on, html, 'beforeEnd'
  );
}