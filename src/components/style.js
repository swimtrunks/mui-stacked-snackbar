import { createTheme } from '@mui/material/styles';
import { styled, keyframes, css } from "@mui/system";
import SnackbarUnstyled from "@mui/base/SnackbarUnstyled";


//animations
const bounceAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateY(-2000px);
    }
    60% {
      opacity: 1;
      transform: translateY(30px);
    }
    80% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0);
    }
`
const slideFromTop = keyframes`
    100% {
      transform: translateY(0);
      opacity: 1;
    }
    75%{
      opacity: 0.5;
    }
    0%{
        transform: translateY(-100%);
        opacity: 0;
      }
`;
const fadeOut = keyframes`
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
    
    0%{
        transform: translateY(0);
        opacity: 1;
      }
`;
const expand = keyframes`
    100%{
      scale: 1;
      opacity: 1;
      top: 0;
    }
    30%{
      top: -10px;
    }
    0%{
      opacity: 0;
      top: -20px;
    }
  `;

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const SnackControls = styled("div")(
    () => css`

    justify-content: center;
    border-bottom: 1px solid grey;
    padding-bottom: 1rem;
    display: flex;
    width: 37rem;
    flex-direction: column;
    input {
      font-size: 1rem;
      border-radius: .5rem;
      padding: 1rem;
      margin-right: 1rem;
    }
    `
);
export const Buttons = styled("div")(
    () => css`
    button{
      cursor: pointer;
      padding: 1rem;
      margin-right: .5rem;
      border-radius: .5rem;
    }
    `
);

export const StyledHeader = styled('div')(
    () => css`
      font-size: 3rem;
      line-height: 2.75rem;
      .stacked{
        position:absolute;
        color: red;
        animation: ${bounceAnimation} 700ms forwards;

      }
  `
)

//variables
const blue = {
    50: "#F0F7FF",
    400: "#3399FF",
    600: "#0072E5",
    900: "#003A75",
};
const grey = {
    200: "#E0E3E7",
};

//buttons
export const ShowLessButton = styled("button")(
    () => css`
        display: none;
        cursor: pointer;
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 200;
        position: absolute;
        right: -6.5rem;
        top: 0rem;
        padding: .5rem 1rem;
        border-radius: .5rem;
        background-color: ${grey[200]};
      }`
);
export const DeleteButton = styled(`div`)(
    () => css`
        visibility: hidden;
        position: absolute;
        left: -6px;
        bottom: 3.75rem;
        background-color: ${grey[200]};
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 200;
        overflow: hidden;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 1px solid black;
        transition: 200ms all ease-in-out;
        &:hover {
          scale: 120%;
          box-shadow: ${`0 5px 13px -3px rgba(0,0,0,0.4)`};
        }
    `
);

//snackbar styling
export const StyledSnackbar = styled(SnackbarUnstyled)(
    ({ theme, ...props }) => css`
      position: relative;
      display: flex;
      flex-direction: row;
      height: 5rem;
      width: 560px;
      justify-content: start;
      align-items: center;
      background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === "dark" ? blue[600] : "#CECFD0"};
      box-shadow: ${theme.palette.mode !== "dark"
            ? `0 5px 13px -3px rgba(0,0,0,0.4)`
            : `0 5px 13px -3px #373e49`
        };
      padding: 0.75rem;
      color: ${theme.palette.mode === "dark" ? blue[50] : blue[900]};
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 600;
      animation: ${slideFromTop} 500ms;
      transition: 300ms all ease-in-out;
      & .fadeOut {
        animation: ${fadeOut} 700ms;
        transition: all ease-out;
      }
      &:hover {
        cursor: pointer;
        ${DeleteButton} {
          visibility: visible;
        }
      }
      & .snack-title {
        font-weight: 700;
        font-size: 16px;
        text-align: left;
        margin-top: 0;
        margin-bottom: 6px;
        width: 300px;
        height: 18px;
      }
  
      & .snack-message {
        margin: 0;
        font-weight: 400;
        text-align: left;
        height: 18px;
        margin-left: -1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
);
export const SnackbarText = styled("div")(
    () => css`
          width: 80%;
          .snack-title {
              font-weight: 700;
              font-size: 16px;
              text-align: left;
              margin-top: 0;
              margin-bottom: 6px;
              width: 300px;
              height: 18px;
            }
            .snack-message {
              margin: 0;
              text-align: left;
              height: 18px;
              margin-left: -1px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
      }`
);
export const SnackbarContainer = styled("div")(
    () => css`
      top: 18%;
      left: 53%;
      font-size: 14px;
      box-sizing: border-box;
      position: fixed;
      z-index: 999999;
    
  
      .snacks_open {
        ${StyledSnackbar}:not(:first-of-type) {
          margin-top: 1rem;
          animation: ${expand} 700ms forwards;
        }
        & ${ShowLessButton} {
          display: block;
        }
      }
      .snacks_closed {
        &:hover {
          ${StyledSnackbar}:not(:first-of-type) {
            margin-top: -3.5rem;
          }
        }
        ${StyledSnackbar}:not(:first-of-type) {
          margin-top: -4.5rem;
        }
        ${StyledSnackbar} {
          z-index: 5;
        }
        ${StyledSnackbar}:nth-of-type(2) {
          z-index: 4;
          transform: scale(0.98);
        }
        ${StyledSnackbar}:nth-of-type(3) {
          z-index: 3;
          transform: scale(0.96);
        }
        ${StyledSnackbar}:nth-of-type(4) {
          z-index: 2;
          transform: scale(0.94);
        }
        ${StyledSnackbar}:nth-of-type(n + 5):nth-of-type(-n + 10) {
          z-index: 1;
          transform: scale(0.92);
        }
      }
    `
);