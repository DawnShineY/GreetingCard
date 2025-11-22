import { curtainTimeline } from "../Data/Timeline/windowTimeline"
import { localizeProgress } from "../Utils/timeline"

export default class Window{
	constructor()
	{
		this.curtainElements = document.querySelectorAll('.house__curtain')
		this.start = curtainTimeline[0].timeline.start
		this.end = curtainTimeline[0].timeline.end

		this.floorIndex = [ 0, 4, 8, 12, 15 ]
		this.selectedCurtainElements = [
			this.curtainElements[ this.floorIndex[0] + Math.floor( Math.random() * 3 ) ],
			this.curtainElements[ this.floorIndex[1] + Math.floor( Math.random() * 3 ) ],
			this.curtainElements[ this.floorIndex[2] + Math.floor( Math.random() * 3 ) ],
			this.curtainElements[ this.floorIndex[3] + Math.floor( Math.random() * 2 ) ],
			this.curtainElements[ this.floorIndex[4] + Math.floor( Math.random() * 2 ) ],
		]

		this.setCurtainEvent()
	}

	setCurtainOpen(progress)
	{

		for(let i = 0; i < this.selectedCurtainElements.length; i++)
		{
			const start = this.start + 0.026 * i
			const end = this.end + 0.026 * i
			const localProgress = localizeProgress( progress, start, end )
			const el = this.selectedCurtainElements[ i ]

			if(localProgress > 0)
			{
				el.classList.add( 'house__curtain-open' )
				el.style.filter = 'drop-shadow(2px 2px 6px #3f343065)'

			}
			if(localProgress == 0 || localProgress == 1)
			{
				el.classList.remove( 'house__curtain-open' )
				this.selectedCurtainElements[ i ] = this.curtainElements[ this.floorIndex[ i ] + Math.floor( Math.random() * ( i < 3 ? 3 : 2 ) ) ]
			}
		}

	}

	setCurtainEvent()
	{
		this.curtainElements.forEach((el) =>
		{
			el.addEventListener('click', () =>
			{
				const classList = el.classList
				classList.add( 'house__curtain-open' )
				el.style.filter = 'drop-shadow(2px 2px 6px #3f343065)'
				setTimeout(() =>
				{
					classList.remove( 'house__curtain-open' )
					el.style.filter = ''
				}, 2000)
			})
		})
	}

	playAction(progress)
	{
		this.setCurtainOpen(progress)
	}
}