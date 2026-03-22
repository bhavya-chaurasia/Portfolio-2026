import React from "react";

import cscreen3 from "../../assets/Project1/cscreen3.png";
import profilePop1 from "../../assets/Project1/profile-pop1.png";
import profilePop2 from "../../assets/Project1/profile-pop2.png";
import profilePop3 from "../../assets/Project1/profile-pop3.png";

interface CarouselCard3Props {
  children?: React.ReactNode;
}

const CarouselCard3 = ({ children }: CarouselCard3Props) => {
  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "0", overflow: "hidden" }}>
        {/* Base image */}
        <img 
          src={cscreen3} 
          alt="UI Screen 3" 
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0" }} 
        />
        
        {/* Profile popup 1 - Green mouse */}
        <img 
          src={profilePop1} 
          alt="Profile Popup 1" 
          className="anim-popup-1"
          style={{ 
            position: "absolute", 
            top: "12%", 
            left: "30%", 
            width: "12.5%", 
            pointerEvents: "none" 
          }} 
        />
        
        {/* Profile popup 2 - Blue mouse */}
        <img 
          src={profilePop2} 
          alt="Profile Popup 2" 
          className="anim-popup-2"
          style={{ 
            position: "absolute", 
            top: "50%", 
            right: "20%", 
            width: "12.5%", 
            pointerEvents: "none" 
          }} 
        />
        
        {/* Profile popup 3 - Pink mouse */}
        <img 
          src={profilePop3} 
          alt="Profile Popup 3" 
          className="anim-popup-3"
          style={{ 
            position: "absolute", 
            top: "60%", 
            left: "15%", 
            width: "12.5%", 
            pointerEvents: "none" 
          }} 
        />
        
        {children}
      </div>

      <style>{`
        @keyframes popup1 {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          15%, 65% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          70%, 100% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
        }

        @keyframes popup2 {
          0%, 15% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          30%, 65% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          70%, 100% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
        }

        @keyframes popup3 {
          0%, 30% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          45%, 65% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          70%, 100% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
        }

        .anim-popup-1 {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
        }

        .anim-popup-2 {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
        }

        .anim-popup-3 {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
        }

        .carousel-card-active .anim-popup-1,
        .carousel-card-active .anim-popup-2,
        .carousel-card-active .anim-popup-3 {
          animation-iteration-count: 1;
          animation-fill-mode: both;
        }

        .carousel-card-active .anim-popup-1 {
          animation: popup1 4s ease-in-out 1 both;
        }

        .carousel-card-active .anim-popup-2 {
          animation: popup2 4s ease-in-out 1 both;
        }

        .carousel-card-active .anim-popup-3 {
          animation: popup3 4s ease-in-out 1 both;
        }
      `}</style>
    </>
  );
};

export default CarouselCard3;
