let latitude,longitude,destination

$(document).ready(function(){
    alert("please allow the device to know your location")
    initGeolocation();
})

$(function(){
    $("#navigate-button").click(function(){
        window.location.href=`ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success)
    }
    else{
        alert("sorry, your browser does not support geolocation sevices")
    }
}

function success(position){
    longitude=position.coords.longitude
    latitude=position.coords.latitude

mapboxgl.accessToken='pk.eyJ1Ijoic2FpZHRoZWNvZGVyIiwiYSI6ImNsMGxwaDE4bDB5bWczaW90Y2VubG4zZnIifQ.-GRGzF8sbP8HBQlx1rAz2A'
var map=new mapboxgl.Map({
    container:'map',
    style:'mapbox://styles/mapbox/streets-v11',
    center:[latitude,longitude],
    zoom:16
})

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions:{
            enableHighAccuracy:true
        },
        trackUserLocation:true
    })
)

map.addControl(
    new MapboxDirections({
        accesssToken:mapboxgl.accessToken
    }),
    'top-left'
)

map.on('click',function(e){
    destination=e.lngLat
})
}