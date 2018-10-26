
document.addEventListener('DOMContentLoaded', () => {
 const cryptoList = document.getElementById("stock-list")
 let priceArray

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

//
// id 1 = BTC
// id 5 = ONT
// id 2 = EOS
// id 8 = XRP
// id 3 = ETH
// id 6 = BCC
// id 4 = BNB
// id 7 = ADA
// id 9 = TUSD
// id 10 = TRX
// id 11 = LTC
// id 18 = QTUM
// id 13 = IOTA
// id 14 = ICX
// id 15 = NEO
// id 16 = VEN
// id 17 = XLM

 const createHTMLForCryptoObj = (cryptoObj) => {

   const styleDiv = document.createElement('div')
   const div = document.createElement('div')
   const h1 = document.createElement('h1')
   h1.className = "symbols"
   const h5 = document.createElement('h5')
   h5.className = "companies"
   const img = document.createElement('img')
   const symbol = reformatSymbol(cryptoObj.symbol)
   img.id = cryptoObj.id.toString() + symbol
   const reformattedName = cryptoObj.name.replace('USD', '')
   const headerDiv = document.createElement('div')
   const hiddenHeader = document.createElement('h2')
   hiddenHeader.innerText = symbol


   const parentDiv = document.getElementById(`data${symbol}`)
   title = parentDiv.firstElementChild
   title.innerText = symbol
   const littleIcon =document.createElement('img')
   littleIcon.className = "littleIcon"
   littleIcon.src = cryptoObj.image_url
   title.appendChild(littleIcon)




   priceString = cryptoObj.price.replace(/[\[\]']+/g,'')
   priceStringArray  = priceString.split(',')
   priceArray = priceStringArray.map((pricepoint) => {
      return parseInt(pricepoint)
   })


   makeChart(symbol, reformattedName, priceArray)


   h1.innerText = symbol
   img.className = "icon"
   img.src = cryptoObj.image_url
   styleDiv.className = "list-item"
   headerDiv.appendChild(h1)
   headerDiv.appendChild(img)


   div.appendChild(headerDiv)
   styleDiv.appendChild(div)

   return styleDiv
}


const makeChart = (title, name, priceData) => {
  var currentChart = document.getElementById(title)
  currentChart.className = "chart"
  var myChart = new Chart(currentChart, {
      type: 'line',
      data: {
          labels: priceData,
          datasets: [{
              label: name,
              data: priceData,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}


document.onclick = function(event){
  if (event.target.className === "icon"){
    id = parseInt(event.target.id)
    let symbol
    id > 9 ? symbol = event.target.id.slice(2) : symbol = event.target.id.slice(1)
    chart = document.getElementById(symbol)
  

    var rect = chart.getBoundingClientRect();
    window.scrollTo({
      top: rect.top ,
      left: rect.left,
      behavior: 'smooth'
    })
}
  }


})
