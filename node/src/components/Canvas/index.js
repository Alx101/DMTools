import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Forge from "../../forge";
import { useWindowSize } from "../../utils/hooks";
import makeContext from "./utils";

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Canvas = () => {
  const canvasRef = React.useRef();
  const containerRef = React.useRef();
  const [forge, setForge] = React.useState(undefined);
  const size = useWindowSize();

  React.useEffect(() => {
    if (
      canvasRef.current !== undefined &&
      containerRef.current !== undefined &&
      forge === undefined
    ) {
      setForge(new Forge("renderer", containerRef.current));
    }
  }, [canvasRef, containerRef, forge]);

  React.useEffect(() => {
    if (forge !== undefined) {
      forge.resize();
    }
  }, [forge, size]);

  return (
    <Container ref={containerRef}>
      <StyledCanvas id="renderer" ref={canvasRef} />
    </Container>
  );
};

export default Canvas;
