
import { useRef, useState } from "react";
import "./App.css";
import Header from "./layout/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Screenshot from "./shared/Screenshot";
import { DrawingApp } from "./shared/DrawingApp";
import { FormDataProvider, FormData } from "./shared/FormDataContext";

import Template1 from "./component/tempalate1/Template1";
import Template2 from "./component/tempalate2/Template2";
import Template3 from "./component/template3/Template3";
import Template4 from "./component/template4/Template4";
import Template5 from "./component/template5/Template5";
import Template6 from "./component/template6/Template6";
import Template7 from "./component/template7/Template7";
import Template8 from "./component/template8/Template8";
import Template9 from "./component/template9/Template9";
import Template10 from "./component/template10/Template10";
import Template11 from "./component/template11/Template11";
import Template12 from "./component/template12/Template12";
import Template13 from "./component/template13/Template13";
import Template14 from "./component/template14/Template14";
import Template15 from "./component/template15/Template15";
import Template16 from "./component/template16/Template16";
import Template17 from "./component/template17/Template17";
import Template18 from "./component/template18/Template18";
import Template19 from "./component/template19/Template19";
import Template20 from "./component/template20/Template20";
import Template21 from "./component/template21/Template21";


function App() {
  const divRef = useRef<HTMLDivElement>(null);
  const handleCaptureScreenshot = () => {
    Screenshot.handleCaptureScreenshot(divRef);
  };
  const [value, setValue] = useState("template1");
  const [size, setSize] = useState("small");
  const [transactionType, setTransactionType] = useState("deposit");
  const [
    { cursor, canvasRef, color },
    { startDrawing, draw, endDrawing, ...api },
  ] = DrawingApp();
  const toolbarProps = { color, ...api };

  // Global form data state
  const [formData, setFormData] = useState<FormData>({
    time: "",
    date: "",
    sender: "",
    amount: "",
    receiver: "",
    txid: "",
    fee: "",
    referenceNo: ""
  });

  // Set canvas dimensions based on template
  const getCanvasDimensions = () => {
    switch (value) {
      case "template7":
        return { width: 500, height: 801 };
      default:
        return { width: 370, height: 800 };
    }
  };

  const dimensions = getCanvasDimensions();

  return (
    <div className="app">
      <div className="app__container">
        <Sidebar
          screenshot={handleCaptureScreenshot}
          value={value}
          setvalue={setValue}
          setSize={setSize}
          size={value}
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          formData={formData}
          setFormData={setFormData}
          {...toolbarProps}
        />
        <main className="app__main">
          <div className="content" ref={divRef}>
            <div className="app__canvas">
              <canvas
                ref={canvasRef as any}
                width={dimensions.width}
                height={dimensions.height}
                style={{ cursor }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
              />
            </div>

            <FormDataProvider value={{ formData, setFormData }} >
              {value === "template1" && <Template1 formData={formData} />}
              {value === "template2" && <Template2 formData={formData} />}
              {value === "template3" && <Template3 formData={formData} />}
              {value === "template4" && <Template4 formData={formData} />}
              {value === "template5" && <Template5 formData={formData} />}
              {value === "template6" && <Template6 formData={formData} />}
              {value === "template7" && <Template7 formData={formData} />}
              {value === "template8" && <Template8 formData={formData} />}
              {value === "template9" && <Template9 formData={formData} />}
              {value === "template10" && <Template10 formData={formData} />}
              {value === "template11" && <Template11 formData={formData} />}
              {value === "template12" && <Template12 formData={formData} />}
              {value === "template13" && <Template13 formData={formData} />}
              {value === "template14" && <Template14 formData={formData} />}
              {value === "Template15" && <Template15 formData={formData} />}
              {value === "template16" && <Template16 formData={formData} />}

              {value === "template17" && <Template17 formData={formData} />}
              {value === "template18" && <Template18 formData={formData} />}
              {value === "template19" && <Template19 formData={formData} />}
              {value === "template20" && <Template20 formData={formData} />}

              {value === "template21" && <Template21 formData={formData} />}





            </FormDataProvider>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
