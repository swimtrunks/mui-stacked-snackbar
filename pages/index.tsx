import { Key, useState } from "react";
import { styled, keyframes, css } from "@mui/system";
import Snackbars from "../src/components/Snackbar";
import {
  BUTTON_PROPS,
  TOAST_PROPERTIES,
} from "../src/components/snackProps.js";

const SnackControls = styled("div")(
  () => css`
  font-family: IBM Plex Sans, sans-serif;
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

const App = () => {
  const [list, setList]: any = useState([]);
  const [position, setPosition] = useState("Select Position");
  let [checkValue, setCheckValue] = useState(true);
  const [autoHideDuration, setAutoHideDuration] = useState(2000);
  const [snackbarQuanity, setSnackbarQuanity] = useState(4);
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <>
      <div className="app">
        <SnackControls>
          <h2>Stacked Snackbars</h2>
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
            autoComplete="false"
            onChange={(e) => setSnackbarQuanity(parseInt(e.target.value, 10))}
          />
          <br />
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
                style={{backgroundColor: e.backgroundColor}}
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
        snackbarMax={snackbarQuanity}
        openProp={isOpen}
        position={position}
        autoDelete={checkValue}
        autoHideDuration={autoHideDuration}
      />
    </>
  );
};

export default App;
