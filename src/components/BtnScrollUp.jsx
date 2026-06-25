import { ArrowUpCircle } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

function BtnScrollUp() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility)
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible ? (<div className="btn-scroll-wrapper position-fixed d-flex">
                        <ArrowUpCircle className="btn-scroll-up align-self-end" size={50} onClick={scrollToTop} />
                    </div>)
                    : null
        

    )
}

export default BtnScrollUp;