const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const centerCircle = document.getElementById('center-circle')
const horizontalLine = document.getElementById('horizontal-line')
const verticalLine = document.getElementById('vertical-line')
let centered = false

function handleOrientationChange(beta, gamma) {
  const vertical = beta > 90 ? 180 - beta : beta < -90 ? -180 - beta : beta
  const horizontal = gamma < 0 ? -90 - gamma : 90 - gamma
  moveElement(verticalLine, clamp(vertical / 90 * 100, -50, 50), 0)
  moveElement(horizontalLine, 0, clamp(horizontal / 90 * 100, -50, 50))

  if (!centered && Math.abs(vertical) < 1 && Math.abs(horizontal) < 1) {
    centered = true
    centerCircle.classList.add('centered')
  } else if (centered) {
    centered = false
    centerCircle.classList.remove('centered')
  }
}

function initialize() {
  DeviceMotionEvent.requestPermission().then(response => {
    if (response == 'granted') {
      document.getElementById('consent').style.display = 'none'
      document.getElementById('content').style.display = 'block'

      window.addEventListener('deviceorientation', (event) => {
        handleOrientationChange(event.beta, event.gamma)
      })
    }
  })
}

console.log('Starting accelerometer')
initialize()

function moveElement(domElement, xOffset, yOffset) {
  if (domElement) {
    const transformAttr = ' translate(' + xOffset + ',' + yOffset + ')'
    domElement.setAttribute('transform', transformAttr)
  }
}
