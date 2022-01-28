const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const centerCircle = document.getElementById('center-circle')
const horizontalLine = document.getElementById('horizontal-line')
const verticalLine = document.getElementById('vertical-line')
const centeredClassName = 'centered'

function setClass(element, className, hasClass) {
  if (hasClass) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

function handleOrientationChange(beta, gamma) {
  const vertical = beta > 90 ? 180 - beta : beta < -90 ? -180 - beta : beta
  const horizontal = gamma < 0 ? -90 - gamma : 90 - gamma
  moveElement(verticalLine, clamp(vertical / 90 * 100, -50, 50), 0)
  moveElement(horizontalLine, 0, clamp(horizontal / 90 * 100, -50, 50))

  const verticallyCentered = Math.abs(vertical) < 1
  const horizontallyCentered = Math.abs(horizontal) < 1

  setClass(horizontalLine, centeredClassName, horizontallyCentered)
  setClass(verticalLine, centeredClassName, verticallyCentered)
  setClass(centerCircle, centeredClassName, verticallyCentered && horizontallyCentered)
}

const [android, ios, windows] = [...Array(3).keys()]

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/windows phone/i.test(userAgent)) {
    return windows
  }

  if (/android/i.test(userAgent)) {
    return android
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return ios
  }

  return undefined
}

const getDisplay = (visible) => visible ? 'block' : 'none'
const setElementVisible = (element, visible) => element.style.display = getDisplay(visible)
const setElementWithIdVisible = (id, visible) => setElementVisible(document.getElementById(id), visible)

const consentId = 'consent'
const contentId = 'content'
const errorId = 'error'

function setLevelVisible(visible) {
  setElementWithIdVisible(consentId, !visible)
  setElementWithIdVisible(contentId, visible)
}

function showError(error) {
  const errorElement = document.getElementById(errorId)
  setElementVisible(errorElement, true)
  setElementWithIdVisible(consentId, false)
  setElementWithIdVisible(contentId, false)
  error.innerText = error
}

async function initialize() {
  const os = getMobileOperatingSystem()
  try {
    switch (os) {
      case ios: {
        const response = await DeviceMotionEvent.requestPermission()
        if (response !== 'granted') {
          showError('Permission to use accelerometer sensor is denied.')
          return
        }
        break;
      }
      case android: {
        const { state } = await navigator.permissions.query({ name: 'accelerometer' })
        if (state === 'denied') {
          showError('Permission to use accelerometer sensor is denied.')
          return
        }
        break;
      }
      default:
        showError('Unsupported platform')
        return
    }

    setLevelVisible(true)
    window.addEventListener('deviceorientation', (e) => {
      handleOrientationChange(e.beta, e.gamma)
    })
  } catch (e) {
    if (e.error) {
      showError(e.toString())
    } else {
      console.error(e)
    }
  }
}

console.log('Starting accelerometer')
initialize().then(() => console.log('Initialization done'))

function moveElement(domElement, xOffset, yOffset) {
  if (domElement) {
    const transformAttr = ' translate(' + xOffset + ',' + yOffset + ')'
    domElement.setAttribute('transform', transformAttr)
  }
}
