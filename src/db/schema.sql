-- Users
CREATE TABLE users (user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, target INT DEFAULT 2400);

-- Daily Goals
CREATE TABLE days (id SERIAL PRIMARY KEY, day_id UUID NOT NULL UNIQUE, user_id UUID REFERENCES users(user_id) ON DELETE CASCADE, date DATE NOT NULL, calories_consumed INT DEFAULT 0, goal_met BOOLEAN DEFAULT false);
ALTER TABLE days ADD CONSTRAINT unique_user_date UNIQUE (user_id, date); -- allow only 1 user and 1 day combination

-- Weekly Summary
CREATE TABLE weeks (id SERIAL PRIMARY KEY, week_id UUID NOT NULL UNIQUE, user_id UUID REFERENCES users(user_id) ON DELETE CASCADE, start_date DATE NOT NULL, end_date DATE NOT NULL, daily_goals_met JSONB DEFAULT '{"0": false, "1": false, "2": false, "3": false, "4": false, "5": false, "6": false}');

-- Meals
CREATE TABLE meals (id SERIAL PRIMARY KEY, meal_id UUID NOT NULL UNIQUE, day_id UUID NOT NULL, meal_type VARCHAR(100) NOT NULL, meal_description VARCHAR(255) NOT NULL, calories NUMERIC NOT NULL, items JSONB);
ALTER TABLE meals ADD COLUMN user_id UUID REFERENCES users(user_id) ON DELETE CASCADE;
ALTER TABLE meals ADD CONSTRAINT unique_meal_id UNIQUE (day_id, meal_id);