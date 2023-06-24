import Rider from "../models/Rider";

class UserService {
  constructor() {
    this.riders = [];
  }
  registerRider(name, username, email) {
    const newRider = new Rider(name, username, email);
    this.riders.push(newRider);
    return newRider;
  }

  fetchRiders() {
    return this.riders;
  }
}

export default UserService;
