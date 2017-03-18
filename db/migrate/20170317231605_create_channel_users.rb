class CreateChannelUsers < ActiveRecord::Migration
  def change
    create_table :channel_users do |t|
      t.references :channel, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.boolean :follower
      t.boolean :mod
      t.boolean :ban
      t.datetime :ends

      t.timestamps null: false
    end
  end
end
