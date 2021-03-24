const BaseApi = require('./BaseApi');
let instance = null;

function Flight(jsonBody) {
  this.available_seats_J = jsonBody.available_seats_J;
  this.available_seats_Y = jsonBody.available_seats_Y;
  this.available_seats_F = jsonBody.available_seats_F;
  this.carrierCode = jsonBody.carrierCode;
  this.seatBooked = jsonBody.seatBooked;
  this.flightNumber = jsonBody.flightNumber;
}

class FlightAppResource extends BaseApi {
  constructor() {
    if (!instance) {
      super();
      instance = this;
      this.setAdditionalHeaders({ 'Content-Type': 'application/json' });
      this.flights = [];
    }

    return instance;
  }

  async createFlight(availableSeatsY, availableSeatsJ, availableSeatsF, carrierCode) {
    const body = {
      available_seats_Y: availableSeatsY,
      available_seats_J: availableSeatsJ,
      available_seats_F: availableSeatsF,
      carrierCode: carrierCode,
    };
    const res = await this.post('/flight', body);
    if (res.statusCode === 201) {
      return new Flight(res.body.flightDetails);
    } else throw new Error('Couldn\'t create flight');
  }

  async getFlight(carrierCode, flightNumber) {
    const res = await this.get(
        `/flights/${carrierCode.toUpperCase()}/${flightNumber}`);
    if (res.statusCode === 200) {
      return new Flight(res.body.flightDetails);
    } else return res;
  }

  async getAllFlights() {
    const res = await this.get(`/flights`);
    if (res.statusCode === 200) {
      this.flights = res.body.flights.map((flight) => new Flight(flight));
      return this.flights;
    } else throw new Error('Couldn\'t get flight list');
  }

  async deleteFlight(flightNumber) {
    const res = await this.delete(`/flights/${flightNumber}`);
    return res;
  }

  async deleteAllFlights() {
    const res = await this.delete(`/flights`);
    return res;
  }

  async addPassenger(data) {
    const res = await this.put('/flight/passenger/add', data);
    if (res.statusCode === 200) {
      return new Flight(res.body.flightDetails);
    } else return res;
  }
}

module.exports = FlightAppResource;
