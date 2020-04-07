class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :invite_only, :public, :initial_credits, :is_admin, :is_collaborator

  has_many :participants
  has_many :collaborators
  has_many :questions
  has_many :facts
  # attribute :collaborators, each_serializer: UserSerializer

  has_many :songs

  def facts
    object.facts.shuffle.collect {|f| {headline: f.headline, text: f.text}}
  end

  def is_admin
    object.admin == current_user
  end

  def is_collaborator
    object.collaborators.include?(current_user)
  end

  def songs
    object.songs.collect do |s|
      {
          id: s.id,
          title: s.title,
          text: s.text,
      }
    end
  end

  def participants
    object.participants.collect do |p|
      {
        id: p.id,
        name: p.name,
        email: p.email,
        image: p.image,
        beers: {
          accepted: p.received_beers.for_event(object).accepted.count,
          not_accepted: p.received_beers.for_event(object).not_accepted.count
        }
      }
    end
  end

  def questions
    object.questions.collect do |q|
      {
          id: q.id,
          title: q.title,
          position: {lat: q.lat, lng: q.lng},
          alternatives: q.alternatives.shuffle.collect {|a| a.title }
      }
    end
  end

end
