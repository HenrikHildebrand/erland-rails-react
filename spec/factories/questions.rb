FactoryBot.define do
  factory :question do
    title { "Which of these numbers are largest?" }
    association :event, factory: [:valid_not_public_event], strategy: :create
    lat { 57.69850253087 }
    lng { 11.974941605476417 }
    factory :question_with_alternatives do
      transient do
        alternatives_count { 3 }
      end
      after(:create) do |question, evaluator|
        create_list(:alternative, evaluator.alternatives_count, question: question)
      end
    end
    trait :invalid_question do
      title { nil }
      event_id { nil }
    end
  end
end
