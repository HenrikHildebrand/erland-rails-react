FactoryBot.define do
  factory :answer do
    association :user, factory: [:user, :valid_user], strategy: :create
    trait :single do
      association :alternative, factory: [:alternative, :single], strategy: :create
    end
  end
end