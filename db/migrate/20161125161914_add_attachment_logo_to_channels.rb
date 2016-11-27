class AddAttachmentLogoToChannels < ActiveRecord::Migration
  def self.up
    change_table :channels do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :channels, :logo
  end
end
