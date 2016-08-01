var assert = require('assert');
var Analysis =  require('../analysis');


describe('Analysis', function(){
  beforeEach(function(){
    festivalData = [
    {
      "id": "12763764",
      "eventname": "Malia Live Beach Festival ",
      "venue": {
        "id": 62777,
        "name": "Pleasure Beach",
        "address": "Beach Road",
        "town": "Malia",
        "postcode": "",
        "phone": "",
        "latitude": 0,
        "longitude": 0,
        "type": "live"
      },
      "imageurl": "https://d31fr2pwly4c4s.cloudfront.net/3/3/2/860831_2_malia-live-beach-festival-_th.jpg",
      "largeimageurl": "https://d31fr2pwly4c4s.cloudfront.net/3/3/2/860831_2_malia-live-beach-festival-.jpg",
      "link": "http://www.skiddle.com/whats-on/greece/Pleasure-Beach/Malia-Live-Beach-Festival-/12763764/",
      "date": "2016-08-01",
      "description": "Malia Live Beach Festival enters its 4th year this time bringing you one of the biggest stars in the world",
      "openingtimes": {
        "doorsopen": "18:00",
        "doorsclose": "23:00",
        "lastentry": ""
      },
      "genres": [
      {
        "genreid": "39",
        "name": "Hip Hop"
      },
      {
        "genreid": "20",
        "name": "Pop"
      }
      ],
      "going": [
      {
        "userid": "1824330",
        "name": "AnnieDuffield",
        "image": "http://graph.facebook.com/10209189920177754/picture?type=square"
      },
      {
        "userid": "1856587",
        "name": "MollyDawson",
        "image": "http://graph.facebook.com/10206736515035396/picture?type=square"
      },
      {
        "userid": "1861866",
        "name": "ChloeHutcheson",
        "image": "http://graph.facebook.com/1170210956374985/picture?type=square"
      },
      {
        "userid": "1882003",
        "name": "Marc-EmmanuelAMICHIA",
        "image": "http://graph.facebook.com/10208594679517059/picture?type=square"
      },
      {
        "userid": "1607226",
        "name": "CallumYoung6",
        "image": "http://graph.facebook.com/1024515110939006/picture?type=square"
      },
      {
        "userid": "1877032",
        "name": "Victoriad081",
        "image": "http://graph.facebook.com/1024834864233122/picture?type=square"
      },
      {
        "userid": "1882742",
        "name": "CatherineMillar3",
        "image": "http://graph.facebook.com/1130875526977045/picture?type=square"
      },
      {
        "userid": "1825709",
        "name": "ChadMihaylov",
        "image": "http://graph.facebook.com/1200343846644758/picture?type=square"
      },
      {
        "userid": "1615245",
        "name": "JoeElliott3",
        "image": "http://graph.facebook.com/1543829572598407/picture?type=square"
      },
      {
        "userid": "1883409",
        "name": "JosephCollison",
        "image": "http://graph.facebook.com/1720528804847771/picture?type=square"
      }
      ],
      "minage": "18",
      "imgoing": 0,
      "entryprice": "£25-£30",
      "tickets": true,
      "ticketsAvail": null,
      "currency": "GBP",
      "artists": [],
      "gateway": false
    },
    {
      "id": "12714105",
      "eventname": "Holi Garden Festival",
      "venue": {
        "id": 53048,
        "name": "Benimussa Park",
        "address": "C/Romani 18, 07820 - Ses Paises",
        "town": "San Antonio",
        "postcode": "",
        "phone": "",
        "latitude": 38.968967,
        "longitude": 1.335487,
        "type": "Outdoors"
      },
      "imageurl": "https://d31fr2pwly4c4s.cloudfront.net/4/c/0/824933_0_holi-garden-festival_th.jpg",
      "largeimageurl": "https://d31fr2pwly4c4s.cloudfront.net/4/c/0/824933_0_holi-garden-festival.jpg",
      "link": "http://www.skiddle.com/whats-on/Ibiza/Benimussa-Park/Holi-Garden-Festival/12714105/",
      "date": "2016-08-01",
      "description": "Holi Garden Festival returns at Benimussa Park",
      "openingtimes": {
        "doorsopen": "16:30",
        "doorsclose": "00:00",
        "lastentry": ""
      },
      "genres": [
      {
        "genreid": "10",
        "name": "Deep/Soulful House"
      },
      {
        "genreid": "22",
        "name": "Funky House"
      },
      {
        "genreid": "1",
        "name": "House"
      },
      {
        "genreid": "9",
        "name": "Techno"
      }
      ],
      "going": [],
      "minage": "18",
      "imgoing": 0,
      "entryprice": "£29 (Including 2 bags of Colour)",
      "tickets": true,
      "ticketsAvail": null,
      "currency": "EUR",
      "artists": [],
      "gateway": false
    }
    ]
  })

  it('contain three prices', function(){
    analysis = new Analysis(festivalData);
    analysis.getFestivalTicketPrice()
    assert.equal(2, analysis.festivalPrices.length)
  })     

})