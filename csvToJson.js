function CSVToArray( strData, strDelimiter ){
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    var arrData = [];
    var headers = [];
    var headersFound = false;
    var headerIndex = 0;
    var arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){
            arrData.push( {} );
            headersFound = true;
            headerIndex = 0;
        }

        var strMatchedValue;
        if (arrMatches[ 2 ]){
            strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
        } else {
            strMatchedValue = arrMatches[ 3 ];
        }

        if (!headersFound) {
          headers.push(strMatchedValue);
        } else {
          arrData[arrData.length -1][headers[headerIndex]] = strMatchedValue;
          headerIndex ++;
        }
    }
    return( arrData );
}

function getDataFromCsv(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
                return CSVToArray(request.responseText);
        }
    }
}

var data = getDataFromCsv('https://adcreation-m.s3-ap-south-1.amazonaws.com/1502185055_test.csv')
