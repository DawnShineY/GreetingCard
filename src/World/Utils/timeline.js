import Easing from "./easing"

export function localizeProgress(progress, start, end)
	{
		if( progress < start ) return 0
		if( progress > end ) return 1

		const localProgress = ( progress - start ) / ( end - start )

		return localProgress
	}

	export function setActions(aniTimeline)
	{
		const actions = {}
		aniTimeline.forEach(( aniInfo ) =>
		{
			const from = aniInfo.animation.from
			const to = aniInfo.animation.to
			const type = aniInfo.animation.type
			const name = aniInfo.animation.name
			const start = aniInfo.timeline.start
			const end = aniInfo.timeline.end
			const easing = aniInfo.timeline.easing

			if( !actions[ type ] ) actions[ type ] = []

			const sentence = ( progress ) => {
				const localProgress = localizeProgress(progress, start, end)
				const easingProgress = Easing[ easing ](localProgress)
				//const isActive = easingProgress > 0 && easingProgress < 1 ? 1 : 0
				let calculatedValue = `calc( (${ to } - ${ from }) * ${ easingProgress } + ${ from } )`
				if(type !== name) calculatedValue = `${ name }( ` + calculatedValue + ')'

				return calculatedValue
			}
			actions[ type ].push( sentence )
		})

		const combinedActions = {}
		for(const type in actions)
		{
			const newF = ( progress ) => {
				let result = ''
				for(const action of actions[ type ])
				{
					result += action( progress )
				}
				return result
			}
			combinedActions[ type ] = newF
		}

		return combinedActions
	}