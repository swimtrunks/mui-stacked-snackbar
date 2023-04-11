// Your code goes here
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';
import SnackbarUnstyled from "@mui/base/SnackbarUnstyled";
import { styled, keyframes, css } from '@mui/system';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

//variables
const blue = {
  50: '#F0F7FF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};
const grey = {
  200: '#E0E3E7',
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
    
//buttons
const ShowLessButton = styled('div')(
    () => css `
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
)
const DeleteButton = styled(`div`)(
    () => css`
    visibility: hidden;
    position: absolute;
    left: -6px;
    bottom: 3.25rem;
    display:block;
    text-align: center;
    font-weight: 200;
    overflow: hidden;
    box-sizing:border-box;
    width:20px;
    height:20px;
    border-radius:100%;
    border: 1px solid black;
    box-shadow:${`0 5px 13px -3px rgba(0,0,0,0.4)`}
    `
)

//snackbar styling
const StyledSnackbar = styled(SnackbarUnstyled)(
  ({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 560px;
    justify-content: start;
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : '#CECFD0'};
    box-shadow: ${theme.palette.mode !== 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${slideFromTop} 500ms;
    transition: transform 0.2s ease-out;

    &:hover{
        box-shadow: 0 0 12px #fff;
        cursor: pointer;
        ${DeleteButton}{
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
        font-weight:400;
        text-align: left;
        height: 18px;
        margin-left: -1px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
  `,
);
const SnackbarText = styled('div')(
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
)
const SnackbarContainer = styled('div')(
    () => css`
    top: 1%;
    left:20%;
    font-size: 14px;
    box-sizing: border-box;
    position: fixed;
    z-index: 999999;
    & .snacks_open {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & ${ShowLessButton} {
           display: block;
          }
      }
    & .snacks_closed {
          & ${StyledSnackbar} {
            position: absolute;
            z-index: 5;
          }
          & ${StyledSnackbar}:nth-child(2) {
            top: 25px;
            z-index: 4;
            transform: scale(0.98);
            background-color: hsla(0, 0, 100%, 0.8);
          }
          & ${StyledSnackbar}:nth-child(3) {
            top: 35px;
            z-index: 3;
            transform: scale(0.96);
            background-color: hsla(0, 0, 100%, 0.8);
          }
          & ${StyledSnackbar}:nth-child(4) {
            z-index: 2;
            top: 45px;
            transform: scale(0.94);
          }
          & ${StyledSnackbar}:nth-child(n + 4):nth-child(-n + 10) {
            z-index: 1;
            top: 45px;
            transform: scale(0.94);
            background-color: hsla(0, 0, 100%, 0.8);
          }
    }
    `
)

export default function Snackbars(props: any) {
    const { snackList, autoDelete, autoHideDuration, openProp } = props;
    const [list, setList] = useState(snackList);
    const [open, setOpen] = useState(openProp);
    const [snacksView, setSnacksView] = useState('closed');
    const [snacksActive, setSnacksActive] = useState(false)



    useEffect(() => {
        setList([...snackList]);
        snackList.length < 1 ? setSnacksView('closed') : null ;
    }, [autoHideDuration, snackList]);

    useEffect(() => {
        if(!snacksActive && snacksView === 'open'){
                const collapse = setInterval(() => {
                    closeSnacks()
                // ** always allowing the snackbars to collapse before they are deleted
                }, (autoHideDuration - 500));

                return () => {
                    clearInterval(collapse);
                  };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snacksActive, snacksView]);

    // autoHide Implementation
    useEffect(() => {
      if (!snacksActive) {
        const interval = setInterval(() => {
          if (autoDelete && snackList.length && list.length) {
            deleteToast(snackList[0].id);
          }
        }, autoHideDuration);

        return () => {
          clearInterval(interval);
        };
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snacksActive, snackList, autoDelete, autoHideDuration, list]);

    const deleteToast = (id: any) => {
        const listItemIndex = list.findIndex((e: { id: any; }) => e.id === id);
        const toastListItem = snackList.findIndex((e: { id: any; }) => e.id === id);
        list.splice(listItemIndex, 1);
        snackList.splice(toastListItem, 1);
        setList([...list]);
        setOpen(false);
    }
    const handleClose = (_: any, reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const expandSnacks = () =>{
        snacksView === 'closed' ? setSnacksView('open') : null
    }     
    const closeSnacks = () =>{
        snacksView === 'open' ? setSnacksView('closed') : null
    }  
    const handleHover = () => {
        setSnacksActive(true)
    }
    const handleMouseOff =() => {
        setSnacksActive(false)
    }
    

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
                      onClick={deleteToast}
                      style={{ backgroundColor: snack.backgroundColor }}
                    >
                      x
                    </DeleteButton>

                    {/* should probably import icons */}
                    <div style={{ padding: ".5rem 1rem 0rem 1rem" }}>👍🏾</div>

                    <SnackbarText onClick={expandSnacks}>
                      <p className="snack-title">{snack.title}</p>
                      <p className="snack-message">
                        {snack.description}
                      </p>
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

