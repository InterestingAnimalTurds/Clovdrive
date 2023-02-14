
let lat =0;
let lon = 0;
let weather_data;
let city_data_sand;
let city_data = 'none';
let pos;
//Access token

let reach_North_South = 0;

let log_counts = 0;

const access_key = 'pk.eyJ1IjoiY3h1OCIsImEiOiJjbGR6OWhieHoweXVqM29xZmhsMDR6eWh3In0.AwQD_vttC331CvQl7CCFAg';

//Mapbox style
const style = "mapbox://styles/cxu8/cldz9p9qb000201qdaia0wcjr";

// Options for map
const options = {  
  lat: lat,
  lng: lon,
  zoom: 1,
  style: style,
};

const mappa = new Mappa('MapboxGL', access_key);  
let myMap;


let intervals = 10;
let location_data = 'defaults';
let previousMillis = 0;
let Is_flip = 1;
let wind_data
function preload()
{

  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  if (geoCheck() == true) {
    //geolocation is available
  } else {
    //error getting geolocaion
  }
  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);

  location_data= getCurrentPosition(positionPing,positionError);
  myMap.overlay(canvas);
  sandbox();
  
}

function draw() {

  if(reach_North_South == 10)
  {
    reach_North_South = 0;
  }

  var height = document.body.clientHeight;
  var width = document.body.clientWidth;
  
  clear();
  tempfunc_data();
    //console.log(city_data_sand);\
  layer_background();
  

  const nigeria = myMap.latLngToPixel(lat, lon); 
  fill(255,255,0);
  ellipse(nigeria.x, nigeria.y, 20, 20);
  
  log_counts++;

 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let wind_on_file;
let mycounts = 0;
let wind_check_interval = 10000;
let wind_previousMillis = 0
function get_wind_data()
{
  if((millis() - wind_previousMillis > wind_check_interval)|| (millis()< 2000))
  {
    if(mycounts <= 1000)
    {
    weatherBalloon(lat, lon);
    if(wind_speed == 0 || wind_deg == 0)
    {
      wind_speed = random(1, 4);
      wind_deg = random(10,358);
    }
    console.log('speed:   '+ wind_speed + '   deg:   ' + wind_deg);
    mycounts++;
    }
    else
    {
      wind_data = 100; 
    }
    wind_previousMillis = millis();
  }
 
}


function tempfunc_data()
  {  
    if(millis() - previousMillis > intervals )
    {
      if(lat,lon != undefined)
      {
        get_wind_data();
      // let new_position= get_nextPosition_bywind(lat, lon, 50, 45); 
      let new_position= get_nextPosition_bywind(lat,lon,wind_speed/100,wind_deg);
      lat = new_position[0];
      lon = new_position[1];
      previousMillis = millis();
      //console.log(city_data_sand);
      }
    }
    // }
}


function layer_background()
{
  //background(220, 0, 0);
  // fill(100,0,0,50)
  // rect(0,0,0.2 * width, 0.2 * height);
  //ellipse(pos.x, pos.y, 100, 100);
  // sphere(40);
  present_information();

}


function sandbox()
{



  

}

function positionPing(position) {
  // print("lat: " + position.latitude);
  // print("long: " + position.longitude);
  // lat = position.latitude;
  // lon = position.longitude;
  // weather_data = weatherBalloon(lat, lon);
  lat = position.latitude;
  lon = position.longitude;
  print(position.latitude);
  print(position.longitude);

  console.log("sucessed in loc");
}
function positionError(position) {
  // print("lat: " + position.latitude);
  // print("long: " + position.longitude);
  // lat = position.latitude;
  // lon = position.longitude;
  // weather_data = weatherBalloon(lat, lon);
  console.log("failed in loc");
}




function present_information()
{

  fill(0, 0, 0);
  textSize(50);
  text(lat, 0.2*width, 0.2*height, width,300);
  text(lon, 0.2*width, 0.4*height, width,300);
}


let wind_speed = 0;
let wind_deg = 0;


function weatherBalloon(latt, lon) {


  var key = 'e59d35e84e22db39354017adef3c9b23';
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latt + '&lon=' + lon + '&appid=' + key)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      wind_speed = data.wind.speed;
      wind_deg = data.wind.deg;
      console.log(data)
      return data;
    })
    .catch(function () {
      // catch any errors

    });
  

}


  function speedunit_transfer(calculate_interval, speed)
  {
    let hr = 60*60*1000;
    let time  = calculate_interval/hr;
    let distance = speed * time;
    return distance;
  }

  function get_nextPosition_bywind(latitude, longitude, distance, bearing) 
  {
    // || 
      let angle = bearing;
      // ||(latitude <= -90) || 
      if(latitude >= 89)
      {
        reach_North_South++;
        latitude = 89;
        longitude = -longitude;
      }
      else if(latitude <= -89)
      {
        reach_North_South++;
        latitude = -89;
        longitude = -longitude;
      }
      else
      {

      }
      if((reach_North_South%2 == 0))
      {
        if((angle >= 0) &&(angle <=180))
        {
          angle = 0 + angle;
        }
        else if((angle > 180) && (angle <270))
        {
          angle = 0 + angle;
        }
        else if((angle >= 270)&&(angle <360))
        {
          angle = 0 + angle;
          
        }
        else if(angle == 360)
        {
          angle = 0+ angle;
          longitude = longitude;
        }
      }
      else
      {
        if((angle >= 0) && (angle <90))
        {
          angle = 180 - bearing;
        }
        else if((angle >= 90) && (angle <180))
        {
          angle = 90-(bearing - 90);
        }
        else if((angle > 180) && (angle <270))
        {
          angle = 360 - (bearing - 180);
        }
        else if((angle >= 270)&&(angle <360))
        {
          angle = 180 + (360 - bearing);
        }
        else if(angle == 360)
        {
          angle = 180 + (360 - bearing);
          
        }
        else
        {

        }
      }

      // if(longitude >= 180)
      // {
      //   longitude_flag = true;
        
      // }
      // if(longitude_flag == true)
      // {
      //   angle = angle+180;
      //   longitude_flag = false;
      // }
      // else
      // {

      // }
      var point = turf.point([longitude,latitude]);
      
      var options = {units: 'kilometers'};
      
      var destination = turf.destination(point,distance,angle,'kilometers');
      // Coords back to degrees and return
      
      console.log(destination);
     
      let lon_o = destination.geometry.coordinates[0];
      let lat_o = destination.geometry.coordinates[1];

      if(lon_o >= 180)
      {
        lon_o = -180;
      }
      else if(lon_o <= -180)
      {
        lon_o = 180;
      }
      else
      {

      }
      //return [destination.geometry.coordinates[0]-90,destination.geometry.coordinates[1]-180];
      console.log(destination);
      console.log("angle: " + angle);
      console.log(lat_o + "," + lon_o);
      return ([lat_o,lon_o]);
    
    }


    function get_city_name(lat,lon)
    { 
      let key = "AIzaSyDxdu9rnLSKbBttTjuADKjr44uz40QLPO4";
      fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +lat + ',' + lon + "&key=" + key)
      .then(function (resp) { return resp.json() }) // Convert data to json
      .then(function (data) {
        //console.log(data);
        city_data_sand = data.results[0].formatted_address;
        return data;
      })
      .catch(function () {
        // catch any errors
      });
  

    }

    function numberToRadius(number) {
      return number * Math.PI / 180;
    }
  
    function numberToDegree(number) {
      return number * 180 / Math.PI;
    }
  
