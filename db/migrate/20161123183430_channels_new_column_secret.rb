class ChannelsNewColumnSecret < ActiveRecord::Migration
  def change
  	add_column :channels, :secret, :string
  end
end
