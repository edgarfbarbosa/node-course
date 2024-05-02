// const fs = require('fs')
const http = require('http')
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

/**
* Cria um servidor HTTP.
* @param {http.IncomingMessage} req - Objeto de solicitação HTTP.
* @param {http.ServerResponse} res - Objeto de resposta HTTP.
*/
const server = http.createServer((req, res) => {
  const pathName = req.url // Atribui o caminho da URL da solicitação HTTP para uma constante.
  
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is OVERVIEW')
  } else if (pathName == '/product') {
    res.end('This is the PRODUCT')
  } else {
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