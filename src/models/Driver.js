import User from "./User";

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

export default Driver;
