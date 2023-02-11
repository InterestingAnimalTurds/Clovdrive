
let lat;
let lon;
let weather_data;
let city_data_sand;
let city_data = 'none';





let intervals = 100;
let location_data = 'defaults';
let previousMillis = 0;
let Is_flip = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (geoCheck() == true) {
    //geolocation is available
  } else {
    //error getting geolocaion
  }
  
  location_data= getCurrentPosition(positionPing,positionError);
  sandbox();
}

function draw() {

  background(220, 0, 0);
  var height = document.body.clientHeight;
  var width = document.body.clientWidth;


  if(millis() - previousMillis > intervals )
    {
      if(lat,lon != undefined)
      {

      let new_position= get_nextPosition_bywind(lat, lon, 1, 45); 
      lat = new_position[0];
      lon = new_position[1];
      city_data = get_city_name(lat,lon);
      }
      previousMillis = millis();
      console.log(city_data_sand);
      
    }
    //console.log(city_data_sand);
    present_information(lat,lon);


    


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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




function present_information(latitude, longitude)
{
  fill(0, 0, 0);
  textSize(50);
  text(latitude, 0, 0, width, 200);
  text(longitude, 0, 200, width, 200);
  textSize(20);
  text(city_data_sand,0,400,width,200);

}





function weatherBalloon(latt, lon) {


  var key = 'e59d35e84e22db39354017adef3c9b23';
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latt + '&lon=' + lon + '&appid=' + key)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
      console.log(data);
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

      var angle;

      if( (latitude >= 90) || (latitude <= -90) || (longitude >= 180) ||(longitude <= -180) )
      {
        Is_flip++;
      }
      else
      {

      }
      if(Is_flip%2 == 0)
      {

        angle = bearing;
        Is_flip = Is_flip%2;

      }
      else
      {
        angle = (bearing + 180) % 360;
        Is_flip = Is_flip%2;
      }  
      let lat = latitude + 90;
      let lon = longitude + 180;
      var point = turf.point([lat, lon]);
      var distance = distance;
      
      var options = {units: 'kilometers'};
      
      
      var destination = turf.destination(point, distance, angle, options);
      // Coords back to degrees and return
      
      console.log(destination);
     
      let lat_o = destination.geometry.coordinates[0]- 90;
      let lon_o = destination.geometry.coordinates[1] - 180;
      
      if(lat_o >= 90)
      {
        lat_o = 90;
      }
      else if(lat_o <= -90)
      {
        lat_o = -90;
      }
      else
      {

      }
      if(lon_o >= 180)
      {
        lon_o = 180;
      }
      else if(lon_o <= -179.999)
      {
        lon_o = -180;
      }
      else
      {

      }
      //return [destination.geometry.coordinates[0]-90,destination.geometry.coordinates[1]-180];

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
