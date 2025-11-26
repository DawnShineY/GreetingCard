import { Body, Box, ContactMaterial, Cylinder, Material, Plane, Quaternion, SAPBroadphase, Vec3, World } from "cannon";
import { AmbientLight, BoxGeometry, Clock, CylinderGeometry, DirectionalLight, InstancedMesh, LoadingManager, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry, Scene, WebGLRenderer } from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

export default class Presents{
	constructor()
	{

		this.setDefault()
		this.setPhysics()
		this.setLoader()

		this.isLoaded = false
		this.resize()

		/**
		 * Time
		 */
		this.now = Date.now()
		this.passedTime = Date.now()
		this.elapsedTime = 0
		this.deltaTime = 1/60
		this.tick()
		this.dummy = new Object3D()
	}
	setDefault()
	{
		this.canvas = document.querySelector('#webgl')
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		this.scene = new Scene()
		this.scene.background = null
		this.camera = new PerspectiveCamera(30, this.sizes.width / this.sizes.height, 0.1, 100 )
		this.camera.position.set(0, 2, -25)
		this.camera.lookAt(0, 0, 0)
		//this.controls = new OrbitControls(this.camera, this.canvas)
		this.renderer = new WebGLRenderer({ antialias: true, canvas: this.canvas, alpha: true })
		this.renderer.setSize( this.sizes.width, this.sizes.height )
		this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) )

		this.ambientLight = new AmbientLight(0xffffff, 3)
		this.scene.add(this.ambientLight)

		this.directionalLight = new DirectionalLight(0xffffff, 3)
		this.directionalLight.position.set(1, 2, 3)
		this.scene.add(this.directionalLight)
	}

	setPhysics()
	{
		/** World */
		this.world = new World()
		this.world.gravity.set(0, -9.82, 0)
		this.world.broadphase = new SAPBroadphase( this.world )
		this.world.allowSleep = true
		this.defaultMaterial = new Material( 'default' )
		this.defaultContactMaterial = new ContactMaterial(
			this.defaultMaterial,
			this.defaultMaterial,
			{
				friction: 0.2,
				restitution: 0.0
			}
		)
		this.world.addContactMaterial( this.defaultContactMaterial )

		/** Floor */
		this.floorShape = new Plane()
		this.floorBody = new Body(
			{
				mass: 0,
				shape: this.floorShape,
				material: this.defaultMaterial
			}
		)
		this.floorBody.quaternion.setFromAxisAngle(new Vec3(-1, 0, 0), Math.PI * 0.5)
		this.world.addBody(this.floorBody)

		/** Boxes */
		this.boxCount = 50
		this.boxPositionRange = 3
		this.greenBoxShape = new Box( new Vec3( 0.154714, 0.183124, 0.154714 ) )
		this.blueBoxShape = new Box( new Vec3( 0.2308235, 0.2042875, 0.166093 ) )
		this.redBoxShape = new Cylinder(0.164082, 0.164082, 0.467851, 12)
		const quat = new Quaternion();
		quat.setFromAxisAngle( new Vec3( 1, 0, 0 ), Math.PI / 2 );
		this.redBoxShape.transformAllPoints( new Vec3(), quat );

		this.boxShapeArray = [
			this.greenBoxShape,
			this.blueBoxShape,
			this.redBoxShape
		]

		this.boxesToUpdate = [[], [], []]
		this.boxShapeArray.forEach(( shape, i ) =>
		{
			for(let k = 0; k < this.boxCount; k++)
			{
				const body = new Body(
					{
						shape,
						mass: 2,
						material: this.defaultMaterial,
						position: new Vec3(
							(Math.random() - 0.5) * this.boxPositionRange,
							(Math.random() + 0.5) * 5 * this.boxPositionRange,
							(Math.random() - 0.5) * this.boxPositionRange,
						),
					}
				)

				this.world.addBody( body )
				this.boxesToUpdate[i].push( body )
			}
		})

		setTimeout(() =>
		{
			this.world.gravity.set(0, -2, 0);
		}, 3000)

	}

	setLoader()
	{
		this.loadingManager = new LoadingManager(
			() => { this.isLoaded = true }
		)
		this.loader = new GLTFLoader( this.loadingManager )
		this.loader.load(
			'/gltf/model.glb',
			(model) =>
			{
				this.model = model.scene

				// InstancedMesh
				this.greenBox = this.model.children[0]
				this.blueBox = this.model.children[1]
				this.redBox = this.model.children[2]

				this.greenInstancedMesh = new InstancedMesh( this.greenBox.geometry, this.greenBox.material, this.boxCount )
				this.blueInstancedMesh = new InstancedMesh( this.blueBox.geometry, this.blueBox.material, this.boxCount )
				this.redInstancedMesh = new InstancedMesh( this.redBox.geometry, this.redBox.material, this.boxCount )

				this.scene.add( this.greenInstancedMesh, this.blueInstancedMesh, this.redInstancedMesh )

				this.boxInstanceMeshArray = [
					this.greenInstancedMesh,
					this.blueInstancedMesh,
					this.redInstancedMesh
				]
			}
		)
	}
	resize()
	{
		window.addEventListener('resize', () =>
		{
			this.sizes.width = window.innerWidth
			this.sizes.height = window.innerHeight
			this.camera.aspect = this.sizes.width / this.sizes.height
			this.camera.updateProjectionMatrix()
			this.renderer.setSize(this.sizes.width, this.sizes.height)
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})
	}

	updatePhysics()
	{
		if(this.isLoaded)
		{
			this.world.step( 1 / 60, this.deltaTime * 0.001, 3)
			this.boxesToUpdate.forEach((bodyArray, k) =>
			{
				for(let i = 0; i < this.boxCount; i++)
				{
					this.dummy.position.copy(bodyArray[i].position)
					this.dummy.quaternion.copy(bodyArray[i].quaternion)
					this.dummy.updateMatrix()
					this.boxInstanceMeshArray[k].setMatrixAt(i, this.dummy.matrix)
					this.boxInstanceMeshArray[k].instanceMatrix.needsUpdate = true
				}
			})
		}
	}

	tick()
	{
		this.currentTime = Date.now()
		this.deltaTime = this.currentTime - this.passedTime
		this.elapsedTime = this.passedTime - this.now
		this.passedTime = this.currentTime
		this.renderer.render(this.scene, this.camera)

		this.updatePhysics()

		window.requestAnimationFrame(() =>
		{
			this.tick()
		})
	}

	playAction(progress)
	{
		this.camera.position.y = 2 + 10 * progress
		this.camera.position.z = -25 + 24.9999 * progress
		this.camera.lookAt(0, 0, 0)
	}

}