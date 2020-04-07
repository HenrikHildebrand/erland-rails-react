class Song < ApplicationRecord
    has_and_belongs_to_many :events, :class_name => 'Event'

    after_initialize :init

    private
    def init
       self.public ||= true
    end
end