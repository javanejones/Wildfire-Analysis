
 // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  //["Incident name"] instead of .incident
  function popUpMsg(feature, layer) {
    layer.bindPopup("<h3>" + "Incident Name:" +feature.properties.Incident  +
      "</h3><hr><p>"+ "County:"+ feature.properties.County +"<br>"+ "Location:" + feature.properties.Location+"<br>" + "Year:" + feature.properties.StartYear +"<br>" + "Acres Burned:" + feature.properties.Acresburned+ "</p>");
  }

     //  Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap,
  "Sateliite Map": satellite
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [39.5501, -105.7821],
  zoom: 5,
  layers: [streetmap]     //default selected layer
  });

 // Add streetmap tile to map; if only one tile defined then this is a good way of doing this.
// If only one tile layer then the following will be used "L.control.layers(null, overlayMaps, " later in the code

streetmap.addTo(myMap);

// create layer; will attach data later on
var wildfires = new L.LayerGroup();
// Alternate method and same as above
// var earthquakes = L.layerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {
  "2020 Wildfires": wildfires
};

var overlayMap = {
  "Active Wildfires": wildfires
};
// Create a layer control
// Pass in our baseMaps and overlayMaps

L.control.layers(baseMaps, overlayMaps, overlayMap, {
  collapsed: false
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "static/data/fire.geojson";

// Perform a GET request to the query URL
d3.json(link, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  // var year = filter(function(data){
  //     return data.feature.properties.Started == '2020';
  // });
  
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  L.geoJSON(data, {
    // pointToLayer: function (feature, latlng) {
    //   return new L.CircleMarker(latlng, {
    //     radius: 3,     // radius(magnitude) is a magnitude and can cause the radius size of the circle changed based on a variable
    //     fillOpacity: 0
    //   });

    // },
    onEachFeature: popUpMsg,
    filter: function(feature, layer){
      return (feature.properties.StartYear == '2020')
    }
    
  }).addTo(wildfires);

  wildfires.addTo(myMap);

  // console.log(data)


});

    
//#filter 
// for (var i = 0; i < data.length; i++) {
//   // if (data[i].data_year >= 2000 ) {
//     // && Number(data[i].site_eui_kbtu_sq_ft)<=500
//     var dataItem = data[i];
//     var cases = Number(dataItem.value)/100000;

//       name.push(dataItem.name);
//       value.push(cases);
//       year.push(parseInt(dataItem.year));  
//       population.push(parseInt(dataItem.population));
//       if (!yearTypes.includes(data[i].year)) {
//         yearTypes.push(data[i].year)
//       }           
//   // }
// }

// another filter
// .filter(function (i,n){
//   return n.website==='google';
// });
