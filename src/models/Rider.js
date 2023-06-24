import User from "./User";

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

export default Rider;
