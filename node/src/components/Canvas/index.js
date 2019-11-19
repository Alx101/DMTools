import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import makeContext from "./utils";

const Cv = styled.div`
  display: flex;
  flex: 1;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Canvas = () => {
  const canvasRef = React.useRef();
  React.useEffect(() => {
    if (canvasRef.current !== undefined) {
      const ctx = makeContext(canvasRef.current.getContext("2d"));
      ctx.rect(5, 5, 50, 50, "blue");
      console.log(ctx);
    }
  }, [canvasRef]);

    return (
      <Cv>
        <StyledCanvas ref={canvasRef}/>
      </Cv>
    );
};

export default Canvas;
