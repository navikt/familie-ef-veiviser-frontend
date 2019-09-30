import React from 'react';

interface IBallIkonProps {
  className?: string;
}

const BallIkon: React.FC<IBallIkonProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g id="gjenstander/familie/ball">
            <g id="Group">
              <circle
                id="Oval"
                fill="#E7E9E9"
                fill-rule="nonzero"
                cx="16"
                cy="16"
                r="16"
              ></circle>
              <path
                d="M7.87893635,2.20515209 C10.2294848,0.803845098 12.9695764,-1.42108547e-14 15.8952305,-1.42108547e-14 C20.7529818,-1.42108547e-14 25.0991516,2.21613879 28,5.70367869 C24.3246011,4.77481674 20.5294699,5.43640604 16.6146063,7.6884466 C12.340034,10.147411 9.78824783,12.9179288 8.95924765,16 C7.17163578,12.6666667 6.60728282,9 7.26618878,5 C7.42980808,4.00672138 7.63405727,3.07510541 7.87893635,2.20515209 Z"
                id="Combined-Shape"
                fill="#66CBEC"
                fill-rule="nonzero"
              ></path>
              <path
                d="M4.3622466,26.9816949 C4.06858387,25.9643217 3.95346898,24.9402458 4.01690194,23.9094674 C4.2183174,20.6364891 5.55177994,18 8.01728956,16 C9.25258108,20.6666667 12.0039517,24 16.2714014,26 C20.1698408,27.8270581 24.0793736,27.9850456 28,26.4739623 C25.077929,29.858942 20.7641958,32 15.9523763,32 C11.3857901,32 7.26781427,30.0716179 4.3622466,26.9816949 Z"
                id="Combined-Shape"
                fill="#FA96A0"
                fill-rule="nonzero"
              ></path>
              <circle
                id="Oval-Copy"
                fill="#FFFFFF"
                fill-rule="nonzero"
                cx="8"
                cy="16"
                r="4"
              ></circle>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BallIkon;
