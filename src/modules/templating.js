
// Generate HTML that fills Tweet content
export function makeTweet(name, imageUrl, handle, text, date) {
  return `
    <section class="tweet">
      <div class="top">
        <img src="${imageUrl}"/>
        <h3 class="handle">@${handle}</h3>
      </div>
      <p class="content">${text}</p>
      <p class="distime date" data-time="${new Date(date).getTime() / 1000}">${new Date(date).getTime() / 1000}</p>
    </section>
  `;
}

export function makeEvent(name, description, link, date) {
  return `
    <section class="event">
      <h3><a href="${link}">${name ? name : 'No title'}</a></h3>
      <p class="description">${description ? description : 'No description'}</p>
      <p class="distime date" data-time="${new Date(date).getTime() / 1000}">${new Date(date).getTime() / 1000}</p>
    </section>
  `;
}

// Insert HTML as a string in, before or after element
export function insertHTML(on, html, position) {
  on.insertAdjacentHTML(position, html);
}