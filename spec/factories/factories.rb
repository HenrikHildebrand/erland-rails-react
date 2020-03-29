FactoryBot.define do
    service_array = ["Test Service", "Test Service Two"]
    letter = ["a", "b", "c", "d"]
    factory :random_question, class: Event do
        question { Faker::Lorem.question }
        answer { Faker::Lorem.sentence }
        service { service_array.sample }
    end
end