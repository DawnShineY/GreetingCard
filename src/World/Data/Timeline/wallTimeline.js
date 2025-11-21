const wallTimeline = [
	{
		animation: {
			type: 'transform',
			name: 'translateY',
			from: '0px',
			to: '-80% - 50vh'
		},
		timeline: {
			start: 0.05,
			end: 0.4,
			easing: 'easeOutSine',
			loop: false
		}
	},
	{
		animation: {
			type: 'transform',
			name: 'scale',
			from: '1',
			to: '2.5'
		},
		timeline: {
			start: 0.37,
			end: 0.6,
			easing: 'easeOutSine',
			loop: false,
		}
	},
	{
		animation: {
			type: 'opacity',
			name: 'opacity',
			from: 1,
			to: 0
		},
		timeline: {
			start: 0.58,
			end: 0.62,
			easing: 'easeOutSine',
			loop: false
		}
	},
]

export default wallTimeline