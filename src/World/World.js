import Door from "./Assets/Door"
import Sky from "./Assets/Sky"
import Wall from "./Assets/Wall"
import Window from "./Assets/Window"

export default class World {
	constructor()
	{
		this.timelineScaleFactor = 10
		document.body.style.height = `${100 * this.timelineScaleFactor}vh`

		this.wall = new Wall()
		this.door = new Door()
		this.window = new Window()
		this.sky = new Sky()

		// Basic Setting
		this.timeDelta = 0.016
		this.ticked = false
		this.timePrev = Date.now
		this.setSize()

		// Events
		this.setResizeEvent()
		this.setScrollEvent()

		//this.tick()
	}
	setSize()
	{
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		this.scrollHeight = document.body.scrollHeight
		this.scrollableHeight = this.scrollHeight - this.sizes.height
	}
	setResizeEvent()
	{
		window.addEventListener('resize', () =>
		{
			this.sizes.width = window.innerWidth
			this.sizes.height = window.innerHeight
			this.scrollHeight = document.body.scrollHeight
			this.scrollableHeight = this.scrollHeight - this.sizes.height

			this.wall.resize()

			// Add Assets Event
		})
	}
	setScrollEvent()
	{
		window.addEventListener('scroll', () =>
		{
			this.scrollCurrent = window.scrollY
			this.progress = this.scrollCurrent / this.scrollableHeight
			console.log(this.progress)

			// Add Assets Event
			this.wall.playAction( this.progress )
			this.door.playAction( this.progress )
			this.window.playAction( this.progress )
			this.sky.playAction( this.progress )

			this.ticked = false
			if(!this.ticked)
			{
				requestAnimationFrame(() =>
				{
				})
				this.ticked = true
			}
		})
	}
}