import React from 'react'
import styles from '../../styles/Button.module.css';

const Button = () => {
  return (
    <div>
      <a
        className={`${styles.btn} z-[10] eltdf-btn eltdf-btn-medium eltdf-btn-outline top-[40px] relative text-white border border-solid border-[#C9AB81] px-[51px] py-[13px]`}
        href="https://laurent.qodeinteractive.com/gallery-page/"
        target="_self"
      >
        <span className={`${styles.style1} h-[47.6px] left-[44.6px]`}></span>
        <span className="eltdf-btn-text">View More</span>
        <span className={`${styles.style2} absolute w-[1px] top-[9px] h-[47.6px] left-[183.475px]`}></span>
      </a>
    </div>
  )
}

export default Button
