
create database finoguide;
use finoguide;
create table users(
    user_id int auto_increment primary key,
    user_name varchar(20),
    user_emailid varchar(50),
    user_token varchar(256)
);
create table incomes(
    income_id int auto_increment primary key,
    income_source varchar(50),
    income_amount int,
    income_month int,
    income_year int,
    income_create_date date,
    user_id int,
    foreign key(user_id) references users(user_id)

);
create table expenditures(
    expenditure_id int auto_increment primary key,
    expenditure_name varchar(50),
    expenditure_amount int,
    expenditure_month int,
    expenditure_year int,
    expenditure_created_date date,
    user_id int ,
    foreign key(user_id) references users(user_id)

);
create table emis(
    emi_id int auto_increment primary key,
    emi_name varchar(50),
    emi_startdate date,
    emi_installent_amount int,
    emi_installent_type varchar(15),
    emi_duration int,
    emi_duration_type varchar(15),
    emi_create_date date,
    user_id int,
    foreign key(user_id) references users(user_id)

);
create table goals(
    goal_id int auto_increment primary key,
    goal_name varchar(30),
    goal_reason varchar(100),
    goal_target_date date,
    goal_created_date date,
    goal_amount int,
    user_id int,
    foreign key(user_id) references users(user_id)

);
create table savings(
    saving_id int auto_increment primary key,
    saving_month int,
    saving_year int,
    saving_amount int,
    saving_transaction_type varchar(50),
    saving_created_date date,
    user_id int,
    foreign key(user_id) references users(user_id)
--ADD AUTO CREDIT REMAINING AMOUNT TO SAVINGS
);
