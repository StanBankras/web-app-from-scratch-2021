// Insert HTML as a string in, before or after element
export function insertHTML(on, html, position) {
  on.insertAdjacentHTML(position, html);
}