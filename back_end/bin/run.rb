require_relative "../lib/api_communicator.rb"

if Stock.all.length === 0
  get_stocks_from_api
end

Stock.all.each do |stock|
  if stock.price === nil
    get_stock_data_from_api(stock.symbol, stock.id)
  end

  if stock.image_url === nil
    assign_img_url_to_stock(stock.symbol, stock.id)
  end

end


'ping'
