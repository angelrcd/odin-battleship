export default function Ship(length) {
  this.length = length;
  this.timesHit = 0;

  this.hit = function () {
    this.timesHit++;
  };

  this.isSunk = function () {
    return this.timesHit === this.length;
  };
}
