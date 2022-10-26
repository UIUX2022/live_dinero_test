import "./priceFilter.scss";
import { Slider, Switch } from "antd";
import React, { useState } from "react";

const Pricefilter = () => {
  const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };
  return (
    <>
      <div className="PriceFilter">
        <h6>Low prices</h6>
              <Slider range defaultValue={[2000, 5000]} disabled={disabled} />
              <div class="d-flex pt-2 justify-content-between align-items-center">
                  <span>QAR</span>
                  <button>Apply</button>
              </div>
      </div>
    </>
  );
};
export default Pricefilter;
