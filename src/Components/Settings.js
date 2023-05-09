import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Settings = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const googleTypes = ["amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "cafe","car_wash", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "department_store", "doctor", "drugstore", "electronics_store",
  "florist", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "home_goods_store", "hospital", "laundry", "lawyer", "library", "liquor_store", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_theater", "museum", "park", "parking", "pet_store", "pharmacy", "primary_school", "restaurant", "school", "shoe_store", "shopping_mall", "spa", "stadium", "store", "supermarket", "tourist_attraction", "university", "zoo"];

  const formattedTypes = ["Amusement Parks", "Aquariums", "Art Galleries", "ATMs", "Bakeries", "Banks", "Bars", "Beauty Salons", "Bicycle Stores", "Book Stores", "Bowling Alleys", "Cafes","Car Washes", "Churches", "City Halls", "Clothing Stores", "Convenience Stores", "Courthouses", "Department Stores", "Doctors", "Drugstores", "Electronics stores", "Florists", "Furniture Stores", "Gas Stations", "Gyms", "Hair Care", "Hardware Stores", "Home Goods Stores", "Hospitals", "Laundromats", "Lawyers", "Libraries", "Liquor Stores", "Lodgings", "Meal deliveries", "Meal Takeaway", "Mosques", "Movie Theaters", "Museums", "Parks", "Parkings", "Pet Stores", "Pharmacies", "Primary schools", "Restaurants", "Schools", "Shoe Stores", "Shopping Malls", "Spas", "Stadiums", "Stores", "Supermarkets", "Tourist Attractions", "Universities", "Zoos"];
  
  

  return (
    <div id= 'settingsPage'>
      No settings.
      
    </div>
  );
};

export default Settings;
