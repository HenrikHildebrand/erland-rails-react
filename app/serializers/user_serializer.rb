class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :beers

  def beers
    event = @instance_options[:event]
    {
        accepted: object.received_beers.for_event(event).accepted.count,
        not_accepted: object.received_beers.for_event(event).not_accepted.count
    }
  end
end
