import wallTimeline from '../Data/Timeline/wallTimeline.js'
import { setActions } from '../Utils/timeline.js'
export default class Wall{
	constructor()
	{
		this.houseElement = document.querySelector('.house')
		this.combinedActions = setActions( wallTimeline )

		this.resize()

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