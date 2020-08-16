import resources from "../resources/resources";
import passengerData from "../data/passenger";

describe('Flight Simulator Test App', function() {
  afterAll(async function() {
    await resources.flightapp.deleteAllFlights();
  });

  it('should be able to create new flight', async function() {
    const flight = await resources.flightapp.createFlight(
        10, 10, 10, 'EK');
    expect(flight.flightNumber).not.toBeNull();
    expect(flight.carrierCode).toBe('EK');
    expect(flight.available_seats_Y).toBe('10');
    expect(flight.seatBooked).toBe("0");
  });

  it('should get flight given carrierCode and flightNumber', async function() {
    const flight = await resources.flightapp.createFlight(
        10, 10, 10, 'EK');
    const flightGet = await resources.flightapp.getFlight(
        flight.carrierCode, flight.flightNumber);
    expect(flightGet.flightNumber).toBe(flight.flightNumber);
    expect(flightGet.carrierCode).toBe('EK');
  });

  it('should get list of all flights', async function() {
    await resources.flightapp.createFlight(
        10, 10, 10, 'EK');
    await resources.flightapp.createFlight(
        10, 10, 10, 'EK');
    const flights = await resources.flightapp.getAllFlights();
    expect(flights.length).toBeGreaterThan(1);
    expect(flights[0]).toHaveProperty('flightNumber');
  });

  it('should be able to add passanger to flights', async function() {
    const flight = await resources.flightapp.createFlight(
        5, 2, 3, 'EK');
    passengerData.flightNumber = flight.flightNumber;
    const flightAdd = await resources.flightapp.addPassenger(passengerData);
    expect(flightAdd.flightNumber).toBe(flight.flightNumber);
    const flightGet = await resources.flightapp.getFlight(flight.carrierCode, flight.flightNumber);
    expect(flightGet.seatBooked).toBe(passengerData.noOfPassenger);
  });

  it('should delete given flight by flightNumber', async function() {
    const flight = await resources.flightapp.createFlight(
        5, 2, 3, 'EK');
    const res = await resources.flightapp.deleteFlight(flight.flightNumber);
    expect(res.statusCode).toBe(200);
    // validate again from API
    const resGet = await resources.flightapp.getFlight(flight.carrierCode, flight.flightNumber);
    expect(resGet.statusCode).toBe(500);
    expect(resGet.body.details).toContain(
        `No flight found in database with flightNumber ${flight.flightNumber}`);
  });
});
