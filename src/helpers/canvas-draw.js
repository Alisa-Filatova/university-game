// Original formula by Luke F. Courtney https://codepen.io/LFCProductions/pen/YzNBgEd
export const moveObjectInBezierCurve = (
  object,
  [cp1x, cp1y, cp2x, cp2y, x, y],
) => {

  // Calculate the coefficients based on where the player currently is in the animation
  let cx = 3 * (cp1x - object.x);
  let bx = 3 * (cp2x - cp1x) - cx;
  let ax = x - object.x - cx - bx;

  let cy = 3 * (cp1y - object.y);
  let by = 3 * (cp2y - cp1y) - cy;
  let ay = y - object.y - cy -by;

  let t = object.time;

  // Increment time value by speed
  object.time += object.speed;

  // Calculate new X & Y positions of player
  let xt = ax * (t * t * t) + bx * (t * t) + cx * t + object.x;
  let yt = ay * (t * t * t) + by * (t * t) + cy * t + object.y;

  if (object.time > 1) {
    object.time = 0;
  }

  // We draw the object to the canvas in the new location
  object.x = xt;
  object.y = yt;
}
