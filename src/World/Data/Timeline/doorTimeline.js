const doorLeftTimeline = [
	{
		animation: {
			type: 'transform',
			name: 'translateX',
			from: '0px',
			to: '-15%'
		},
		timeline: {
			start: 0.4,
			end: 0.5,
			easing: 'easeOutSine',
			loop: false
		}
	}
]
const doorRightTimeline = [
	{
		animation: {
			type: 'transform',
			name: 'translateX',
			from: '0px',
			to: '15%'
		},
		timeline: {
			start: 0.4,
			end: 0.5,
			easing: 'easeOutSine',
			loop: false
		}
	}
]

export { doorLeftTimeline, doorRightTimeline }