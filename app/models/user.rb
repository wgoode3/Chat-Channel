class User < ActiveRecord::Base
  has_many :channels, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :username, presence: true
  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  has_secure_password
  #has_attached_file :avatar
  has_attached_file :avatar, styles: { thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
end
