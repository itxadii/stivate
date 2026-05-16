'use client'
import Spline from '@splinetool/react-spline'

export default function SplineHero() {
    function onLoad() {
        const watermark = document.querySelector('#spline-watermark') as HTMLElement
        if (watermark) watermark.style.display = 'none'
    }

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Spline
                scene="https://prod.spline.design/I5dqnBPHdTVUculw/scene.splinecode"
                onLoad={onLoad}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}