FactoryBot.define do
    factory :user do
        trait :valid_user do
            email { Faker::Internet.email }
            password { "123456" }
            password_confirmation { "123456" }
        end
        trait :invalid_user do
            email { "my_email" }
            password { "123" }
            password_confirmation { "456" }
        end
    end
end