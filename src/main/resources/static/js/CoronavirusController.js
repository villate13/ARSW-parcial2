/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var countriesDict = {};
var regionDict = {};

function loadPanel() {
    getResult();
}

function getResult() {

    var tabla = document.getElementById("tableAllCountries");
    tabla.innerHTML = "<th>Country</th><th>Num deaths</th><th>Num Infected</th><th>Num cured</th><th></th>" +
            "<tbody id='tbodyTableCountries'></tbody>";

    var tbody = document.getElementById("tbodyTableCountries");
    /*var tabla = document.getElementById("allCountries");
     tabla.innerHTML = "<th>Country</th><th>Num deaths</th><th>Num Infected</th><th>Num cured</th><th></th>" +
     "<tbody id='tbodyTableCountries'></tbody>";
     
     var tbody = document.getElementById("tbodyTableCountries");*/

    axios.get('/coronavirus/')
            .then(function (response) {

                document.getElementById("lastChecked").innerHTML = response.data["data"]["lastChecked"];


                var data = response.data["data"]["covid19Stats"];
                var numDeaths = 0;
                var numInfected = 0;
                var numCured = 0;
                var countrySelect = "";

                for (var countries in data) {

                    countrySelect = data[countries]['country']

                    if (countrySelect in countriesDict) {
                        countriesDict[countrySelect][0] += parseInt(data[countries]['deaths']);
                        countriesDict[countrySelect][1] += parseInt(data[countries]['confirmed']);
                        countriesDict[countrySelect][2] += parseInt(data[countries]['recovered']);

                    } else {
                        countriesDict[countrySelect] = [parseInt(data[countries]['deaths']), parseInt(data[countries]['confirmed']), parseInt(data[countries]['recovered'])]
                    }


                }

                var lista = countriesDict;
                countriesDict = {};
                for (var x in lista) {
                    //console.log("pais: " + x + " datos " + lista[x]);
                    //console.log("muertos:" + lista[x][0]);
                    var countryConsult = "'" + x + "'";
                    var filatr = document.createElement("tr");
                    filatr.innerHTML = '<td>' + x + '</td>' +
                            '<td>' + lista[x][0] + '</td>' +
                            '<td>' + lista[x][1] + '</td>' +
                            '<td>' + lista[x][2] + '</td>' +
                            '<td><button onclick="getResultByCountry(' + countryConsult +
                            ')" class="btn btn-primary">Consult</button> </td>';
                    tbody.appendChild(filatr);
                }

            })
            .catch(function (error) {
                console.log(error);
                alert("Error, No se pudo cargar");
            })

}

function getResultByCountry(inCountry) {



    var tabla = document.getElementById("tableOneCountry");
    tabla.innerHTML = "<th>Region</th><th>Num deaths</th><th>Num Infected</th><th>Num cured</th>" +
            "<tbody id='tbodyTableOneCountry'></tbody>";

    var tbody = document.getElementById("tbodyTableOneCountry");
    /*var tabla = document.getElementById("allCountries");
     tabla.innerHTML = "<th>Country</th><th>Num deaths</th><th>Num Infected</th><th>Num cured</th><th></th>" +
     "<tbody id='tbodyTableCountries'></tbody>";
     
     var tbody = document.getElementById("tbodyTableCountries");*/
    if (inCountry == "null") {
        inCountry = document.getElementById("inCountry").value;
    }

    document.getElementById("countryNameTitle").innerHTML = inCountry;

    //getMapa(inCountry);
    document.getElementById("mapa").innerHTML =  '<script src="https://maps.googleapis.com/maps/api/js?key='+
    'AIzaSyAJEkNf2jzH7pnTB5L2ynhNNvt1ZqMY75c' + '&region=GB">' +
            '</script>';



    axios.get('/coronavirus/' + inCountry)
            .then(function (response) {

                var data = response.data["data"]["covid19Stats"];
                var numDeaths = 0;
                var numInfected = 0;
                var numCured = 0;
                var regionSelect = "";

                for (var region in data) {

                    regionSelect = data[region]['province']

                    if (regionSelect in regionDict) {
                        regionDict[regionSelect][0] += parseInt(data[region]['deaths']);
                        regionDict[regionSelect][1] += parseInt(data[region]['confirmed']);
                        regionDict[regionSelect][2] += parseInt(data[region]['recovered']);

                    } else {
                        regionDict[regionSelect] = [parseInt(data[region]['deaths']), parseInt(data[region]['confirmed']), parseInt(data[region]['recovered'])]
                    }
                    numDeaths += parseInt(data[region]['deaths']);
                    numInfected += parseInt(data[region]['confirmed']);
                    numCured += parseInt(data[region]['recovered']);



                }

                var tablaInfo = document.getElementById("tableInfoOneCountry");
                tablaInfo.innerHTML = "<th><h2>DATA</h2> </th><th>#</th>" +
                        "<tbody id='tbodyTableInfoOneCountry'></tbody>";
                var tbodyInfo = document.getElementById("tbodyTableInfoOneCountry");

                tbodyInfo.innerHTML = '<tr>' +
                        '<td>Num Deaths</td>' +
                        '<td>' + numDeaths + '</td>' +
                        '</tr><tr>' +
                        '<td>Num Infected</td>' +
                        '<td>' + numInfected + '</td>' +
                        '</tr><tr>' +
                        '<td>Num Cured</td>' +
                        '<td>' + numCured + '</td>' +
                        '</tr>';


                var lista = regionDict;
                regionDict = {};
                for (var x in lista) {
                    //console.log("pais: " + x + " datos " + lista[x]);
                    //console.log("muertos:" + lista[x][0]);

                    var filatr = document.createElement("tr");
                    filatr.innerHTML = '<td>' + x + '</td>' +
                            '<td>' + lista[x][0] + '</td>' +
                            '<td>' + lista[x][1] + '</td>' +
                            '<td>' + lista[x][2] + '</td>';
                    tbody.appendChild(filatr);
                }

            })
            .catch(function (error) {
                console.log(error);
                alert("Error, No se pudo cargar");
            })



}

function getMapa(c) {
    google.load('visualization', '1', {'packages': ['geomap']});
    google.setOnLoadCallback(drawMap);

    function drawMap() {
        var data = google.visualization.arrayToDataTable([
            ['City', 'Popularity'],
            ['New York', 200],
            ['Boston', 300],
            ['Miami', 400],
            ['Chicago', 500],
            ['Los Angeles', 600],
            ['Houston', 700]
        ]);

        var options = {};
        options['region'] = c;
        options['colors'] = [0xFF8747, 0xFFB581, 0xc06000]; //orange colors
        options['dataMode'] = 'markers';
        options['width'] = '556px';

        var container = document.getElementById('map_canvas');
        var geomap = new google.visualization.GeoMap(container);
        geomap.draw(data, options);
    }
    ;
}