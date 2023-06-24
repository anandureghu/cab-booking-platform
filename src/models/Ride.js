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

export default Ride;
