import { doorLeftTimeline, doorRightTimeline } from "../Data/Timeline/doorTimeline.js"
import { setActions } from "../Utils/timeline.js"


export default class Door{
	constructor(){
		this.doorLeftElement = document.querySelector('.house__part-door_left')
		this.doorRightElement = document.querySelector('.house__part-door_right')
		this.leftCombinedActions = setActions( doorLeftTimeline )
		this.rightCombinedActions = setActions( doorRightTimeline )
	}
	playAction(progress)
	{
		for(const type in this.leftCombinedActions)
		{
			this.doorLeftElement.style[ type ] = this.leftCombinedActions[ type ]( progress )
		}
		for(const type in this.rightCombinedActions)
		{
			this.doorRightElement.style[ type ] = this.rightCombinedActions[ type ]( progress )
		}
	}
}