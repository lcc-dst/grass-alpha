import L from 'leaflet';
import {
  GeoSearchControl,
  GoogleProvider,
} from 'leaflet-geosearch';

const provider = new GoogleProvider({ params: {
  key: 'AIzaSyCBVlC5gC-sL8gGtw1mU3onfL1e615XUPg',
} });

const searchControl = new GeoSearchControl({
  provider: provider,
});

const map = new L.Map('map');
map.addControl(searchControl);
var AFurl = "https://leicestershirecc-self.achieveservice.com/en/AchieveForms/?form_uri=sandbox-publish://AF-Process-8d78e1d9-dd1f-4b6f-922c-11726a0a29dc/AF-Stage-c8347d00-cbd8-4eb0-9188-97ac29777b1e/definition.json&redirectlink=%2F&cancelRedirectLink=%2F&category=AF-Category-33e8f99b-2cdf-4596-a6a9-7830e80a7192";

function onEachFeatureGrass(feature, layer) {

    if (feature.properties) {
        layer.bindPopup("<b>ROAD: </b>"+ feature.properties.ROAD_NAME + "<br>" + "<b>PARISH: </b>"+ feature.properties.PARISH + "<br>" + "<b>LAST CUT DATE: </b>"+ feature.properties.ROUTE_LAST_CUT_DATE + "<br>" + "<b>CUT STATUS: </b>"+ feature.properties.CUT_STATUS + "<br>" + "<a href="+ AFurl + "&streetRef=" + feature.properties.USRN + "&assetRef=" + feature.properties.CENTRAL_ASSET_ID + ">" + "Report an issue" + "</a>"); 
    }
}

function onEachFeatureIssue(feature, layer) {

    if (feature.properties) {
        layer.bindPopup("<b>CUT STATUS: </b>"+ "<br>" + feature.properties.CUT_STATUS); 
    }

}

var alertIcon = L.icon({
      iconUrl: 'img/error_red.png',
      iconSize: [36,36]
});

L.geoJson(blaby, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
L.geoJson(charnwood, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
L.geoJson(harborough, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
L.geoJson(melton, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
L.geoJson(nwlei, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
L.geoJson(oadby, {
  onEachFeature: onEachFeatureGrass
}).addTo(map);
var harboroughCluster = L.geoJson(harboroughQueries, {
  onEachFeature: onEachFeatureIssue,
  pointToLayer: function(feature,latlng){
    return L.marker(latlng,{icon: alertIcon});
    }
}).addTo(map);
var hinckCluster = L.geoJson(hinckQueries, {
  onEachFeature: onEachFeatureIssue,
  pointToLayer: function(feature,latlng){
    return L.marker(latlng,{icon: alertIcon});
    }
}).addTo(map);

var clusters = L.markerClusterGroup();
  clusters.addLayer(harboroughCluster);
  clusters.addLayer(hinckCluster);
  map.addLayer(clusters);
