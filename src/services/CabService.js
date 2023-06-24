import Cab from "../models/Cab";
import Driver from "../models/Driver";
import Ride from "../models/Ride";
import Rider from "../models/Rider";

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

export default CabService;
