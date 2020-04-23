class ApplicationSerializer < ActiveModel::Serializer
  ActiveModelSerializers.config do |c|
    # according to documentation, :unaltered gives a performance boost
    # since it do not convert underscores to dashes
    c.key_transform = :unaltered
  end
end