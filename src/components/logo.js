import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  const Forge = () => (
    <svg viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill={fillColor} d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z">
        </path>
      </g>
    </svg>
  )

  const Castle = () => (
    <svg fill="none"
      viewBox="0 0 14 14"
      role="img"
      focusable="false"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill={fillColor} d="m 11.47358,10.947144 -0.178454,-3.6714105 -1.6087947,0 -0.169909,3.4967005 c -0.029256,-0.002 -0.058616,-0.003 -0.088133,-0.005 -0.1445086,-0.008 -0.2919611,-0.0147 -0.442175,-0.0211 l 0,-1.5655705 -4.1119962,0 0,1.5717205 c -0.1324988,0.006 -0.2627572,0.0126 -0.3905667,0.0198 l -0.051582,-1.0613105 -0.1183527,-2.43539 -1.608769,0 -0.1784019,3.6714105 C 1.5773572,11.075004 1,11.243764 1,11.428784 l 3.4319954,0 4.9963202,0 3.5716844,0 c 0,-0.18502 -0.577305,-0.35378 -1.52642,-0.48164 z m 0.115201,-5.0924805 -0.448584,0 0,0.28386 c 0,0.1282 -0.103946,0.23212 -0.23212,0.23212 -0.128227,0 -0.232121,-0.10392 -0.232121,-0.23212 l 0,-0.28386 -0.370324,0 0,0.28386 c 0,0.1282 -0.103894,0.23212 -0.232121,0.23212 -0.128226,0 -0.2321201,-0.10392 -0.2321201,-0.23212 l 0,-0.28386 -0.4485838,0 0,1.1773 2.1959739,0 0,-1.1773 z m -6.981536,0 -0.4485838,0 0,0.28386 c 0,0.1282 -0.1039462,0.23212 -0.2321725,0.23212 -0.1282263,0 -0.2321204,-0.10392 -0.2321204,-0.23212 l 0,-0.28386 -0.3702725,0 0,0.28386 c 0,0.1282 -0.1039461,0.23212 -0.2321725,0.23212 -0.1281742,0 -0.2320683,-0.10392 -0.2320683,-0.23212 l 0,-0.28386 -0.4485837,0 0,1.1773 2.1959737,0 0,-1.1773 z m 4.3789216,2.26514 -0.6890408,0 0,0.12161 c 0,0.14448 -0.1170762,0.26161 -0.2615848,0.26161 -0.1445086,0 -0.261637,-0.11713 -0.261637,-0.26161 l 0,-0.12161 -0.5820986,0 0,0.12161 c 0,0.14448 -0.1171804,0.26161 -0.261689,0.26161 -0.1444565,0 -0.2615849,-0.11713 -0.2615849,-0.26161 l 0,-0.12161 -0.5821507,0 0,0.12161 c 0,0.14448 -0.1170762,0.26161 -0.2615848,0.26161 -0.1445087,0 -0.2616891,-0.11713 -0.2616891,-0.26161 l 0,-0.12161 -0.6889365,0 0,0.67979 4.1119962,0 0,-0.67979 z m -0.5939,-1.65222 -1.3733661,-2.36482 c -0.00266,-0.17157 -0.02316,-0.38851 -0.076071,-0.65824 0.1890309,-0.12787 0.4452752,-0.2978 0.679584,-0.29765 0.2647892,1.1e-4 0.3671201,0.32542 0.6857321,0.20422 0.2231065,-0.0829 0.4245641,-0.22529 0.6194828,-0.35883 -0.4238608,0.16009 -0.6494162,0.33718 -0.8954742,-0.0579 -0.2761999,-0.44392 -0.8585329,-0.38679 -1.3080285,-0.31121 -0.00438,-0.0134 -0.0087,-0.0267 -0.013182,-0.0403 l -0.131587,0.0436 c 0.2146136,0.6476 0.2860213,1.10436 0.2984219,1.41351 l -1.4097342,2.42758 2.9242222,0 z m -2.6390606,1.21007 0.252076,0 0.081099,0 0.5821507,0 0.4421751,0 0.081099,0 0.5820986,0 0.3331749,0 -0.083105,-0.91769 -2.1877154,0 z">
        </path></g></svg>
  )

  return (
    <>
    <Forge></Forge>
    </>
  );
};
