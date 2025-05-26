


mapboxgl.accessToken = mapToken; ;
console.log(mapboxgl.accessToken);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinate ||[-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});
const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 20 })
        .setLngLat(coordinate)
        .setPopup(new mapboxgl.Popup({offset:20})
        .setHTML(`<h6>${location1}</h6>`))
        .addTo(map);