import { insertHTML } from "../modules/templating.js";

// Make table from array of objects
export default function renderTable(arr) {
  const table = document.createElement('table');
  const thead = document.createElement('tr');

  // Generates table head elements based on the keys of one item
  Object.keys(arr[0]).forEach(key => {
    const th = document.createElement('th');
    th.innerText = key;
    thead.appendChild(th);
  });

  table.appendChild(thead);

  // Generates table rows based on entries in the array
  arr.forEach(item => {
    const row = document.createElement('tr');
    Object.keys(item).forEach(key => insertHTML(row, `<td>${item[key]}</td>`, 'beforeEnd'));
    table.appendChild(row);
  });

  return table;
}