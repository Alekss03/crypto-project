import React from "react";
import "./styles.css"
import Button from "../../Common/Button";
import Phone from '../../../assets/Phone.png'
import Gradient from '../../../assets/Gradient.png'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function MainComponent() {
    const navigate = useNavigate();

    return (
        <div className="flex-info">
            <div className="left-component">
                <motion.h1 
                    className="track-crypto-heading"
                    initial={{opacity:0, y: 50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration:0.5}}
                >
                    Track Crypto
                </motion.h1>
                <motion.h1
                    className="real-time-heading"
                    initial={{opacity:0, y: 50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration:0.5, delay: 0.5}}
                >
                    Real Time.
                </motion.h1>
                <motion.p 
                    className="info-text"
                    initial={{opacity:0, y: 50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration:0.5, delay: 1}}
                >
                    Track crypto through a public api in real time. Visit the dashboard to do so!
                </motion.p>
                <motion.div 
                    className="btn-flex"
                    initial={{opacity:0, x: 50}}
                    animate={{opacity:1, x:0}}
                    transition={{duration:0.5, delay: 1.5}}
                >
                    <Button text={"Dashboard"} onClick={() => navigate('/dashboard')}/>
                    <Button text={"Share"} outlined={true} onClick={() => {}}/>
                </motion.div>
            </div>
            <div className="phone-container">
                <motion.img 
                    src={Phone} 
                    className="iphone"
                    alt="phone"
                    initial={{y: -10}}
                    animate={{y: 10}}
                    transition={{
                        type: "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity,   
                    }}
                />
                <img src={Gradient} className="gradient" alt="gradient"/>
            </div>
        </div>
    );
}

export default MainComponent;