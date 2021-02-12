mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';



var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.975050, 40.75], // starting position [lng, lat]
  zoom: 10.5 // starting zoom
});

// add a navigation control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');


// let's add a marker to the map
var marker = new mapboxgl.Marker({
  color: 'red'
})
  .setLngLat([-74.0060, 40.7128])
  .setPopup(new mapboxgl.Popup().setHTML("<h1>City Hall!</h1>")) // add popup
  .addTo(map);


// set up dummy data
var centralParkPoints = [
  {
    name: 'The Pond',
    point: [-73.974073,40.765843]
  },
  {
    name: 'Strawberry Fields',
    point: [-73.974803,40.775782]
  },
  {
    name: 'Dalehead Arch',
    point: [-73.978578,40.770726]
  }
]


centralParkPoints.forEach(function(centralParkPoint) {
  console.log(centralParkPoint.name, centralParkPoint.point)

  new mapboxgl.Marker()
    .setLngLat(centralParkPoint.point)
    .setPopup(new mapboxgl.Popup().setHTML(`<h1>${centralParkPoint.name}</h1>`)) // add popup
    .addTo(map);
})

// let's add our class pizza shop data to the map!!!

$.getJSON('./data/pizzashops.json', function(pizzaRows) {
  console.log(pizzaRows)

  pizzaRows.forEach(function(pizzaRow) {
    console.log(pizzaRow.name, pizzaRow.pizzashop)

    var html = `
      <div>
        <h3>${pizzaRow.pizzashop}</h3>
        <div>Submitted by ${pizzaRow.name}</div>
        <div><i>"${pizzaRow.message}"</i></div>
      </div>
    `

    // all non MUP and CUSP will be this color
    var color = 'green'

    if (pizzaRow.program === 'MUP') {
      color = 'purple'
    }

    if (pizzaRow.program === 'CUSP') {
      color = 'orange'
    }

    new mapboxgl.Marker({
      color: color
    })
      .setLngLat([pizzaRow.longitude, pizzaRow.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(html)) // add popup
      .addTo(map);
  })
})
