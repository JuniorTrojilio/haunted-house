import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// DEBUG
const gui = new dat.GUI()

// TEXTURES
const textureLoader = new THREE.TextureLoader()

// CANVAS
const canvas = document.querySelector('.webgl')

// SCENE
const scene = new THREE.Scene()

// FOG
const fog = new THREE.Fog("#262837", 2, 15)
scene.fog = fog

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(2, 2, 10)

//CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// OBJECTS

// HOUSE
const house = new THREE.Group()

// WALLS OF HOUSE
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusion = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusion,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
)

walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.set(0,1.25,0)


// ROOF OF HOUSE
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({ color : '#b35f45'}),
)
roof.position.set(0, 3, 0)
roof.rotation.set(0, Math.PI * 0.25, 0)

// DOOR OF HOUSE
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2,2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusion,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    }),
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.set(0,0.9,1.99)


// BUSHES
const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({ color : '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)

bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)

bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(- 0.8,0.1,2.2)

bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)

house.add(roof)
house.add(walls)
house.add(door)
house.add(bush1, bush2, bush3, bush4)

// FLOOR
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
)

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0

// GRAVES
const graves = new THREE.Group()
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.2, z)

    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}

// AMBIENTE LIGHT
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)


// DIRETIONAL LIGHT
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)

// DOOR LIGHT
const doorLight = new THREE.PointLight("#ff7c46", 1, 7)
doorLight.position.set(0, 2, 2.7)
house.add(doorLight)

// GHOSTS
const ghost1 = new THREE.PointLight("#ffffff", 1, 7)
scene.add(ghost1)

const ghost2 = new THREE.PointLight("#ffffff", 1, 7)
scene.add(ghost2)

const ghost3 = new THREE.PointLight("#ffffff", 1, 7)
scene.add(ghost3)



//RENDERER
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#262837")

// SHADOWS
renderer.shadowMap.enabled = true

moonLight.castShadow = true
doorLight.castShadow = true

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


// RESIZE
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Update camera
    camera.aspect = window.innerWidth / window.innerheight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerheight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// // AXISHELPER
// const axesHelper = new THREE.AxesHelper(10)


// scene.add(axesHelper)
scene.add(camera)
scene.add(floor)
scene.add(house)
scene.add(graves)
scene.add(moonLight)
scene.add(ambientLight)

renderer.render(scene, camera)

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.set(
        Math.cos(ghost1Angle) * 4, 
        Math.sin(ghost1Angle) * 4, 
        Math.sin(elapsedTime) * 3
    )

    const ghost2Angle = elapsedTime * 0.32
    ghost1.position.set(
        Math.cos(ghost2Angle) * 5, 
        Math.sin(ghost2Angle) * 5, 
        (Math.sin(elapsedTime) * 4) + Math.sin(elapsedTime * 2.5)
    )

    const ghost3Angle = elapsedTime * 0.18
    ghost1.position.set(
        Math.cos(ghost3Angle) * 7 + Math.sin(elapsedTime * 0.32), 
        Math.sin(ghost3Angle) * 7 + Math.sin(elapsedTime * 0.5), 
        (Math.sin(elapsedTime) * 3) + Math.sin(elapsedTime * 2.5)
    )
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()