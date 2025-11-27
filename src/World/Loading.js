export default class Loading{
	constructor()
	{

	}

	setLoading()
	{
		this.imagePromises = Array.from(document.images).map( img =>
			{
				return new Promise( resolve =>
				{
					if(img.complete) resolve()
					else
					{
						img.onload = img.onerror = resolve
					}
				}
				)
			}
		)

		this.audioPromises = Array.from(document.querySelector('audio')).map( audio =>
			{
				return new Promise( resolve =>
				{
					audio.oncanplaythrogh = resolve
				}
				)
			}
		)

		Promise.all([ ...this.imagePromises, ...this.audioPromises ])
			.then(() =>
			{
				document.querySelector('.loading').style.opacity = 0
			})
	}

}