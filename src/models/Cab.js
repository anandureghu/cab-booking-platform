class Cab {
  constructor(serviceName, cabName, cabModel, location, driver) {
    this.serviceName = serviceName;
    this.cabName = cabName;
    this.cabModel = cabModel;
    this.location = location;
    this.driver = driver;
    this.available = driver ? true : false;
    this.rides = [];
  }

  assginDriver(driver) {
    this.driver = driver;
  }

  updateLocation(x, y) {
    this.location.update(x, y);
  }

  addRide(ride) {
    this.rides.push(ride);
  }

  fetchRides() {
    return this.rides;
  }
}

export default Cab;
