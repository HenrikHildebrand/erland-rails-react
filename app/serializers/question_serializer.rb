class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :lat, :lng, :event_id, :alternatives
  belongs_to :event
  # has_many :alternatives
  # has_many :answers, through: :alternatives

  def answers
    object.answers.collect do |a|
      {
        id: a.id,
        user_id: a.user_id,
        alternative_id: a.alternative_id
      }
    end
  end

  def alternatives
    object.alternatives.collect do |a|
      {
        id: a.id,
        title: a.title,
        correct: a.correct
      }
    end
  end
end
