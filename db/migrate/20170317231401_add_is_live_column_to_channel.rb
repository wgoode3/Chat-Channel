class AddIsLiveColumnToChannel < ActiveRecord::Migration
  def change
    add_column :channels, :is_live, :boolean
  end
end
