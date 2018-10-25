class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :symbol
      t.string :price
      t.string :image_url
      t.integer :portfolio_id
      t.string :category

      t.timestamps
    end
  end
end
