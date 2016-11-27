class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :channel
  validates :body, presence: true
end
