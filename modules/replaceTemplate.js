/**
* Substitui os marcadores de posição nos templates pelos dados do produto.
* @param {string} template - O template HTML a ser processado.
* @param {Object} product - O objeto contendo os dados do produto.
* @returns {string} - Template HTML com os marcadores de posição substituídos pelos dados do produto.
*/
module.exports = (template, product) => {
  // Substitui {%PRODUCTNAME%} pelo nome do produto no template.
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
  // Substitui {%IMAGE%} pela URL da imagem do produto no template.
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)
  // Se o produto não for orgânico, adiciona a classe 'not-organic' para estilização.
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  }
  // Retorna o template HTML com todos os marcadores de posição substituídos pelos dados do produto.
  return output
}