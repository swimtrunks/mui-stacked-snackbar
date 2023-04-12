// Your code goes here
import {
  useState,
  useEffect,
  Key,
} from "react";
import { SnackbarCloseReason } from "@mui/base/useSnackbar";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CloseIcon from '@mui/icons-material/Close';
import {SnackbarContainer, ShowLessButton, StyledSnackbar, DeleteButton, SnackbarText, } from './style.js'



export default function Snackbars(props: any) {
  const {
    snackList,
    checkValue,
    autoDelete,
    autoHideDuration,
    closeRef,
    openProp,
    theme,
  } = props;
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

  const deleteSnack = (id: any): any => {
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
                    style={{
                      color: "black",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </DeleteButton>
                  <div style={{ padding: ".5rem 1rem 0rem 1rem" }}>
                    {/* another way to implement variants with conditionals*/}
                    {snack.title === "Danger" && <ErrorIcon />}
                    {snack.title === "Success" && <CheckCircleTwoToneIcon />}
                    {snack.title === "Warning" && <WarningTwoToneIcon />}
                    {snack.title === "Info" && <InfoTwoToneIcon />}
                  </div>
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
