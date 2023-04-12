import { Key, useRef, useState } from "react";
import { styled, keyframes, css } from "@mui/system";
import Snackbars from "../src/components/Snackbar";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BUTTON_PROPS,
  TOAST_PROPERTIES,
} from "../src/components/snackProps.js";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const SnackControls = styled("div")(
  () => css`
  font-family: 'DM Sans', sans-serif;
  font-size: 3rem;
  input {
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    margin-right: 1rem;
  }
  `
);
const Buttons = styled("div")(
  ()=>css`
  button{
    cursor: pointer;
    padding: 1rem;
    margin-right: .5rem;
    border-radius: .5rem;
  }
  `
)

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

const StyledHeader = styled('div')(
  ()=>css`
  line-height: 2.75rem;
  .stacked{
    position:absolute;
    color: red;
    animation: ${bounceAnimation} 700ms forwards;

  }
  
  `
)

const App = () => {
  const [list, setList]: any = useState([]);
  const [position, setPosition] = useState("Select Position");
  let [checkValue, setCheckValue] = useState(true);
  const [autoHideDuration, setAutoHideDuration] = useState(2000);
  const [snackbarQuanity, setSnackbarQuanity] = useState(4);
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const closeRef = useRef(null)


  const addSnack = (type: any) => {
    if (list.length >= snackbarQuanity) {
      return;
    }
    const toastProperties = TOAST_PROPERTIES.find(
      (toast: { title: string }) => toast.title.toLowerCase() === type
    );
    setList([...list, toastProperties]);
    setIsOpen(true);
  };

  //fix this!
  const onCheckBoxChange = () => {
    checkValue = !checkValue;
    setCheckValue(checkValue);
    setList([]);
  }
  const onThemeChange = () =>{}
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <SnackControls>
          <StyledHeader>
            <div className="stacked">stacked</div> <br />
            snackbars 🍟🍟
          </StyledHeader>
          <p className="description">
            For this project I leaned heavily on the way that Apple does their notification stack. So in order to expand them you must click on the stack itself but one thing that I incorprated that Apple did not is when you hover over the stack they spread a bit to invite the user to interact and click on them to expand the list. I chose to have the animation fade in from the top after the stack is expanded as I was trying to solve quickly for when the user puts this stack in a corner of the viewport and didnt want the stack to fall off screen when expanded. Also do deal with the issue of the stack not getting to long even when collapsed i just tucked all the snacks after 4 behind the last card. 
          </p>
          <br />

          <input
            type="number"
            name="dismiss"
            placeholder="2000"
            min={2000}
            max={10000}
            step={500}
            autoComplete="false"
            onChange={(e) => setAutoHideDuration(parseInt(e.target.value, 10))}
          />
          <input
            type="number"
            name="quanity"
            placeholder="4"
            max={8}
            autoComplete="false"
            onChange={(e) => setSnackbarQuanity(parseInt(e.target.value, 10))}
          />
          <br />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={onCheckBoxChange} />}
              label={`snack auto-hide (current setting: ${checkValue})`}
            />
            <FormControlLabel
              disabled
              control={<Checkbox onChange={onThemeChange}/>}
              label = {`${theme} Mode!`}
            />
          </FormGroup>
        </SnackControls>
        <br />
        <Buttons>
          {BUTTON_PROPS.map(
            (e: {
              backgroundColor: string;
              id: Key | null | undefined;
              label: any;
              type: any;
            }) => (
              <button
                key={e.id}
                style={{ backgroundColor: e.backgroundColor }}
                onClick={() => addSnack(e.type)}
              >
                {e.label}
              </button>
            )
          )}
        </Buttons>
      </div>

      <Snackbars
        snackList={list}
        closeRef = {closeRef}
        theme = {darkTheme}
        snackbarMax={snackbarQuanity}
        openProp={isOpen}
        position={position}
        autoDelete={checkValue}
        autoHideDuration={autoHideDuration}
      />
    </ThemeProvider>
  );
};

export default App;
