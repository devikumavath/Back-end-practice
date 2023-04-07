// console.log('hello from the client side');


export const displayMap = (locations) => {

  mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV2aWt1bWF2YXRoIiwiYSI6ImNsZzU1bG82MTAwYTczZXRpYXVpcTJidGMifQ.tJtO4cVGq5jrmJIC7jE2Fw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/devikumavath/clg55xqie000k01qxoxl33ruw',
  scrollZoom: false
  //   center : [34.111745 , -118.113491] ,
  //   zoom : 10 ,
  //   interactive : false
});

const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });



}


