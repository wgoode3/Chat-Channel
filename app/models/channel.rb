class Channel < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :channel_users, dependent: :destroy
  validates :name, :description, presence: true
  has_attached_file :logo, styles: { thumb: "200x200>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :logo, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
end
