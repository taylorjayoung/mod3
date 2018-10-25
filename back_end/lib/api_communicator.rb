require 'rest-client'
require 'JSON'
require 'pry'
require_relative '../config/environment.rb'
#make stock array for interpolation

STOCKS ={
  "0" => "TUSD", #No price
  "1" => "IOTA", #No price
  "2" => "XLM",
  "3" => "BNB",
  "4" => "XRP",
  "5" =>  "ETC",
  "6" => "VEN",  #No price
  "7" => "EOS",
  "8" =>"ICX",
  "9" => "QTUM",
  "10" => "TRX",
  "11" => "BCC",
  "12" => "ETH",
  "13" => "ADA",
  "14" => "LTC",
  "15" => "NEO",
  "16" =>"BTC",
  "17" => "ONT"


  #why not finding btc
  #other symbol missing?
}

IMAGES = [
{ symbol: "BTC", img_url: "https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png"},
{ symbol: "EOS" , img_url: "https://steemitimages.com/DQmeY3HLRU3Q2dhKgdqcuj52sbw7wdQdBvzzCjP2s2izNdU/2017-05-11%20(2).png"
},
{ symbol: "ETH", img_url: "https://seeklogo.com/images/E/ethereum-logo-1C9A722BB1-seeklogo.com.png"
},
{ symbol: "BNB", img_url: "https://www.worldcryptoindex.com/wp-content/uploads/2018/01/binance-coin-logo.png"},
{ symbol: "ONT", img_url: "https://cdn-images-1.medium.com/max/300/0*KXDXDENuBK8Lzd9b.jpg"},
{ symbol: "BCC", img_url: "https://cryptonewsmagnet.com/wp-content/uploads/2018/02/what-is-bitcoin-cash1.png"},
{ symbol: "ADA", img_url: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/r3NpKei5gizy8iatz/videoblocks-cardano-symbol-ada-blockchain-cryptocurrency-animation-digital-currency-cardano-a-logo-with-an-abstract-dots_rnqm5nt8g_thumbnail-full01.png"
},{ symbol: "XRP", img_url: "https://ripple.com/wp-content/themes/ripple-beta/assets/img/styleguide/logo1@2x.png"},
{ symbol: "TUSD", img_url: "https://cdn-images-1.medium.com/max/300/0*T-eeRKZq2TzhSX68.png"},
{ symbol: "TRX", img_url: "https://res.cloudinary.com/teepublic/image/private/s---PER8YxZ--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1514908004/production/designs/2247231_1.jpg"},
{ symbol: "LTC", img_url: "https://i.imgur.com/N8cDobt_d.jpg?maxwidt: 800&shap: thumb&fidelit: high"},
{ symbol: "ETC", img_url: "https://i.imgur.com/wZIJe9n.jpg"},
{ symbol: "IOTA", img_url: "https://cdn5.vectorstock.com/i/1000x1000/45/09/iota-coin-symbol-logo-vector-19194509.jpg"},
{ symbol: "ICX", img_url: "https://thecryptobase.io/wp-content/uploads/2018/02/Coin-Spotlight-Icon-ICX.jpg"},
{ symbol: "NEO", img_url: "https://upload.wikimedia.org/wikipedia/commons/0/07/NEO_%28cryptocurrency%29_logo.svg"},
{ symbol: "VEN", img_url: "https://d3npzzrehyahmo.cloudfront.net/images/b2/1f/b21f386ca8d0139fd901d45f76adf3a0_90697ca1033_t.png"},
{ symbol: "XLM", img_url: "https://www.stellar.org/wp-content/themes/stellar/images/stellar-rocket-300.png"
},
{ symbol: "QTUM", img_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Qtum_logo.svg/1135px-Qtum_logo.svg.png"
}]


def reformat_symbol(symbol)
  stock_split = symbol.split("")
  stock_split.pop
  stock_split.pop
  stock_split.pop
  stock_split.pop
  symbol = stock_split.join
  return symbol
end

def get_stocks_from_api
  response_string = RestClient.get('https://api.iextrading.com/1.0/stock/market/crypto')
  response_hash = JSON.parse(response_string)
  response_hash.each do |stock|
      newStock = Stock.new()
      newStock.symbol = stock["symbol"]
      newStock.name = stock["companyName"]
      newStock.category = stock["sector"]
      newStock.save
  end
end

def get_stock_data_from_api(symbol, id)

  symbol = reformat_symbol(symbol)

  response_string = RestClient.get("https://min-api.cryptocompare.com/data/histoday?fsym=#{symbol}&tsym=USD&limit=365")
  response_hash = JSON.parse(response_string)


  currentStock = Stock.all.find(id)
  # dumpArray = Marshal.dump(response_hash["Data"])
  priceArray = []

  response_hash["Data"].each do |day|
    priceArray << day["close"]
  end

  currentStock.price = priceArray
  currentStock.save

end

def  assign_img_url_to_stock(symbol, id)
  symbol = reformat_symbol(symbol)
  IMAGES.each do |image_object|
    if image_object[:symbol] === symbol
      stock = Stock.all.find(id)
      stock.image_url = image_object[:img_url]
      stock.save
    end
  end
end
