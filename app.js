let lat1 = null;
let lon1 = null;
let lat2 = null;
let lon2 = null;
let x = null;
let y = null;
let totalDistance = 0;
let samples = 0;
let distanceInASecond = 0;

if ('geolocation' in navigator) {
    
    setInterval(function() {
        
        const options = {
          enableHighAccuracy: true
        };
    
        navigator.geolocation.getCurrentPosition((position) => {
            if(lat1 == null && lon1 == null) {
                lat1 = position.coords.latitude;
                lon1 = position.coords.longitude;
            } else if(lat1 != null && lon1 != null) {
                lat2 = position.coords.latitude;
                lon2 = position.coords.longitude;
                let distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
                
                if(samples == 0) {
                    x = lat1;
                    y = lon1;
                } else if(samples == 1000) {
                   let distanceInASecond = getDistanceFromLatLonInKm(x, y, lat2, lon2) * 1000; 
                   document.getElementById('speed').innerHTML = Math.round(distanceInASecond) + ' m/s';   
                   samples = 0;
                }
                
                
                lat1 = null;
                lon1 = null;
                lat2 = null;
                lon2 = null;
                
                totalDistance = totalDistance + distance;
                document.getElementById('distance').innerHTML = Math.round(totalDistance * 1000) + ' m';
                
                samples++;
            }
        }, error, options);
        
    }, 1);
    
} else {
    alert('Geolocation is not available');
}

function error() {
    alert("Sorry, an error occured.");
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}    
            
       