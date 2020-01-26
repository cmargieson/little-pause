import React, { useState, useEffect } from "react";
// Components.
import Page from "./components/Page";
// Frame.
import MaterialFrame from "./components/MaterialFrame";
// Material.
import { CircularProgress } from "@material-ui/core";

const App = ({ removeApp, fetchData }) => {
  const [artObject, setArtObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const callback = artObject => {
      setArtObject(artObject);
      setIsLoading(false);
    };
    fetchData(callback);
  }, [fetchData]);

  return (
    <div>
      <MaterialFrame>
        {isLoading ? (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Page artObject={artObject} removeApp={removeApp} />
        )}
      </MaterialFrame>
    </div>
  );
};

export default App;
