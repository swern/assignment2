var Festival = function(){
  this.festivals= ''
  //getting festivals
  this.onUpdate = null
}

Festival.prototype = {

  getFestivals: function(){
    var url = "http://www.skiddle.com/api/v1/events?api_key=b44ecae0f03d13e3fcf192e4235aef2b&eventcode=FEST&minDate=2016-09-01&maxDate=2016-09-10&limit=100";
    var request = new XMLHttpRequest();
    request.open("GET",url);
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = function(){
      if (request.status === 200){
        var jsonString = request.responseText;
        this.festivals = JSON.parse(jsonString)
        //console.log(this.festivals);
        this.onUpdate(this.festivals);
      }
    }.bind(this);

    request.send(null)
    //when it's got the data - call onUpdate(data);
  }

}

module.exports = Festival;