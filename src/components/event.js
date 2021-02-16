export default function makeEvent(name, description, link, date) {
  return `
    <section class="event">
      <h3><a href="${link}">${name ? name : 'No title'}</a></h3>
      <p class="description">${description ? description : 'No description'}</p>
      <p class="distime date" data-time="${new Date(date).getTime() / 1000}">${new Date(date).getTime() / 1000}</p>
    </section>
  `;
}