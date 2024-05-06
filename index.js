const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

/**
* Lê o conteúdo de um arquivo de texto de forma síncrona e escreve em outro arquivo de texto de forma síncrona.
*/
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written!')

/**
* Lê o conteúdo de vários arquivos de texto de forma assíncrona e os concatena em um único arquivo de texto.
*/
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3)
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written!')
//       })
//     })
//   })
// })

// Lê o conteúdo do arquivo JSON de forma síncrona e o converte em uma string.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
// Converte a string JSON em um objeto JavaScript.
const dataObj = JSON.parse(data)
// Lê o conteúdo dos arquivos HTML de forma síncrona e atribui a variáveis.
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

/**
* Substitui os marcadores de posição nos templates pelos dados do produto.
* @param {string} template - O template HTML a ser processado.
* @param {Object} product - O objeto contendo os dados do produto.
* @returns {string} - Template HTML com os marcadores de posição substituídos pelos dados do produto.
*/
const replaceTemplate = (template, product) => {
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

/**
* Cria um servidor HTTP.
* @param {http.IncomingMessage} req - Objeto de solicitação HTTP.
* @param {http.ServerResponse} res - Objeto de resposta HTTP.
*/
const server = http.createServer((req, res) => {
  // Atribui o caminho da URL da solicitação HTTP para uma constante.
  // Desestrutura a URL da solicitação para obter o objeto query e pathname.
  const { query, pathname } = url.parse(req.url, true)
  
  if (pathname === '/' || pathname === '/overview') {
    // Overview page
    // Status e o tipo de conteúdo da resposta
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    // Gera o HTML dos cards dos produtos substituindo os marcadores nos templates.
    const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('')
    // Substitui o marcador de posição {%PRODUCT_CARDS%} no template de visão geral.
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    // Retorna a resposta com o HTML da página de visão geral.
    res.end(output)
  } else if (pathname === '/product') {
    // Product page
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    // Obtém o produto correspondente ao ID da query.
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)
  } else if (pathname === '/api') {
    /**
    * Define o header de resposta para indicar que o conteúdo é JSON e envia os dados JSON.
    * @param {number} 200 - Código de status HTTP 200 (OK).
    * @param {Object} {'Content-Type': 'application/json'} - O header de resposta com o tipo de conteúdo.
    */
    //  API page
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(data)
  } else {
    // Not found page
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>Page not found!</h1>')
  }
})

/**
* Inicia o servidor HTTP para escutar as solicitações HTTP.
* @param {number} port - A porta em que o servidor vai ouvir as solicitações.
* @param {string} hostname - O nome do host onde o servidor será vinculado.
* @param {Function} callback - Função de retorno de chamada que será executada quando o servidor começar a escutar.
*/
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})