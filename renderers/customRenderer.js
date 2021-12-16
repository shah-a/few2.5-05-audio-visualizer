/** Renders radial lines from the center of the canvas
 * 
 * @param {UINT8 Array} frequencyArray 
 * @param {Canvas context} ctx 
 * @param {number} canvas center x
 * @param {number} canvas center y
 * @param {number} inner radius
 * @param {number} canvas width
 * @param {number} canvas height
 */

function render(frequencyArray, ctx, centerX, centerY, radius, width, height) {
  ctx.clearRect(0, 0, width, height)

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()

  const bars = frequencyArray.length / 10
  const barMaxLength = (width - radius) * 0.75
  const step = Math.PI * 2 / bars

  // Loop over the data
  frequencyArray.forEach((f, i) => {
    // normalize the value to the range
    const barLength = f / 255 * barMaxLength // 0.0 - 1.0 * barMaxLength

    // plot starting and ending points. Map these around a circle
    const x1 = (Math.cos(step * i) * radius) + centerX
    const y1 = (Math.sin(step * i) * radius) + centerY
    const x2 = (Math.cos(step * i) * (radius - barLength)) + centerX
    const y2 = (Math.sin(step * i) * (radius - barLength)) + centerY

    // set stroke colour
    ctx.strokeStyle = `lightpink`

    // draw the paths
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  })

  // Stroke the paths
  ctx.stroke()
}

export default render
