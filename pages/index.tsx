import { Key, useRef, useState } from "react";
import Snackbars from "../src/components/Snackbar";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { TextField, Link } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  darkTheme,
  SnackControls,
  Buttons,
  StyledHeader,
} from "../src/components/style.js";
import {
  BUTTON_PROPS,
  SNACK_PROPERTIES,
} from "../src/components/snackProps.js";

const App = () => {
  const [list, setList]: any = useState([]);
  const [checkValue, setCheckValue] = useState(false);
  const [autoHideDuration, setAutoHideDuration] = useState(2000);
  const [snackbarQuanity, setSnackbarQuanity] = useState(2);
  const [isOpen, setIsOpen] = useState(true);
  const closeRef = useRef(null);

  const addSnack = (type: any) => {
    if (list.length >= snackbarQuanity) {
      return;
    }
    const snackProperties = SNACK_PROPERTIES.find(
      (snack: { title: string }) => snack.title.toLowerCase() === type
    );
    setList([...list, snackProperties]);
    setIsOpen(true);
  };

  const onCheckBoxChange = () => {
    checkValue ? setCheckValue(false) : setCheckValue(true);
    setList([]);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <StyledHeader>
          <div className="stacked">stacked</div> <br />
          snackbars 🍟🍟
        </StyledHeader>
        <SnackControls>
          <h3>🍪 snackbar controls:</h3>
          <TextField
            label="auto-hide timer"
            type="number"
            name="dismiss"
            placeholder="2000"
            inputProps={{ min: 2000 }}
            autoComplete="false"
            onChange={(e) => setAutoHideDuration(parseInt(e.target.value, 10))}
          />
          <TextField
            margin="normal"
            label="snack quanity"
            type="number"
            name="quanity"
            placeholder="2"
            inputProps={{ min: 2, max: 5 }}
            autoComplete="false"
            onChange={(e) => setSnackbarQuanity(parseInt(e.target.value, 10))}
          />
          <br />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={onCheckBoxChange} />}
              label={`snack auto-hide (current setting: ${checkValue})`}
            />
          </FormGroup>
          <h3>🍿 add a snackbar: </h3>
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
        </SnackControls>
        <section className="description">
          <h3>What This Is:</h3>
          <p>
            This is a Snackbar(s) component made to display multiple Snackbar
            components on screen utilizing the {" "}
            <Link href="https://mui.com/base/react-snackbar/" target="_blank" rel="noreferrer" underline="always">
              MUI SnackbarUnstyled Component as a base
            </Link>
            . Wrapping it in a provider of sorts, each time a specified event is
            triggered (in this case a button press) a specific snackbar is
            displayed. The component also takes in some control props in order
            to customize the way it behaves such as an autohide timer and the
            amount of snackbars that can be displayed at one time.
          </p>
          <p>More info included in the README</p>
        </section>
      </div>

      <Snackbars
        snackList={list}
        closeRef={closeRef}
        theme={darkTheme}
        snackbarMax={snackbarQuanity}
        openProp={isOpen}
        autoDelete={checkValue}
        autoHideDuration={autoHideDuration}
      />
    </ThemeProvider>
  );
};

export default App;
