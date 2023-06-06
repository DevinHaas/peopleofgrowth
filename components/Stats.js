import {IconBook, IconBrain, IconClockHour5} from "@tabler/icons-react";
import {useEffect, useRef} from "react";

export default function Stats() {
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const pagesRef = useRef(null);
    const yearRef = useRef(null);
    const daysRef = useRef(null);


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateValue(pagesRef.current, 0, 1976, 2000);
                animateValue(yearRef.current, 0, 2400, 1500);
                animateValue(daysRef.current, 0, 96, 2300);
                observer.unobserve(pagesRef.current);
            }
        });

        if (pagesRef.current) {
            observer.observe(pagesRef.current);

        }

        return () => {
            if (pagesRef.current) {
                observer.unobserve(pagesRef.current);
            }
        };
    }, []);

    return (
        <div className="mt-4 mb-4 mt-lg-1 row gy-5 gx-4 g-xl-5">
            <h2 className="section-title text-center mb-0 mb-lg-4">
                <span className="p-0">Stats</span>
            </h2>
            <div className="mt-0 col-12 col-md-4">
                <div className="card quote-card py-2 mt-lg-5">
                    <div className=" quote-text d-flex flex-column align-items-center">
                        <IconBook size={100}></IconBook>
                        <h1 id="pages" ref={pagesRef}></h1>
                        <p>Pages read</p>
                    </div>
                </div>
            </div>
            <div className="mt-0 col-12 col-md-4">
                <div className="card quote-card mt-lg-5 py-2 mt-lg-5">
                    <div className="quote-text d-flex flex-column align-items-center">
                        <IconBrain size={100}></IconBrain>
                        <h1 id="years" ref={yearRef}></h1>
                        <p>Years of knowledge learned</p>
                    </div>
                </div>
            </div>
            <div className="mt-0 col-12 col-md-4 mb-sm-2">
                <div className="card quote-card mt-lg-0 py-2 mt-lg-5">
                    <div className="quote-text d-flex flex-column align-items-center">
                        <IconClockHour5 size={100}></IconClockHour5>
                        <h1 id="days" ref={daysRef}></h1>
                        <p>Days spend reading</p>
                    </div>
                </div>
            </div>
        </div>

    )
}