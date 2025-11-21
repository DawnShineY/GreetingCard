import wallTimeline from '../Data/Timeline/wallTimeline.js'
import { setActions } from '../Utils/timeline.js'
export default class Wall{
	constructor()
	{
		this.houseElement = document.querySelector('.house')
		this.combinedActions = setActions( wallTimeline )
		this.curtainElement = document.querySelectorAll('.house__curtain')

		this.setCurtainEvent()
		this.resize()

	}

	setCurtainEvent()
	{
		this.curtainElement.forEach((el) =>
		{
			el.addEventListener('click', () =>
			{
				const classList = el.classList
				classList.add( 'house__curtain-open' )
				el.style.filter = 'drop-shadow(4px 4px 10px #3f343065)'
				setTimeout(() =>
				{
					classList.remove( 'house__curtain-open' )
					el.style.filter = ''
				}, 2000)
			})
		})
	}

	resize()
	{
		const houseWidth = this.houseElement.clientWidth
		this.houseElement.style.marginLeft = `${ houseWidth * -0.5 }px`
	}

	playAction(progress)
	{
		for(const type in this.combinedActions)
		{
			this.houseElement.style[ type ] = this.combinedActions[ type ]( progress )
		}
	}
}