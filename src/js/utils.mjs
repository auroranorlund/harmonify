// render HTML template
export function renderWithTemplate(template, parentElement, list, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// load HTML template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
// load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}