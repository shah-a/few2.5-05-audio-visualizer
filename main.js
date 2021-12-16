// Notes
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer
import circleRenderer from './renderers/radialRayMonoRenderer.js'
import circleGridRenderer from './renderers/renderCircleGrid.js'
import circleCenterRenderer from './renderers/renderCircleCenter.js'
import verticalBarsRenderer from './renderers/verticalBarRenderer.js'
import verticalBarsMonoRenderer from './renderers/verticalBarsMonoRenderer.js'
import radialRayRenderer from './renderers/radialRayRenderer.js'
import customRenderer from './renderers/customRenderer.js'


// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600

canvas.style.border = '1px solid cornflowerblue'
canvas.style.borderRadius = '50%'

const width = canvas.width
const height = canvas.height

const centerX = width / 2
const centerY = height / 2
const radius = width / 3

// ----------------------------------------------------------
// Buttons
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
  startAudio()
})

pauseButton.addEventListener('click', (e) => {
  audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Defime some variables
let analyser
let frequencyArray
let audio

// Starts playing the audio
function startAudio() {
  // make a new Audio Object
  audio = new Audio()
  // Get a context 
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  // Define a source sound file 
  // You can replace this with your own file
  audio.src = 'audio/bird-whistling-a.wav'
  // audio.src = 'log-sine-sweep.wav'

  // Make a new analyser
  analyser = audioContext.createAnalyser()
  // Connect the analyser and the audio
  const source = audioContext.createMediaElementSource(audio)
  source.connect(analyser)
  analyser.connect(audioContext.destination)

  // Get an array of audio data from the analyser
  frequencyArray = new Uint8Array(analyser.frequencyBinCount)
  // console.log(frequencyArray.length)

  // Start playing the audio
  audio.play()
  render()
}

// This function renders the audio to the canvas using a renderer
function render() {
  analyser.getByteFrequencyData(frequencyArray)

  // Use one of the renderers below 
  // radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius, width, height)
  // verticalBarsMonoRenderer(frequencyArray, ctx, 12, width, height)
  // verticalBarsRenderer(frequencyArray, ctx, width, height)
  // circleCenterRenderer(frequencyArray, ctx, centerX, centerY, width, height)
  // circleGridRenderer(frequencyArray, ctx, width, height)
  // circleRenderer(frequencyArray, ctx, centerX, centerY, radius, width, height)
  customRenderer(frequencyArray, ctx, centerX, centerY, radius, width, height)

  // Set up the next animation frame
  requestAnimationFrame(render)
}
