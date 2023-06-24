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

class Location {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }
}

class User {
  constructor(name, username, email) {
    this.name = name;
    this.username = username;
    this.email = email;
  }
}

class Driver extends User {
  constructor(name, username, email, license, cab) {
    super(name, username, email);
    this.license = license;
    this.cab = cab;
    this.available = false;
  }

  changeAvailabilty(availability) {
    this.available = availability;
  }
}

class Rider extends User {
  constructor(name, username, email) {
    super(name, username, email);
    this.rides = [];
  }

  addRide(ride) {
    this.rides.push(ride);
  }

  fetchRides() {
    return this.rides;
  }
}

class UserService {
  constructor() {
    this.drivers = [];
    this.riders = [];
  }
  static registerRider(name, username, email) {}
}

class Ride {
  constructor(rider, cab, pickUpLocation, targetLocation, cabLocation) {
    this.rider = rider;
    this.cab = cab;
    this.pickUpLocation = pickUpLocation;
    this.targetLocation = targetLocation;
    this.cabLocation = cabLocation;
    this.completed = false;
    this.cancelled = false;
    this.createdAt = new Date();
  }

  completeRide() {
    this.completeRide = true;
    this.cancelRide = false;
  }

  cancelRide() {
    this.cancelRide = true;
    this.completeRide = false;
  }
}

class CabService {
  cabs = new Map();
  drivers = new Map();
  _maxPickUpDistance = 2000; // in meters

  register(serviceName, cabName, cabModel, location, driver) {
    const newCab = new Cab(serviceName, cabName, cabModel, location, driver);
    const isExist = this.cabs.get(serviceName);
    if (!isExist) {
      this.cabs.set(serviceName, newCab);
      return newCab;
    } else {
      throw new Error("cab service already exists");
    }
  }

  registerDriver(name, username, email, license, cab) {
    const newDriver = new Driver(name, username, email, license, cab);
    const isExist = this.drivers.get(username);
    if (!isExist) {
      this.drivers.set(username, newDriver);
      return newDriver;
    } else {
      throw new Error("cdriver with username already exists");
    }
  }

  bookCab(serviceName, rider, currentLocation, targetLocation) {
    const cab = this.cabs.get(serviceName);
    if (rider instanceof Rider) {
      if (cab.available && cab.driver != null) {
        const distanceToPickup = Math.sqrt(
          Math.pow(cab.location.x - currentLocation.x, 2) +
            Math.pow(cab.location.y - currentLocation.y, 2)
        );
        if (distanceToPickup <= this._maxPickUpDistance) {
          const ride = new Ride(
            rider.username,
            cab.serviceName,
            currentLocation,
            targetLocation,
            cab.location
          );
          cab.available = false;
          cab.addRide(ride);
          rider.addRide(ride);
          return ride;
        } else {
          throw new Error("rider is far away");
        }
      } else {
        throw new Error("cab not available at the moment");
      }
    } else {
      throw new Error("only a rider can book cab");
    }
  }

  listCab() {
    return this.cabs.values();
  }
}
