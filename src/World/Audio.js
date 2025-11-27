export default class Audio{
	constructor()
	{
		this.audioElement = document.querySelector('audio')
		//this.audioElement.play()
		this.start = 0
		this.end = 80
		this.audioElement.addEventListener('timeupdate', () =>
		{
			if( this.audioElement.currentTime > this.end)
			{
				this.audioElement.currentTime = this.start
				this.audioElement.play()
			}
		})
	}
}