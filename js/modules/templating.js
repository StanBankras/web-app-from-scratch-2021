export function appendEl(renderOn, el, data) {
  const element = document.createElement(el);

  if(data.innerHTML) element.innerHTML = data.innerHTML;
  if(data.attributes) {
    Object.keys(data.attributes).forEach(attr => {
      element[attr] = data.attributes[attr];
    });
  }

  renderOn.appendChild(element);
}

// Generate HTML that fills Tweet content
export function makeTweet(name, imageUrl, handle, text, date) {
  return `
    <section class="tweet">
      <div class="top">
        <img src="${imageUrl}"/>
        <h3 class="handle">@${handle}</h3>
      </div>
      <p class="content">${text}</p>
      <p class="date">${date}</p>
    </section>
  `;
}

// Insert HTML as a string in, before or after element
export function insertHTML(on, html, position) {
  on.insertAdjacentHTML(position, html);
}