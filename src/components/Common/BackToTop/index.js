import React, { useEffect, useRef } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import './styles.css';

function BackToTop() {
    const btnRef = useRef(null);

    useEffect(() => {
        window.onscroll = function () {
            if (btnRef.current) {
                if (
                    document.body.scrollTop > 500 ||
                    document.documentElement.scrollTop > 500
                ) {
                    btnRef.current.style.display = "flex";
                } else {
                    btnRef.current.style.display = "none";
                }
            }
        };

        return () => {
            window.onscroll = null;
        };
    }, []);

    return (
        <div
            ref={btnRef}
            className="back-top-top-btn"
            id="top-btn"
            onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}
        >
            <ExpandLessRoundedIcon />
        </div>
    );
}

export default BackToTop;