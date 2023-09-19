export function getNamePdf(productPdfUrl) {
  if (productPdfUrl) {
    var parseUrl = productPdfUrl.split("/");
    var filename = parseUrl[parseUrl.length - 1];
    return decodeURIComponent(filename);
  }
  return "";
}

export function formatPrice(price) {
  return parseFloat(price).toFixed(2).replace(".", ",");
}
