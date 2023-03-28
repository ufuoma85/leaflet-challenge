
let baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a get request to the baseURL send the features once we get a response
d3.json(baseURL).then(function (data) {
    createFeatures(data.features);
});

// Define a function that we want to run once for each feature in the features array.
// Give each feature a popup that describes the place and time of the earthquake.

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Number of "Felt" Reports: ${feature.properties.felt}`);

        // Create a GeoJSON layer that contains the features array on the earthquakeData object.
        // Run the onEachFeature function once for each piece of data in the array.


        let earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: onEachFeature,
            pointTolayer: createCircleMarker
        });


        // Create a GeoJSON layer containing the features array on the earthquakeData object
        function createCircleMarker(feature, latlng) {
            let options = {
                radius: feature.properties.mag * 5,
                fillColor: chooseColor(feature.properties.mag),
                color: chooseColor(feature.properties.mag),
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.35
            }
            return L.circleMarker(latlng, options);
            //    create Map Functions   
            createMap(earthquakes);

            
// Loop through the cities array, and create one marker for each city object.
for (let i = 0; i < feature.properties.mag; i++) {

    // Conditionals for country gdp_pc
    let color = "";
    if (feature.properties.mag <= 2.5) {
      color = "yellow";
    }
    else if (feature.properties.mag <= 4) {
      color = "blue";
    }
    else if (feature.properties.mag <= 5.5) {
      color = "red";
    }
    else if (feature.properties.mag <= 8) {
        color = "pink";
    }
    else if (feature.properties.mag <= 20) {
        color = "orange";
    }
    else {
      color = "violet";
    }

            // function chooseColor(mag) {
            //     switch (true) {
            //         case (1.0 <= mag && mag <= 2.5):
            //             return "#0071BC"; // Strong blue
            //         case (2.5 <= mag && mag <= 4.0):
            //             return "#35BC00";
            //         case (4.0 <= mag && mag <= 5.5):
            //             return "#BCBC00";
            //         case (5.5 <= mag && mag <= 8.0):
            //             return "#BC3500";
            //         case (8.0 <= mag && mag <= 20.0):
            //             return "#BC0000";
            //         default:
            //             return "#E2FFAE";
            //     }
            // }

            // create map legend
            let legend = L.control({ position: 'bottomright' });
            legend.onAdd = function () {
                let div = L.DomUtil.create('div', 'info legend');
                let grades = [1.0, 2.5, 4.0, 5.5, 8.0];
                let labels = [];
                let legendInfo = "<h4>Magnitude</h4>";

                legendInfo = div.innerHTML

                // go through each magnitude item to label and color the legend
                // push to labels array as list item
                for (let i = 0; i < grades.length; i++) {
                    labels.push('<ul style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
                }

                // add each label list item to the div under the <ul> tag
                div.innerHTML += "<ul>" + labels.join("") + "</ul>";

                return div;
            };
