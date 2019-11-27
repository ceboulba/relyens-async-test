'use strict'
import './style.css'
import * as BABYLON from 'babylonjs'
const canvas = document.getElementById('renderCanvas')
const imgBox = document.getElementById('img-box')
const imgView = document.getElementById('img-view')
const viewType = document.querySelector('.view-type')
const imageName = document.querySelector('.imageName')
console.log(imageName.innerHTML)

const imgs = [
  'https://res.cloudinary.com/archipicture/image/upload/v1574761363/relyens-olivet/relyens-olivet-00.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1574761687/relyens-olivet/relyens-olivet-01.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1574813868/relyens-olivet/relyens-olivet-02.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1574813983/relyens-olivet/relyens-olivet-03.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1574808497/relyens-olivet/relyens-olivet-04.jpg',
  'https://res.cloudinary.com/archipicture/image/upload/v1574809392/relyens-olivet/relyens-olivet-05.jpg',
]
const imgName= [
  'Vue axo 01',
  'Vue axo 02',
  'Vue 01',
  'Vue 02',
  'Vue 03',
  'Vue 04',
]

let num = 0

const btnPrev = document.getElementById('btnPrev').addEventListener('click', () => prev())
const btnNext = document.getElementById('btnNext').addEventListener('click', () => next())

var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.ArcRotateCamera(   
    'Camera',
   9,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  )

  camera.attachControl(canvas, true)
  camera.inputs.attached.mousewheel.detachControl(canvas)
  //camera.lowerAlphaLimit = .85
  //camera.upperAlphaLimit = 4.77

  let zoomLevel = 2

  var dome = new BABYLON.PhotoDome(
    'testdome',
    imgs[num],
    {
      resolution: 32,
      size: 15,
      useDirectMapping: false,
    },
    scene
  )

  return scene
}

const scene = createScene()

const check = () => {
  num <= 1 ?( () => {
    canvas.classList.add('hide');
    imgBox.classList.remove('hide');
    viewType.classList.add('hide')
  })()
    :( () => {
      canvas.classList.remove('hide')
      viewType.classList.remove('hide')
      imgBox.classList.add('hide')
    })()
  // scene.render()
  num === 0 ? imgView.src = imgs[0] : null
  num === 1 ? imgView.src = imgs[1] : null
}

check()

const next = () => {
  num < imgs.length - 1 ?
    num++
    : num = 0
  scene = createScene()
  check()
}

const prev = () => {
  //event.preventDefault()
  num === 0 ?
    num = imgs.length - 1
    : num--
  scene = createScene()
  check()
}

engine.runRenderLoop(function () {
    imageName.innerHTML = imgName[num]
  scene.render()
})

if(num!==0){
window.addEventListener('resize', function () {
  engine.resize()  
})
}
