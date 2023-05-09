const fakeData = [
{
  name: "Tasty's Diner",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '0900'}},
                  {close: {day: 1, time: '2300'}, open: {day: 1, time: '0900'}},
                  {close: {day: 2, time: '2300'}, open: {day: 2, time: '0900'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '0900'}},
                  {close: {day: 4, time: '2300'}, open: {day: 4, time: '0900'}},
                  {close: {day: 5, time: '2300'}, open: {day: 5, time: '0900'}},
                  {close: {day: 6, time: '2300'}, open: {day: 6, time: '0900'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipMspKv84sHdm7jSVZw_tWoLTzQN35y6eZD5RcLM=w408-h306-k-no",
  rating:4.1
},
{
  name: "Trattoria L'incontro",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  // {close: {day: 1, time: '2300'}, open: {day: 1, time: '1100'}},
                  {close: {day: 2, time: '2300'}, open: {day: 2, time: '1100'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  {close: {day: 4, time: '2300'}, open: {day: 4, time: '1100'}},
                  {close: {day: 5, time: '0030'}, open: {day: 5, time: '1100'}},
                  {close: {day: 6, time: '0030'}, open: {day: 6, time: '1100'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipMF8b8zEt6hh5qSvd3RId1OHMVorvXGkS98vMcy=w426-h240-k-no",
  rating:4.5
},
{
  name: "Taverna Kyclades",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  // {close: {day: 1, time: '2300'}, open: {day: 1, time: '1100'}},
                  {close: {day: 2, time: '2300'}, open: {day: 2, time: '1100'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  // {close: {day: 4, time: '2300'}, open: {day: 4, time: '1100'}},
                  {close: {day: 6, time: '0030'}, open: {day: 5, time: '1100'}},
                  {close: {day: 7, time: '0030'}, open: {day: 6, time: '1100'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipMWbsP2ZVuLtIaxj6tGx_FBqQtSOEkMAAnT8dMz=w408-h306-k-no",
  rating:4.8
},
{
  name: "Martha's Country Bakery",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  // {close: {day: 1, time: '2300'}, open: {day: 1, time: '1100'}},
                  // {close: {day: 2, time: '2300'}, open: {day: 2, time: '1100'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  {close: {day: 4, time: '2300'}, open: {day: 4, time: '1100'}},
                  {close: {day: 5, time: '0030'}, open: {day: 5, time: '1100'}},
                  {close: {day: 6, time: '0030'}, open: {day: 6, time: '1100'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipOBHCzJWoa4nbUtoiqELLO8P_GoAaXvxwUmwD82=w408-h306-k-no",
  rating:4.6
},
{
  name: "Sandro's",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  {close: {day: 1, time: '2300'}, open: {day: 1, time: '1100'}},
                  {close: {day: 2, time: '2300'}, open: {day: 2, time: '1100'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  {close: {day: 4, time: '2300'}, open: {day: 4, time: '1100'}},
                  {close: {day: 5, time: '0030'}, open: {day: 5, time: '1100'}},
                  {close: {day: 6, time: '0030'}, open: {day: 6, time: '1100'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipOn9cUm5OXiBxV3dW16YFRGKxZRPwOZYc5uhyo=w408-h280-k-no",
  rating:4.2
},
{
  name: "Starbucks",
  opening_hours: [{close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  {close: {day: 1, time: '2300'}, open: {day: 1, time: '1100'}},
                  {close: {day: 2, time: '2300'}, open: {day: 2, time: '1100'}},
                  {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  {close: {day: 4, time: '2300'}, open: {day: 4, time: '1100'}},
                  {close: {day: 5, time: '0030'}, open: {day: 5, time: '1100'}},
                  {close: {day: 6, time: '0030'}, open: {day: 6, time: '1100'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipPM7C17Db3cx7lZIuEhd2ms4RjSq15rEu-l188b=w408-h544-k-no",
  rating:3.4
},
{
  name: "Queens Library",
  opening_hours: [
                  // {close: {day: 0, time: '2300'}, open: {day: 0, time: '1100'}},
                  {close: {day: 1, time: '2000'}, open: {day: 1, time: '1000'}},
                  {close: {day: 2, time: '2000'}, open: {day: 2, time: '1000'}},
                  // {close: {day: 3, time: '2300'}, open: {day: 3, time: '1100'}},
                  {close: {day: 4, time: '2000'}, open: {day: 4, time: '1000'}},
                  {close: {day: 5, time: '1630'}, open: {day: 5, time: '1000'}},
                  {close: {day: 6, time: '1630'}, open: {day: 6, time: '1000'}},
                ],
  weekday_text: [ "Monday: 9:00 AM -- 11:00 PM",
                  "Tuesday: 9:00 AM -- 12:00 AM",
                  "Wednesday: 9:00 AM -- 12:00 AM",
                  "Thursday: 9:00 AM -- 12:00 AM",
                  "Friday: 9:00 AM -- 12:00 AM",
                  "Saturday: 9:00 AM -- 12:00 AM",
                  "Sunday: 9:00 AM -- 11:00 PM"],
  photo:  "https://lh5.googleusercontent.com/p/AF1QipPhGLcc2YEMfGMtbDvnqnuXqYF9dt-d9YIBQWZ2=w426-h240-k-no",
  rating:3.4
},
]

module.exports = fakeData
