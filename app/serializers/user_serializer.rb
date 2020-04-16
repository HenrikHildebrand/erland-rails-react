class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image, :beers

  def beers
    event = @instance_options[:event]
    if event
      {
          accepted: object.received_beers.for_event(event).accepted.count,
          not_accepted: object.received_beers.for_event(event).not_accepted.count
      }
    else
      {
          accepted: object.received_beers.accepted.count,
          not_accepted: object.received_beers.not_accepted.count
      }
    end
  end
end
