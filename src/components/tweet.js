// Generate HTML that fills Tweet content
export default function makeTweet(name, imageUrl, handle, text, date) {
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