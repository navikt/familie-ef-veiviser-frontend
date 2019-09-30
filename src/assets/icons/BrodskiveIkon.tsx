import React from 'react';

interface IBrodskiveIkonProps {
  className?: string;
}

const BrodskiveIkon: React.FC<IBrodskiveIkonProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg width="31px" height="16px" viewBox="0 0 31 16">
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="gjenstander/familie/brødskive"
            transform="translate(0.000000, -12.000000)"
          >
            <g id="Group" transform="translate(0.000000, 12.727273)">
              <rect
                id="Rectangle"
                fill="#D8A25D"
                fill-rule="nonzero"
                x="3.875"
                y="5.09090909"
                width="23.25"
                height="5.09090909"
              ></rect>
              <rect
                id="Rectangle-Copy"
                fill="#F5A096"
                fill-rule="nonzero"
                x="5.16666667"
                y="3.81818182"
                width="20.6666667"
                height="1.27272727"
                rx="0.636363636"
              ></rect>
              <path
                d="M15.5,14 C24.0604136,14 31,11.7207224 31,8.90909091 C31,8.90909091 0,8.90909091 0,8.90909091 C0,11.7207224 6.93958638,14 15.5,14 Z"
                id="Oval"
                fill="#FFE5C2"
                fill-rule="nonzero"
              ></path>
              <path
                d="M7.75,12.7272727 L23.25,12.7272727 L23.25,14.6363636 C23.25,14.9878176 22.6717011,15.2727273 21.9583333,15.2727273 L9.04166667,15.2727273 C8.32829886,15.2727273 7.75,14.9878176 7.75,14.6363636 L7.75,12.7272727 Z"
                id="Rectangle"
                fill="#66CBEC"
                fill-rule="nonzero"
              ></path>
              <path
                d="M10.3333333,3.81818182 C9.61996553,3.81818182 9.04166667,3.24836241 9.04166667,2.54545455 C9.04166667,1.84254668 9.61996553,1.27272727 10.3333333,1.27272727 L17.8484848,1.27272727 C18.8486365,1.27272727 19.7880305,0.848484848 20.6666667,1.78079773e-13 C21.5277778,0.424242424 21.9583333,1.06060606 21.9583333,1.90909091 C21.9583333,3.18181818 20.5422842,3.81818182 18.6675686,3.81818182 L10.3333333,3.81818182 Z"
                id="Line-11"
                fill="#FADC50"
                fill-rule="nonzero"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BrodskiveIkon;
