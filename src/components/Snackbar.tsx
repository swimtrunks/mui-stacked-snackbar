// Your code goes here
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import SnackbarUnstyled from "@mui/base/SnackbarUnstyled";
import { styled, keyframes, css } from "@mui/system";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";

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
const slideFromTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  
  to {
      transform: translateY(0);
      opacity: 1;
    }
    `;
const expand = keyframes`
  100%{
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
const fadeOutAnimation = keyframes `
100%{
  opacity: 1;
  top: 0;
}
0%{
  opacity: 0;
  top: -20px;
}
`
const hide = keyframes`
0%{
  margin-top: 0;
}
30%{
  opacity: 1;
}
60%{
}
80%{
}
100%{
  margin-top: -50%;
}
`;
//buttons
const ShowLessButton = styled("div")(
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
const DeleteButton = styled(`div`)(
  () => css`
    visibility: hidden;
    position: absolute;
    left: -6px;
    bottom: 3.25rem;
    display: block;
    text-align: center;
    font-weight: 200;
    overflow: hidden;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid black;
    box-shadow: ${`0 5px 13px -3px rgba(0,0,0,0.4)`};
    & .fadeOut {
      animation: ${fadeOutAnimation} 700ms
      transition: all ease-out;
    }
  `
);

//snackbar styling
const StyledSnackbar = styled(SnackbarUnstyled)(
  ({ theme , ...props }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 560px;
    justify-content: start;
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? blue[600] : "#CECFD0"};
    box-shadow: ${theme.palette.mode !== "dark"
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px #373e49`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? blue[50] : blue[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${props.open === false ? css`${fadeOutAnimation} 500ms` : css`${slideFromTop} 500ms`};
    transition: transform 0.2s ease-out;
    
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
const SnackbarText = styled("div")(
  () => css`
        width: 100%;
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
const SnackbarContainer = styled("div")(
  () => css`
    top: 18%;
    left: 53%;
    font-size: 14px;
    box-sizing: border-box;
    position: fixed;
    z-index: 999999;
    & .snacks_open {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      ${StyledSnackbar} {
        transition: all 0.2s ease-out;
        animation: ${expand} 700ms forwards;
      }
      & ${ShowLessButton} {
        display: block;
      }
    }
    & .snacks_closed {
      &:hover{
        ${StyledSnackbar}:nth-of-type(3){
          margin-top: .5rem;
        }
        ${StyledSnackbar}:nth-of-type(4){
          margin-top: 1rem;
        }
        ${StyledSnackbar}:nth-of-type(5){
          margin-top: 1.5rem;
        }
      }
      ${StyledSnackbar} {
        position: absolute;
        transition: all 0.2s ease-in;
      }
      ${StyledSnackbar}:nth-of-type(2) {
        top: 25px;
        z-index: 4;
        transition: all 0.2s ease-in;
        background-color: hsla(0, 0, 100%, 0.8);
      }
      ${StyledSnackbar}:nth-of-type(3) {
        top: 35px;
        z-index: 3;
        transform: scale(0.96);
        transition: all 0.2s ease-in;
        background-color: hsla(0, 0, 100%, 0.8);
      }
      ${StyledSnackbar}:nth-of-type(4) {
        z-index: 2;
        top: 45px;
        transform: scale(0.92);
        transition: all 0.2s ease-in;
      }
      ${StyledSnackbar}:nth-of-type(n + 5):nth-of-type(-n + 10) {
        z-index: 1;
        top: 50px;
        transform: scale(0.90);
        transition: all 0.2s ease-in-out;
        background-color: hsla(0, 0, 100%, 0.8);
      }
    }
  `
);

export default function Snackbars(props: any) {
  const { snackList, checkValue, autoDelete, autoHideDuration, closeRef, openProp, theme} = props;
  const [list, setList] = useState(snackList);
  const [open, setOpen] = useState(openProp);
  const [snacksView, setSnacksView] = useState("closed");
  const [snacksActive, setSnacksActive] = useState(false);


  useEffect(() => {
    setList([...snackList]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoHideDuration, snackList]);

  useEffect(() => {
    if (!snacksActive && snacksView === "open") {
      const collapse = setInterval(() => {
        closeSnacks();
        // ** always allowing the snackbars to collapse before they are deleted
      }, autoHideDuration - 500);

      return () => {
        clearInterval(collapse);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snacksActive, snacksView]);

  // autoHide Implementation
  useEffect(() => {
    if (!checkValue && !snacksActive) {
      const interval = setInterval(() => {
        if (autoDelete && snackList.length && list.length) {
          deleteSnack(snackList[0].id);
        }
      }, autoHideDuration);
      return () => {
        clearInterval(interval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snacksActive, snackList, autoDelete, autoHideDuration, list]);

  const deleteSnack = (id: any) : any => {
    // closeRef.current.classList.add('fadeOut');
    snackList.length <= 1 ? setSnacksView("closed") : null;
    const listItemIndex = list.findIndex((e: { id: any }) => e.id === id);
    const snackListItem = snackList.findIndex((e: { id: any }) => e.id === id);
    list.splice(listItemIndex, 1);
    snackList.splice(snackListItem, 1);
    setList([...list]);
  };
  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const expandSnacks = () => {
    snacksView === "closed" ? setSnacksView("open") : null;
  };
  const closeSnacks = () => {
    snacksView === "open" ? setSnacksView("closed") : null;
  };
  const handleHover = () => {
    setSnacksActive(true);
  };
  const handleMouseOff = () => {
    setSnacksActive(false);
  };

  return (
    <>
      <SnackbarContainer>
        <div
          className={`snacks_${snacksView}`}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOff}
        >
          <ShowLessButton onClick={closeSnacks}> show less </ShowLessButton>
          {list
            .map(
              (
                snack: {
                  fontColor: string | undefined;
                  backgroundColor: any;
                  id: any;
                  icon: string | undefined;
                  title: string;
                  description: string;
                },
                i: Key | null | undefined
              ) => (
                <StyledSnackbar
                  theme={theme}
                  style={{
                    backgroundColor: snack.backgroundColor,
                    color: snack.fontColor,
                  }}
                  key={i}
                  open={true}
                  autoHideDuration={autoHideDuration}
                  onClose={handleClose}
                >
                  <DeleteButton
                    ref={closeRef}
                    onClick={() => deleteSnack(snack.id)}
                    style={{ backgroundColor: snack.backgroundColor }}
                  >
                    x
                  </DeleteButton>

                  {/* should probably import icons */}
                  <div style={{ padding: ".5rem 1rem 0rem 1rem" }}>👍🏾</div>
                  <SnackbarText onClick={expandSnacks}>
                    <p className="snack-title">{snack.title}</p>
                    <p className="snack-message">{snack.description}</p>
                  </SnackbarText>
                </StyledSnackbar>
              )
            )
            .reverse()}
        </div>
      </SnackbarContainer>
    </>
  );
}
