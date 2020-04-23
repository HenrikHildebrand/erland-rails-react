class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :invite_only, :is_public, :initial_credits, :is_admin,
             :is_collaborator, :admin_id, :total_event_expenses

  has_many :participants
  has_many :collaborators

  def is_admin
    object.admin == current_user
  end

  def is_collaborator
    object.collaborators.include?(current_user)
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

  def total_event_expenses
    object.expenses.sum(:grand_total)
  end

end