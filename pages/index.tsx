import { Key, useRef, useState } from "react";
import { styled, keyframes, css } from "@mui/system";
import Snackbars from "../src/components/Snackbar";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel'; 
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {darkTheme , SnackControls, Buttons, StyledHeader } from '../src/components/style.js'
import {
  BUTTON_PROPS,
  TOAST_PROPERTIES,
} from "../src/components/snackProps.js";

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
          <section className="description">
            <h3>What is this:</h3> For starters, this is a Snackbars component made to display multiple Snackbar components on screen. I had a lot of fun with messing around with this. I took some time to read into the MUI docs and found some other implementations for similar snackbar components. 
            <br />
            <h3>Findings:</h3>
            I know that notistack is a viable option here but I figured you would want me to actually try without the library (I also see you all have them in your docs!) and there is a new expirmental api that you all are working on for styled snackbars that I came across but this is my crack at a simple version of it. 
            <br />
            <h3>Rambling about the process:</h3>
            I also wanted to include a little voice memo of me talking through my process more in depth as to not take up too much space here. I will also include more in the README. Thank you for taking a look at this and I hope you enjoy it! <br />

            -Malcolm
          </section>
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
              id: Key | number;
              label: string;
              type: string;
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
