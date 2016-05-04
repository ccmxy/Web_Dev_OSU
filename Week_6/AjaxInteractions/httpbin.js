document.getElementById('httpbinSubmit').addEventListener('click', function(event) {
    document.getElementById('httpbinResponse').textContent = "";
    var jsonInput = document.getElementById('httpbinInput').value;
    var req = new XMLHttpRequest();
    req.open("POST", "http://httpbin.org/post", true); //mark true for asynchronous request
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var unhideResponse = document.getElementById('responseLabel'); //Unhide words "response"
            if (unhideResponse) { //If response not already changed previously
                unhideResponse.id = 'stopHidingWithCSS';
            }
            var parsedJson = JSON.parse(req.responseText); //retreive Json object
            var jsonString = JSON.stringify(parsedJson.json); //turn into string
            if (jsonString === 'null')
                document.getElementById('httpbinResponse').textContent = 'ERROR: Please enter JSON data.';
            else
                document.getElementById('httpbinResponse').textContent = jsonString;
        }
    });
    req.send(jsonInput); //Send data
    event.preventDefault();
})
