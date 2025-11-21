export default [
	{
		name: '눈 Y축 이동',
		type: {
			name: 'translateY',
			from: 0,
			to: '100vh'
		},
		timeline: {
			start: 0,
			end: 0.2,
			easing: 'easeQuad',
			loop: true,
			loopCount: 4,
		}
	},

	{
		name: '눈 빙글빙글 회전',
		type: {
			name: 'rotate',
			from: 0,
			to: '360deg'
		},
		timeline: {
			start: 0,
			end: 0.1,
			easing: 'easeQuad',
			loop: true,
			loopCount: 8,
		}
	},
]