FactoryBot.define do
  factory :alternative do
      title { Faker::Number.between(from: 1, to: 100000) }
      correct { false }
    trait :single do
      association :question, factory: [:question], strategy: :create
    end
    trait :multiple do
      question
    end
  end
end