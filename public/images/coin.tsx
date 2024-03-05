import React from "react";

const CoinSVG = ({
  fill,
  width,
  height,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width || "14"}
      height={height || "17"}
      viewBox={`0 0 ${width || 14} ${height || 17}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_160_1536)">
        <path
          d="M13.2573 12.7785C13.1233 12.8254 12.9816 12.8695 12.8329 12.9098C11.9734 13.1426 10.8839 13.2616 9.79983 13.2616C9.53662 13.2616 9.27317 13.2543 9.0127 13.2402V14.7288C9.26425 14.7428 9.52621 14.7507 9.79983 14.7507C12.3637 14.7507 13.9999 14.0941 13.9999 13.642V12.4253C13.8843 12.5025 13.7511 12.5739 13.6039 12.6405C13.4963 12.6894 13.3803 12.7355 13.2573 12.7788V12.7785Z"
          fill={fill || "white"}
        />
        <path
          d="M13.2573 10.6906C13.1233 10.7374 12.9816 10.7815 12.8329 10.8215C11.9734 11.0544 10.8839 11.1737 9.79983 11.1737C9.53662 11.1737 9.27317 11.1664 9.0127 11.1523V12.6407C9.26425 12.6547 9.52621 12.6626 9.79983 12.6626C12.3637 12.6626 13.9999 12.0061 13.9999 11.554V10.3374C13.8843 10.4146 13.7511 10.486 13.6039 10.5526C13.4963 10.6014 13.3803 10.6475 13.2573 10.6909V10.6906Z"
          fill={fill || "white"}
        />
        <path
          d="M13.2573 2.33395C13.1233 2.38094 12.9816 2.4249 12.8329 2.46521C11.9734 2.69811 10.8839 2.81699 9.79982 2.81699C8.71577 2.81699 7.6265 2.69811 6.76697 2.46521C6.61807 2.4249 6.47624 2.38118 6.34235 2.33395C6.21974 2.29084 6.10369 2.24458 5.99571 2.19564C5.84892 2.1291 5.71577 2.05758 5.6001 1.98047V3.19706C5.6001 3.42583 6.02001 3.70718 6.7671 3.9294C6.93223 3.97833 7.11398 4.0246 7.31024 4.06673C7.54654 4.11737 7.80429 4.16205 8.08237 4.19885C8.59142 4.26563 9.16742 4.30595 9.79995 4.30595C10.4325 4.30595 11.0085 4.26563 11.5175 4.19885C11.7956 4.16205 12.0535 4.11737 12.29 4.06673C12.4865 4.0246 12.6678 3.97821 12.8332 3.9294C13.5799 3.7073 14.0002 3.42608 14.0002 3.19706V1.98047C13.8845 2.05733 13.7513 2.1291 13.6042 2.19564C13.4962 2.24458 13.3805 2.29084 13.2575 2.33395H13.2573Z"
          fill={fill || "white"}
        />
        <path
          d="M13.2573 8.60006C13.1233 8.64681 12.9816 8.69077 12.8329 8.73108C11.9734 8.96362 10.8839 9.08286 9.79983 9.08286C9.53662 9.08286 9.27317 9.07557 9.0127 9.06149V10.5501C9.26425 10.5642 9.52621 10.5721 9.79983 10.5721C12.3637 10.5721 13.9999 9.91537 13.9999 9.46305V8.24658C13.8843 8.32381 13.7511 8.39509 13.6039 8.46175C13.4963 8.51032 13.3803 8.55671 13.2573 8.60006Z"
          fill={fill || "white"}
        />
        <path
          d="M6.76709 1.84086C6.93248 1.89004 7.11398 1.93606 7.31049 1.97819C7.54679 2.02919 7.80478 2.07364 8.08262 2.11031C8.59191 2.17734 9.16729 2.21753 9.8002 2.21753C10.4331 2.21753 11.0085 2.17746 11.5178 2.11031C11.7959 2.074 12.0537 2.02919 12.2897 1.97844C12.4864 1.9363 12.6677 1.89004 12.8333 1.84074C13.58 1.61901 13.9999 1.33778 13.9999 1.10864C13.9999 0.656564 12.3638 0 9.8002 0C7.2366 0 5.6001 0.656564 5.6001 1.10864C5.6001 1.33766 6.02001 1.61889 6.76709 1.84074V1.84086Z"
          fill={fill || "white"}
        />
        <path
          d="M13.2572 6.51242C13.1232 6.55917 12.9815 6.60337 12.8328 6.64344C11.9733 6.87622 10.8838 6.99522 9.79971 6.99522C9.4558 6.99522 9.11152 6.98186 8.77393 6.95806C8.9253 7.12854 9.01258 7.32028 9.01258 7.5363V8.46256C9.26413 8.47628 9.52634 8.48429 9.79996 8.48429C12.3636 8.48429 13.9997 7.82785 13.9997 7.37565V6.15918C13.8843 6.23617 13.7509 6.30757 13.6041 6.37423C13.4961 6.42317 13.3801 6.46931 13.2572 6.51266V6.51242Z"
          fill={fill || "white"}
        />
        <path
          d="M13.2573 4.42184C13.1233 4.46883 12.9818 4.51267 12.8329 4.5531C11.9734 4.786 10.8839 4.905 9.79982 4.905C8.71577 4.905 7.6265 4.78588 6.76697 4.5531C6.6177 4.51267 6.476 4.46895 6.34235 4.42184C6.21974 4.37849 6.10369 4.33235 5.99546 4.28353C5.84867 4.21699 5.71589 4.14547 5.6001 4.06836V5.28495C5.6001 5.51385 6.02001 5.79495 6.7671 6.01705C6.93223 6.0661 7.11398 6.11249 7.31049 6.15426C7.54642 6.20526 7.80454 6.25007 8.08237 6.2865C8.59167 6.3534 9.16742 6.39372 9.79995 6.39372C10.4325 6.39372 11.0082 6.3534 11.5175 6.2865C11.7956 6.25007 12.0535 6.20526 12.2898 6.15475C12.4863 6.11225 12.6678 6.0661 12.8332 6.01705C13.5799 5.79495 14.0002 5.51397 14.0002 5.28495V4.06836C13.8845 4.14535 13.7516 4.21675 13.6042 4.28353C13.4966 4.33235 13.3808 4.37849 13.2575 4.42184H13.2573Z"
          fill={fill || "white"}
        />
        <path
          d="M8.00433 14.8896C7.89672 14.9385 7.78068 14.9849 7.65769 15.0282C7.52367 15.075 7.38197 15.119 7.23332 15.1591C6.37378 15.3918 5.28402 15.511 4.20021 15.511C3.11641 15.511 2.02677 15.3917 1.16724 15.1591C1.01809 15.119 0.876759 15.075 0.74274 15.0282C0.620126 14.9849 0.504084 14.9385 0.396099 14.8896C0.252534 14.8245 0.12273 14.7547 0.0085468 14.6798C0.00606725 14.6778 0.00284385 14.6767 0.000488281 14.6748V15.8913C0.000488281 16.3436 1.63661 17.0003 4.20021 17.0003C6.76381 17.0003 8.40031 16.3436 8.40031 15.8913V14.6748C8.39759 14.6767 8.39461 14.6778 8.39188 14.6798C8.27795 14.7549 8.14814 14.8248 8.00433 14.8896Z"
          fill={fill || "white"}
        />
        <path
          d="M8.00421 10.7113C7.8966 10.7598 7.78081 10.8062 7.65757 10.8496C7.55504 10.8854 7.44669 10.919 7.33548 10.9511C7.30114 10.961 7.26816 10.9715 7.2332 10.9808C6.74808 11.1121 6.18882 11.2058 5.60005 11.2638C5.14456 11.3086 4.67233 11.3326 4.19985 11.3326C3.72737 11.3326 3.25514 11.3086 2.80002 11.2638C2.21101 11.2057 1.65187 11.112 1.167 10.9808C1.13055 10.9709 1.09583 10.9602 1.06025 10.95C0.950409 10.9182 0.843417 10.8852 0.742375 10.8497C0.619762 10.8063 0.503719 10.7601 0.395487 10.7114C0.251922 10.6461 0.122737 10.5764 0.00880238 10.5013C0.0059509 10.4994 0.00285147 10.4979 0 10.4961V11.7129C0 11.9338 0.391644 12.203 1.08964 12.4212C1.1153 12.4292 1.14047 12.4371 1.167 12.4453C1.33238 12.4943 1.51413 12.5407 1.71051 12.5826C1.8914 12.6212 2.08939 12.6553 2.29544 12.6863C2.35792 12.6957 2.4178 12.7061 2.48239 12.7145C2.58492 12.728 2.69216 12.7397 2.80002 12.7508C3.22775 12.7953 3.69477 12.8217 4.19997 12.8217C4.70518 12.8217 5.1722 12.7953 5.59992 12.7508C5.70791 12.7396 5.8149 12.728 5.91755 12.7145C5.98239 12.706 6.04203 12.6958 6.10476 12.6863C6.31081 12.6555 6.50855 12.6212 6.68968 12.5828C6.88619 12.5403 7.06769 12.4942 7.23308 12.4451C7.25824 12.4375 7.2818 12.43 7.30635 12.4224C8.00682 12.2041 8.40032 11.9341 8.40032 11.7131V10.4961C8.39735 10.498 8.39437 10.4995 8.39164 10.5012C8.27796 10.5762 8.14852 10.6461 8.00434 10.7114L8.00421 10.7113Z"
          fill={fill || "white"}
        />
        <path
          d="M8.00433 12.802C7.89672 12.8508 7.78068 12.8972 7.65769 12.9405C7.55665 12.9756 7.44991 13.0088 7.34006 13.0404C7.30448 13.0506 7.26977 13.0617 7.23332 13.0715C6.74857 13.2028 6.18931 13.2965 5.60017 13.3546C5.14505 13.3993 4.67244 13.4233 4.20022 13.4233C3.72799 13.4233 3.25551 13.3993 2.80027 13.3546C2.21137 13.2964 1.65199 13.2027 1.16724 13.0715C1.13066 13.0617 1.09607 13.0508 1.06037 13.0404C0.950773 13.0088 0.843905 12.9757 0.74274 12.9405C0.620126 12.8972 0.504084 12.851 0.396099 12.802C0.251046 12.7361 0.12025 12.6657 0.00557135 12.5899C0.00395964 12.589 0.00197601 12.5879 0.000488281 12.5869V13.8035C0.000488281 14.0244 0.391388 14.2937 1.08913 14.5118C1.82035 14.7403 2.88829 14.9124 4.20034 14.9124C5.51239 14.9124 6.58033 14.7403 7.31155 14.5118C8.00954 14.2937 8.40044 14.0244 8.40044 13.8035V12.5869C8.39771 12.5885 8.39511 12.5899 8.39238 12.5918C8.27845 12.6669 8.14839 12.7369 8.00446 12.8021L8.00433 12.802Z"
          fill={fill || "white"}
        />
        <path
          d="M8.00433 8.62337C7.89635 8.67231 7.78068 8.71833 7.65769 8.76168C7.55665 8.7969 7.4499 8.83005 7.34043 8.86186C7.30485 8.87206 7.26989 8.88299 7.23332 8.89295C6.74857 9.02421 6.1893 9.11795 5.60016 9.17587C5.14504 9.22068 4.67244 9.24472 4.20021 9.24472C3.72799 9.24472 3.25551 9.22068 2.80026 9.17587C2.21137 9.11783 1.65199 9.02409 1.16724 8.89295C1.13091 8.88299 1.09607 8.87218 1.06062 8.8621C0.950897 8.83029 0.843781 8.79726 0.74274 8.7618C0.620126 8.7187 0.504084 8.67243 0.396099 8.6235C0.250798 8.55768 0.119258 8.48677 0.00433157 8.41075C0.0030918 8.41002 0.00160408 8.40917 0.000488281 8.4082V9.62504C0.000488281 9.84555 0.392008 10.1154 1.08988 10.3333C1.11566 10.3415 1.14083 10.3495 1.16736 10.3574C1.33275 10.4063 1.51437 10.4526 1.71063 10.4947C1.89064 10.5333 2.08715 10.5671 2.29171 10.5979C2.35568 10.6074 2.41668 10.6181 2.48276 10.6268C2.58529 10.6403 2.69253 10.652 2.80039 10.663C3.22786 10.7075 3.69488 10.7338 4.20034 10.7338C4.70579 10.7338 5.17257 10.7075 5.60029 10.663C5.70827 10.6521 5.81527 10.6403 5.91792 10.6268C5.98276 10.6182 6.04264 10.6078 6.10537 10.5985C6.31142 10.5677 6.50917 10.5337 6.6903 10.4948C6.8868 10.4528 7.06806 10.4063 7.23344 10.3575C7.2601 10.3496 7.28551 10.3415 7.31117 10.3333C8.00892 10.1154 8.40031 9.84592 8.40031 9.62516V8.4082C8.39759 8.4099 8.39461 8.4116 8.39163 8.4133C8.27795 8.48835 8.14814 8.55841 8.00433 8.6235V8.62337Z"
          fill={fill || "white"}
        />
        <path
          d="M5.60017 6.4978C5.17282 6.4536 4.7048 6.42773 4.20022 6.42773C3.69563 6.42773 3.22749 6.45348 2.80026 6.4978C1.0564 6.67885 0.000488281 7.17331 0.000488281 7.5365C0.000488281 7.75713 0.391016 8.02598 1.08702 8.24394C1.11368 8.25244 1.13984 8.2607 1.16736 8.26883C1.33275 8.31801 1.51437 8.36403 1.71088 8.40617C1.89126 8.44478 2.08826 8.47878 2.2932 8.50963C2.35655 8.51898 2.4173 8.52966 2.48276 8.53816C2.58529 8.55164 2.69253 8.56318 2.80039 8.57447C3.22811 8.61867 3.69513 8.64502 4.20034 8.64502C4.70555 8.64502 5.17257 8.61867 5.60029 8.57447C5.70827 8.56318 5.81527 8.55164 5.91792 8.53816C5.98375 8.52954 6.04413 8.51898 6.10785 8.50963C6.31266 8.47854 6.50954 8.44478 6.69017 8.40617C6.88668 8.36403 7.06818 8.31801 7.23357 8.26883C7.2596 8.26106 7.2844 8.25305 7.30956 8.24528C8.00817 8.02707 8.40056 7.75774 8.40056 7.5365C8.40056 7.17331 7.34428 6.67861 5.60041 6.4978H5.60017Z"
          fill={fill || "white"}
        />
      </g>
      <defs>
        <clipPath id="clip0_160_1536">
          <rect
            width={width || "14"}
            height={height || "17"}
            fill={fill || "white"}
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CoinSVG;
