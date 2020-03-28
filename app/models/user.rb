class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, :omniauth_providers => [:facebook]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :answers
  has_many :wallets
  has_many :sent_beers, :class_name => 'BeerPackage', :foreign_key => 'sender_id'
  has_many :received_beers, :class_name => 'BeerPackage', :foreign_key => 'receiver_id'

  has_many :events, class_name: 'Event', foreign_key: 'admin_id', dependent: :nullify
  has_and_belongs_to_many :events_as_participant, join_table: :events_participants, class_name: 'Event'
  has_and_belongs_to_many :events_as_collaborator, join_table: :events_collaborators, class_name: 'Event'

  # TODO
    # implement that user can only belong to one event_id
  
  def display_name
    email
  end
  
  # Facebook stuff

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
    end
  end
end
