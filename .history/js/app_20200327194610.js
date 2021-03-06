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
    let pos;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            pos = [
                {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            ]
            zoomToLocation()
            createMarkerAtPosition()
        })
    }else{
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    function zoomToLocation(){
        map.setCenter(pos[0])
    }

    function createMarkerAtPosition(){
        marker = new google.maps.Marker({
            map: map,
            position: pos[0],
            draggable: true, 
            title: "Drag me!"
        })
        marker.addListener('drag', (event) => {
            setInputText(event.latLng.lat(), )
        })
    }

    function setInputText(event){
        $("#selected-field-input").val( + ', ' + event.latLng.lng())
    }
    

    console.log(pos)
    // if(navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition( (position) => {
    //         pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         }
    //         marker = new google.maps.Marker({
    //             map: map,
    //             position: pos,
    //             draggable: true,
    //             title:"Drag me!"
    //         })
    //         map.setCenter(pos)
            
    //         map.addListener('click', (event) => {
    //             marker.setMap(null) //remove the marker
    //             marker = new google.maps.Marker({
    //                 map: map,
    //                 position: pos, 
    //                 draggable: true, 
    //                 title: 'Drag me'
    //             })
    //             marker.addListener('drag', (event) => {
    //                 $("#selected-field-input").val(event.latLng.lat() + ', ' + event.latLng.lng())
    //             })
    //             marker.addListener('dragend', (event) => {
    //                 $("#selected-field-input").val(event.latLng.lat() + ', ' + event.latLng.lng())
    //             })
    //         })
    //         $("#selected-field-input").val(pos.lat + ", " + pos.lng)

    //         marker.addListener('drag', (event) => {
    //             $("#selected-field-input").val(event.latLng.lat() + ', ' + event.latLng.lng())
    //         })
    //         marker.addListener('dragend', (event) => {
    //             $("#selected-field-input").val(event.latLng.lat() + ', ' + event.latLng.lng())
    //         })
            
    //     }, () => {
    //         handleLocationError(true, infoWindow, map.getCenter())
    //     })
    // }else{
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }
    // var drawingManager = new google.maps.drawing.DrawingManager({
    //     drawingMode: google.maps.drawing.OverlayType.MARKER,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: google.maps.ControlPosition.TOP_CENTER,
    //         drawingModes: [
    //             // 'marker', 
    //             // 'circle', 
    //             'polygon', 
    //             // 'polyline', 
    //             // 'rectangle'
    //         ]
    //     },
    //     markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    //     circleOptions: {
    //         fillColor: '#ffff00',
    //         fillOpacity: 1,
    //         strokeWeight: 5,
    //         clickable: false,
    //         editable: true,
    //         zIndex: 1
    //     }
    // });
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
