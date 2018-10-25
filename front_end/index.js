
document.addEventListener('DOMContentLoaded', () => {
 const cryptoList = document.getElementById("stock-list")


 fetch('http://localhost:3000/api/v1/stocks')
 .then(res => res.json())
 .then(response => createCryptoListingFromJSON(response))

 const createCryptoListingFromJSON = (jsonList) =>{
   jsonList.forEach((cryptoObj) => {
     const cryptoElement = createHTMLForCryptoObj(cryptoObj)
     cryptoList.appendChild(cryptoElement)
   })
 }

 const reformatSymbol = (stockSymbol) => {
   stock_split = stockSymbol.split("")
   stock_split.pop()
   stock_split.pop()
   stock_split.pop()
   stock_split.pop()
   symbol = stock_split.join("")
   return symbol
 }

 const createHTMLForCryptoObj = (cryptoObj) => {
   const styleDiv = document.createElement('div')
   const div = document.createElement('div')
   const h1 = document.createElement('h1')
   h1.className = "symbols"
   const h5 = document.createElement('h5')
   h5.className = "companies"
   const img = document.createElement('img')
   const symbol = reformatSymbol(cryptoObj.symbol)
   const reformattedName = cryptoObj.name.replace('USD', '')
   const headerDiv = document.createElement('div')

   priceString = cryptoObj.price.replace(/[\[\]']+/g,'')
   priceStringArray  = priceString.split(',')
   priceArray = priceStringArray.map((pricepoint) => {
     return parseInt(pricepoint)
   })

     const chartDiv = document.createElement('chartDiv')
     chartDiv.className = "chart-div"

     const canvas = document.createElement('canvas')
     canvas.className = "canvas"
     canvas.id = `${cryptoObj.id}`
     canvas.height = '400'
     canvas.width = '400'
     canvas.getContext('2d')

     let myChart = canvas


     let barChart = new Chart(myChart, {
       type: 'line',
       data: {
         labels: ['price'],
         datasets: [ {
           label: `${reformattedName}`,
           data: [
            priceArray
           ]
         }],
       }
     })



     chartDiv.appendChild(canvas)

     // var parallax = new Parallax('.parallax', {
     //     offsetYBounds: 50,
     //     intensity: 30,
     //     center: 0.5,
     //     safeHeight: 0.15
     // })


   h1.innerText = symbol
   img.className = "icon"
   img.src = cryptoObj.image_url
   styleDiv.className = "list-item"
   headerDiv.appendChild(h1)
   headerDiv.appendChild(img)



   div.appendChild(headerDiv)
   div.appendChild(canvas)
   styleDiv.appendChild(div)

   return styleDiv
}


})
