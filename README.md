# Back-end-practice

This repo contains practice code of the Udemy course - Node.js, Express, MongoDB &amp; More: The Complete Bootcamp 2023 by jonas schmedtmann

# Natours

This full stack web application is specially designed for persons who love travelling and going on tour vacations.

## Overview

This web application allows it's users to book tour vacations.

A tour refers to a series of locations, specially picked to excite the adventurous spirit of the individual who books it.

A visiting user who has not yet created an account on the app can simply see all the current tours as well as detailed information about each tour.

Once signed up or logged in, they can then book any tour of their choice.

Users can write only one review for any tour they book.

## IMPORTANT Note 

**This repository contains practice  code  section wise from section 2 to 13 while  I followed along with Jonas schmedtmann  so basically this repository is not only having natours project but also  node farms and java script code**

If you want to see final result of Two projects which i built during this Course then for that i have created seprate GitHub repository with Readme file . you can check out using below link  👇 

 [Natours Project ✈](https://github.com/devikumavath/Natours-Time-to-travel)



## Main Tools And Technologies Used

- HTML (Create the structure and content of the web pages).
- CSS (Styling of the web pages).
- PUG (Template engine for generating the web pages dynamically).
- JAVASCRIPT (Interactivity, as well as making requests to the API from the client-side).
- NODE (Run JavaScript code on the server-side).
- EXPRESS (Node framework, meant to simplify the process of building complex server-side applications).
- MONGODB (Database for data persistence).
- MONGOOSE (Interacting with mongodb).
- MAPBOX (Displaying the different locations of each tour).
- STRIPE (Making payments on the app).
- JSON WEB TOKEN (Authenticating users)
- NODEMAILER (Sending emails to users of the app)
- MAILTRAP (Trapping the emails we send in our development environment, so they don't actually get sent to the user's email address)
- SENDGRID (Sending actual emails to the users in production).

## Main Features

- [Users](#users)
- [Tours](#tours)
- [Bookings](#bookings)
- [Reviews](#reviews)

## Users

- Users can sign up with the application.
- Users can log into the application.
- Users can log out of the appication.
- Users can update their password.
- Users can reset their password
- Users can update their general information.
- Users can see their profile page.
- A user can be either a regular user or an admin or a lead-guide or a guide.
- When you sign up, you are a regular user by default.

## Tours

- Tours can be created by an admin user or a lead-guide.
- Tours can be seen by every user.
- Tours can be updated by an admin user or a lead-guide.
- Tours can be deleted by an admin user or a lead-guide.

## Bookings

- Only regular users can book tours (make a payment).
- Regular users can not book thesame tour twice.
- Regular users can see all the tours thay have booked.
- An admin user or a lead-guide can see every booking on the app.
- An admin user or a lead-guide can delete any booking.
- An admin user or a lead-guide can create a booking (manually, without payment).
- An admin user or a lead-guide can not create a bookng for thesame user twice.
- An admin user or a lead-guide can edit any booking.

## Reviews

- Only regular users can write reviews for tours which they have booked.
- All users can see the reviews of each tour.
- Regular users can edit and delete their own reviews.
- Regular users can not review thesame tour twice.
- An admin can delete any review.
