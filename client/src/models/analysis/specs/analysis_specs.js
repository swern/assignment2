var assert = require('assert');
var FestivalAnalysis =  require('../festival_analysis');
var FlightAnalysis =  require('../flight_analysis');


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
    flightData = {
      "Dates": {
        "OutboundDates": [
        {
          "PartialDate": "2016-08-30",
          "QuoteIds": [
          1,
          2,
          3,
          4
          ],
          "Price": 222,
          "QuoteDateTime": "2016-07-31T01:53:00"
        }
        ],
        "InboundDates": [
        {
          "PartialDate": "2016-09-06",
          "QuoteIds": [
          3,
          4,
          5
          ],
          "Price": 222,
          "QuoteDateTime": "2016-07-31T01:53:00"
        }
        ]
      },
      "Quotes": [
      {
        "QuoteId": 1,
        "MinPrice": 171,
        "Direct": true,
        "OutboundLeg": {
          "CarrierIds": [
          1223
          ],
          "OriginId": 69968,
          "DestinationId": 65655,
          "DepartureDate": "2016-08-30T00:00:00"
        },
        "QuoteDateTime": "2016-07-31T04:20:00"
      },
      {
        "QuoteId": 2,
        "MinPrice": 149,
        "Direct": false,
        "OutboundLeg": {
          "CarrierIds": [
          7
          ],
          "OriginId": 69968,
          "DestinationId": 65655,
          "DepartureDate": "2016-08-30T00:00:00"
        },
        "QuoteDateTime": "2016-07-31T01:53:00"
      },
      {
        "QuoteId": 3,
        "MinPrice": 243,
        "Direct": true,
        "OutboundLeg": {
          "CarrierIds": [
          1223
          ],
          "OriginId": 69968,
          "DestinationId": 65655,
          "DepartureDate": "2016-08-30T00:00:00"
        },
        "InboundLeg": {
          "CarrierIds": [
          881
          ],
          "OriginId": 65655,
          "DestinationId": 69968,
          "DepartureDate": "2016-09-06T00:00:00"
        },
        "QuoteDateTime": "2016-08-01T13:12:00"
      },
      {
        "QuoteId": 4,
        "MinPrice": 222,
        "Direct": false,
        "OutboundLeg": {
          "CarrierIds": [
          7
          ],
          "OriginId": 69968,
          "DestinationId": 65655,
          "DepartureDate": "2016-08-30T00:00:00"
        },
        "InboundLeg": {
          "CarrierIds": [
          881
          ],
          "OriginId": 65655,
          "DestinationId": 69968,
          "DepartureDate": "2016-09-06T00:00:00"
        },
        "QuoteDateTime": "2016-08-01T13:12:00"
      },
      {
        "QuoteId": 5,
        "MinPrice": 81,
        "Direct": true,
        "InboundLeg": {
          "CarrierIds": [
          1223
          ],
          "OriginId": 65655,
          "DestinationId": 69968,
          "DepartureDate": "2016-09-06T00:00:00"
        },
        "QuoteDateTime": "2016-08-02T06:08:00"
      }
      ],
      "Places": [
      {
        "PlaceId": 65655,
        "IataCode": "LGW",
        "Name": "London Gatwick",
        "Type": "Station",
        "SkyscannerCode": "LGW",
        "CityName": "London",
        "CityId": "LOND",
        "CountryName": "United Kingdom"
      },
      {
        "PlaceId": 69968,
        "IataCode": "NAP",
        "Name": "Naples International",
        "Type": "Station",
        "SkyscannerCode": "NAP",
        "CityName": "Naples",
        "CityId": "NAPL",
        "CountryName": "Italy"
      }
      ],
      "Carriers": [
      {
        "CarrierId": 7,
        "Name": "Vueling Airlines"
      },
      {
        "CarrierId": 881,
        "Name": "British Airways"
      },
      {
        "CarrierId": 1223,
        "Name": "Meridiana"
      }
      ],
      "Currencies": [
      {
        "Code": "GBP",
        "Symbol": "£",
        "ThousandsSeparator": ",",
        "DecimalSeparator": ".",
        "SymbolOnLeft": true,
        "SpaceBetweenAmountAndSymbol": false,
        "RoundingCoefficient": 0,
        "DecimalDigits": 2
      }
      ]
    }
  })

  it('can get festival price', function(){
    festivalAnalysis = new FestivalAnalysis(festivalData[0]);
    festivalAnalysis.getFestivalTicketPrice()
    assert.equal(25, festivalAnalysis.festivalTicketPrice)
  })
  
  it('can get departure date from flightObj',function(){
    flightAnalysis = new FlightAnalysis(flightData)
    assert.equal('2016-08-30',flightAnalysis.flightObj.departureDate)
  })

  it('can get arrival date from flightObj',function(){
    flightAnalysis = new FlightAnalysis(flightData)
    assert.equal('2016-09-06',flightAnalysis.flightObj.arrivalDate)
  })  
  it('can get departure airport from flightObj',function(){
    flightAnalysis = new FlightAnalysis(flightData)
    assert.equal('Naples International',flightAnalysis.flightObj.departureAirport.name)
  }) 
  it('can get iata code of arrival airport from flightObj',function(){
    flightAnalysis = new FlightAnalysis(flightData)
    assert.equal('LGW',flightAnalysis.flightObj.arrivalAirport.iata)
  })
  it('get cheapest quote', function(){
    flightAnalysis = new FlightAnalysis(flightData)
    flightAnalysis.createNewQuotesArray()
    
  }) 

})







