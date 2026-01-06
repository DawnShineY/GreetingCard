import { skyTimeline } from "../Data/Timeline/skyTimeline";
import Easing from "../Utils/easing";
import { localizeProgress } from "../Utils/timeline";

export default class Sky{
	constructor()
	{
		this.fixedElement = document.querySelector('.fixed')
		this.color = this.blendColorGamma('#fffff', '#00000', 0.5)
		this.start = skyTimeline[0].timeline.start
		this.end = skyTimeline[0].timeline.end
		this.easing = skyTimeline[0].timeline.easing

	}

	toLinear(v) {
		return Math.pow(v / 255, 2.2);
	}

	toSRGB(v) {
		return Math.pow(v, 1 / 2.2) * 255;
	}

	blendColorGamma(x, y, a) {
		const rx = this.toLinear(parseInt(x.slice(1, 3), 16));
		const gx = this.toLinear(parseInt(x.slice(3, 5), 16));
		const bx = this.toLinear(parseInt(x.slice(5, 7), 16));

		const ry = this.toLinear(parseInt(y.slice(1, 3), 16));
		const gy = this.toLinear(parseInt(y.slice(3, 5), 16));
		const by = this.toLinear(parseInt(y.slice(5, 7), 16));

		const r = Math.round(this.toSRGB(rx * a + ry * (1 - a)));
		const g = Math.round(this.toSRGB(gx * a + gy * (1 - a)));
		const b = Math.round(this.toSRGB(bx * a + by * (1 - a)));

		return "#" +
			r.toString(16).padStart(2, "0") +
			g.toString(16).padStart(2, "0") +
			b.toString(16).padStart(2, "0");
	}

	playAction(progress)
	{
		const localProgress = localizeProgress( progress, this.start, this.end )
		const easingProgress = Easing[ this.easing ]( localProgress )
		// console.log(localProgress)
		const color = this.blendColorGamma('#2c2e31', '#fffbf4', easingProgress)
		// console.log(easingProgress, color)
		this.fixedElement.style.backgroundColor = color
	}

}