import React, { useState } from "react";
// Frame.
import Frame from "react-frame-component";
// Jss.
// Generate style sheets using create()
import { create } from "jss";
// Material
import { StylesProvider, jssPreset } from "@material-ui/styles";

import "./materialFrame.css";

const MaterialFrame = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [ownerDocument, setOwnerDocument] = useState(null);

  const handleRef = ref => {
    // Get the top-level Document object in which the child node is created.
    // If this property is used on a node that is itself a document, the value is null.
    setOwnerDocument(ref ? ref.ownerDocument : null);
    setReady(true);
  };

  return (
    <Frame>
      {/*  
        jss-insertion-point. 
        This must exist in DOM before jss is inserted.  
      */}
      <div id="jss-insertion-point" ref={handleRef} />
      {ready ? (
        <StylesProvider
          jss={create({
            ...jssPreset(),
            // Custom insertion point.
            insertionPoint: ownerDocument.querySelector("#jss-insertion-point")
          })}
          // De-duplicate style sheet injection.
          sheetsManager={new Map()}
        >
          {children}
        </StylesProvider>
      ) : null}
    </Frame>
  );
};
export default MaterialFrame;
