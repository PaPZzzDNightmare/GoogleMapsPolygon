$(document).ready(() => {

    // This example requires the Drawing library. Include the libraries=drawing
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 10
    })

    // get current location
    const infoWindow = new google.maps.InfoWindow
    let marker;
    const geocoder = new google.maps.Geocoder
    let pos = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        }
    }

    console.log(pos)
   ÷
    // drawingManager.setMap(map);

})

function addMarkerListener(marker){
   
}

function markerCoords(markerobject){
    google.maps.event.addListener(markerobject, 'dragend', function(evt){
        infoWindow.setOptions({
            content: '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>'
        });
        infoWindow.open(map, markerobject);
    });

    google.maps.event.addListener(markerobject, 'drag', function(evt){
        console.log("marker is being dragged");
    });     
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
