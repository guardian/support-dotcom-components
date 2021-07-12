import React, { useState, useEffect } from 'react';

const NUM_ANIMATION_STAGES = 6;
const ANIMATION_STAGE_DURATION_MS = 1000;

const SoundWaves: React.FC = () => {
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStage(stage => (stage + 1) % NUM_ANIMATION_STAGES);
        }, ANIMATION_STAGE_DURATION_MS);

        return () => clearInterval(interval);
    }, []);

    const fill = (isOn: boolean) => (isOn ? '#04FFFF' : ' #C4C4C4');

    return (
        <>
            <svg viewBox="0 100 800 500" xmlns="http://www.w3.org/2000/svg">
                <g fill={fill(animationStage >= 1)}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M133.631 522.852C133.631 522.836 133.631 522.82 133.631 522.804C133.631 512.188 128.472 502.779 120.525 496.946L112.811 507.707C117.415 511.142 120.403 516.631 120.403 522.804C120.403 522.82 120.403 522.836 120.403 522.852H133.631Z"
                        // fill="#04FFFF"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M159.069 522.854C159.069 522.837 159.069 522.82 159.069 522.802C159.069 503.673 149.722 486.723 135.347 476.271L127.633 487.032C138.665 495.086 145.841 508.116 145.841 522.802C145.841 522.82 145.841 522.837 145.841 522.854H159.069Z"
                        // fill="#04FFFF"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M184.507 522.854C184.508 522.837 184.508 522.821 184.508 522.804C184.508 495.228 170.94 470.729 150.138 455.639L142.453 466.359C159.914 479.032 171.279 499.604 171.279 522.804C171.279 522.821 171.279 522.837 171.279 522.854H184.507Z"
                        // fill="#04FFFF"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M209.947 522.852C209.947 522.835 209.947 522.819 209.947 522.803C209.947 486.713 192.19 454.673 164.959 434.964L157.274 445.684C181.164 462.975 196.719 491.089 196.719 522.803C196.719 522.819 196.719 522.835 196.719 522.852H209.947Z"
                        // fill="#04FFFF"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M235.385 522.853C235.385 522.836 235.385 522.819 235.385 522.802C235.385 478.199 213.439 438.618 179.78 414.29L172.067 425.05C202.383 446.981 222.157 482.643 222.157 522.802C222.157 522.819 222.157 522.836 222.157 522.853H235.385Z"
                        // fill="#04FFFF"
                    />
                </g>
                <g fill={fill(animationStage >= 2)}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M260.823 522.854C260.823 522.837 260.823 522.82 260.823 522.803C260.823 469.686 234.688 422.563 194.6 393.617L186.887 404.377C223.631 430.927 247.595 474.13 247.595 522.803C247.595 522.82 247.595 522.837 247.595 522.854H260.823Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M286.263 522.855C286.263 522.838 286.263 522.82 286.263 522.803C286.263 461.172 255.938 406.508 209.423 372.944L201.709 383.704C244.881 414.872 273.035 465.616 273.035 522.803C273.035 522.82 273.035 522.838 273.035 522.855H286.263Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M311.7 522.853C311.7 522.836 311.7 522.818 311.7 522.801C311.7 452.656 277.186 390.451 224.241 352.268L216.528 363.028C266.129 398.814 298.471 457.1 298.471 522.801C298.471 522.818 298.471 522.836 298.471 522.853H311.7Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M337.139 522.854C337.139 522.837 337.139 522.819 337.139 522.802C337.139 459.917 312.616 400.696 268.15 356.23C259.061 347.141 249.356 338.886 239.13 331.503L231.421 342.256C241.058 349.222 250.21 357.012 258.788 365.591C300.813 407.616 323.911 463.377 323.911 522.802C323.911 522.819 323.911 522.837 323.911 522.854H337.139Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M362.577 522.855C362.577 522.837 362.577 522.82 362.577 522.803C362.577 453.101 335.409 387.571 286.16 338.22C276.068 328.149 265.299 319.001 253.957 310.82L246.257 321.56C257.018 329.327 267.231 338.014 276.798 347.582C323.606 394.389 349.349 456.662 349.349 522.803C349.349 522.82 349.349 522.837 349.349 522.855H362.577Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M388.016 522.853C388.016 522.837 388.016 522.82 388.016 522.804C388.016 446.285 358.304 374.345 304.171 320.211C293.088 309.149 281.259 299.102 268.797 290.118L261.116 300.832C272.989 309.405 284.257 318.999 294.809 329.573C346.399 381.264 374.788 449.846 374.788 522.804C374.788 522.82 374.788 522.837 374.788 522.853H388.016Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                </g>
                <g fill={fill(animationStage >= 3)}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M413.455 522.852C413.455 522.836 413.455 522.819 413.455 522.803C413.455 439.567 380.995 361.217 322.08 302.301C310.019 290.24 297.144 279.288 283.58 269.497L275.884 280.232C288.863 289.611 301.181 300.104 312.718 311.662C369.192 368.034 400.227 443.027 400.227 522.803C400.227 522.819 400.227 522.836 400.227 522.852H413.455Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M438.893 522.854C438.893 522.837 438.893 522.819 438.893 522.802C438.893 432.749 403.788 347.988 340.09 284.289C327.039 271.239 313.105 259.389 298.421 248.794L290.726 259.529C304.823 269.711 318.201 281.102 330.728 293.651C391.985 354.805 425.665 436.209 425.665 522.802C425.665 522.819 425.665 522.837 425.665 522.854H438.893Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M464.333 522.855C464.333 522.838 464.333 522.82 464.333 522.803C464.333 473.757 454.768 426.34 435.842 381.568C417.526 338.424 391.375 299.554 358.102 266.28C344.099 252.278 329.124 239.537 313.251 228.11L305.554 238.847C320.768 249.827 335.209 262.11 348.74 275.641C414.779 341.68 451.105 429.392 451.105 522.803C451.105 522.82 451.105 522.838 451.105 522.855H464.333Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M489.871 522.855C489.865 470.469 479.587 419.609 459.345 371.8C439.706 325.501 411.825 284.087 376.11 248.371C361.088 233.35 345.041 219.696 328.051 207.464L320.288 218.292C336.696 230.103 352.184 243.27 366.646 257.733C401.141 292.126 428.106 332.217 447.032 376.887C466.671 423.084 476.541 472.231 476.541 522.803C476.541 522.82 476.541 522.837 476.541 522.855H489.871Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M515.007 522.855C515.007 522.839 515.007 522.822 515.007 522.805C515.007 467.044 504.119 412.809 482.547 361.83C461.688 312.581 431.874 268.317 393.919 230.363C377.965 214.409 360.896 199.893 342.811 186.876L335.219 197.468C352.754 210.085 369.299 224.16 384.761 239.623C421.495 276.458 450.393 319.195 470.54 366.917C491.4 416.268 501.982 468.672 501.982 522.805C501.982 522.822 501.982 522.839 501.982 522.855H515.007Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                </g>
                <g fill={fill(animationStage >= 4)}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M540.75 522.852C540.75 522.802 540.75 522.751 540.75 522.7C540.75 463.378 529.15 405.886 506.255 351.753C484.072 299.451 452.427 252.441 412.132 212.146C395.156 195.17 377.03 179.739 357.836 165.914L349.977 176.876C368.624 190.298 386.223 205.265 402.669 221.711C441.743 260.784 472.472 306.37 493.943 357.044C516.125 409.549 527.42 465.311 527.42 522.802C527.42 522.819 527.42 522.836 527.42 522.852H540.75Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M566.087 522.854C566.087 522.837 566.087 522.82 566.087 522.803C566.087 460.123 553.774 399.273 529.557 341.986C506.153 286.631 472.676 236.975 430.041 194.34C412.085 176.384 392.883 160.052 372.534 145.412L364.799 156.202C384.539 170.4 403.17 186.251 420.578 203.701C461.992 245.217 494.553 293.449 517.244 347.175C540.75 402.733 552.655 461.954 552.655 522.803C552.655 522.82 552.655 522.837 552.655 522.854H566.087Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M591.322 522.852C591.322 522.835 591.322 522.819 591.322 522.802C591.322 456.661 578.399 392.556 552.859 332.114C528.133 273.809 492.824 221.405 447.848 176.43C428.929 157.51 408.694 140.301 387.259 124.871L379.667 135.462C400.552 150.493 420.262 167.261 438.69 185.689C482.445 229.444 516.838 280.423 540.852 337.202C565.68 396.016 578.297 458.391 578.297 522.802C578.297 522.819 578.297 522.835 578.297 522.852H591.322Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M616.963 522.852C616.963 522.835 616.963 522.818 616.963 522.801C616.963 453.201 603.328 385.636 576.465 322.142C550.518 260.784 513.377 205.633 466.062 158.317C446.129 138.384 424.805 120.257 402.213 104.011L394.547 114.705C416.556 130.539 437.338 148.215 456.802 167.678C502.998 213.875 539.121 267.499 564.458 327.331C590.711 389.198 603.939 455.033 603.939 522.801C603.939 522.818 603.939 522.835 603.939 522.852H616.963Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M642.403 522.854C642.403 522.837 642.403 522.819 642.403 522.802C642.403 449.742 628.055 378.921 599.869 312.272C572.599 247.861 533.627 190.064 483.971 140.408C463.049 119.486 440.682 100.461 416.984 83.4087L409.311 94.1115C432.415 110.736 454.224 129.283 474.609 149.668C523.045 198.103 561.101 254.577 587.659 317.359C615.132 382.38 629.073 451.472 629.073 522.7C629.073 522.751 629.073 522.803 629.073 522.854H642.403Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                </g>
                <g fill={fill(animationStage >= 5)}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M431.838 62.687L424.168 73.386C448.426 90.8318 471.316 110.31 492.722 131.759C543.498 182.637 583.386 241.756 611.266 307.591C640.056 375.751 654.709 448.182 654.715 522.852H667.842C667.842 522.835 667.842 522.818 667.842 522.802C667.842 446.384 652.884 372.205 623.375 302.402C594.782 234.938 553.979 174.395 501.982 122.398C480.077 100.493 456.655 80.5563 431.838 62.687Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M446.627 42.0598L438.951 52.7665C464.312 71.0103 488.248 91.3692 510.631 113.752C563.747 166.868 605.466 228.734 634.568 297.622C664.789 368.952 680.052 444.657 680.052 522.805C680.052 522.821 680.052 522.838 680.052 522.854H693.178C693.178 522.804 693.178 522.753 693.178 522.703C693.178 442.826 677.508 365.391 646.677 292.433C616.863 222.018 574.227 158.727 519.891 104.39C497.011 81.511 472.544 60.7063 446.627 42.0598Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M461.467 21.3574L453.791 32.066C480.276 51.1158 505.271 72.3712 528.641 95.7407C584.097 151.299 627.648 215.811 658.073 287.751C689.515 362.236 705.49 441.299 705.49 522.804C705.49 522.821 705.49 522.837 705.49 522.854H718.82C718.813 439.535 702.431 358.76 670.283 282.664C639.146 209.197 594.68 143.158 538.002 86.481C514.107 62.5851 488.547 40.8417 461.467 21.3574Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M476.286 0.684082L468.561 11.4598C496.152 31.3169 522.192 53.4704 546.55 77.829C604.448 135.626 649.729 202.987 681.477 277.878C714.242 355.415 730.929 437.836 730.929 522.801C730.929 522.818 730.929 522.835 730.929 522.852H744.056C744.056 522.835 744.056 522.818 744.056 522.801C744.056 436.106 727.063 351.956 693.585 272.689C661.227 196.169 614.929 127.485 555.912 68.4676C531.041 43.5968 504.453 20.9668 476.286 0.684082Z"
                        // fill="white"
                        // fillOpacity="0.4"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2727 575.382C-6.21717 549.269 1.58449 514.733 27.6971 498.244C53.8096 481.754 88.3451 489.555 104.835 515.668C117.247 535.324 115.896 559.752 103.333 577.663H11.791C11.2694 576.919 10.7631 576.159 10.2727 575.382Z"
                        fill="white"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M87.7782 530.063L84.295 535.297L98.4268 557.676C97.3389 562.001 92.9218 570.459 87.1283 576.066L86.1016 574.44L84.1749 571.389L67.6073 545.153L61.3003 546.588L60.4468 545.236L86.8363 528.572L87.7782 530.063ZM83.9999 577.663L83.855 577.433C83.855 577.433 83.7557 577.497 83.7065 577.528C83.634 577.574 83.5614 577.619 83.4886 577.663L83.9999 577.663ZM68.4423 577.663C60.5352 573.995 52.1462 565.36 44.8969 553.469C32.0163 533.77 28.96 515.066 39.9003 508.157C39.9496 508.126 40.0498 508.064 40.0498 508.064L39.0815 506.531C21.9871 515.792 7.30842 542.153 23.4936 567.085C26.1196 571.362 29.1642 574.859 32.4866 577.663L68.4423 577.663ZM42.3361 504.379C49.3689 501.308 59.3594 500.892 63.9968 502.147L72.7166 515.955L71.1372 516.952L43.2984 505.903L42.3361 504.379Z"
                        fill="black"
                    />
                </g>
            </svg>
        </>
    );
};

export default SoundWaves;
