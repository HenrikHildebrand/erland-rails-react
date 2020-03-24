# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_24_175118) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_admin_managed_resources", force: :cascade do |t|
    t.string "class_name", null: false
    t.string "action", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["class_name", "action", "name"], name: "active_admin_managed_resources_index", unique: true
  end

  create_table "active_admin_permissions", force: :cascade do |t|
    t.integer "managed_resource_id", null: false
    t.integer "role", limit: 2, default: 0, null: false
    t.integer "state", limit: 2, default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["managed_resource_id", "role"], name: "active_admin_permissions_index", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", limit: 2, default: 0, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "alternatives", force: :cascade do |t|
    t.string "title"
    t.boolean "correct"
    t.bigint "question_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_alternatives_on_question_id"
  end

  create_table "answers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "alternative_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["alternative_id"], name: "index_answers_on_alternative_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "beer_packages", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "sender_id"
    t.bigint "receiver_id"
    t.boolean "accepted"
    t.datetime "accepted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_beer_packages_on_event_id"
    t.index ["receiver_id"], name: "index_beer_packages_on_receiver_id"
    t.index ["sender_id"], name: "index_beer_packages_on_sender_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.datetime "date"
    t.bigint "admin_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "invite_only"
    t.boolean "public"
    t.integer "initial_credits"
    t.index ["admin_id"], name: "index_events_on_admin_id"
  end

  create_table "events_collaborators", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "event_id"
    t.index ["event_id"], name: "index_events_collaborators_on_event_id"
    t.index ["user_id"], name: "index_events_collaborators_on_user_id"
  end

  create_table "events_participants", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "event_id"
    t.index ["event_id"], name: "index_events_participants_on_event_id"
    t.index ["user_id"], name: "index_events_participants_on_user_id"
  end

  create_table "events_songs", id: false, force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "song_id", null: false
    t.index ["song_id", "event_id"], name: "index_events_songs_on_song_id_and_event_id", unique: true
  end

  create_table "facts", force: :cascade do |t|
    t.string "title"
    t.string "headline"
    t.string "text"
    t.bigint "event_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_facts_on_event_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.float "lat", default: 57.69850253087
    t.float "lng", default: 11.974941605476417
    t.bigint "event_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_questions_on_event_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "title"
    t.string "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "public"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token", limit: 30
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.text "image"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "wallets", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "user_id", null: false
    t.integer "credits"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id", "user_id"], name: "index_wallets_on_event_id_and_user_id", unique: true
    t.index ["event_id"], name: "index_wallets_on_event_id"
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "alternatives", "questions"
  add_foreign_key "answers", "alternatives"
  add_foreign_key "answers", "users"
  add_foreign_key "beer_packages", "events"
  add_foreign_key "beer_packages", "users", column: "receiver_id"
  add_foreign_key "beer_packages", "users", column: "sender_id"
  add_foreign_key "events", "users", column: "admin_id"
  add_foreign_key "questions", "events"
  add_foreign_key "wallets", "events"
  add_foreign_key "wallets", "users"
end
