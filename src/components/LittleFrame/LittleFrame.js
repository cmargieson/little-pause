/* global chrome */

import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { jssPreset, StylesProvider } from "@material-ui/styles";
import NoSsr from "@material-ui/core/NoSsr";

import { create } from "jss";
import rtl from "jss-rtl";

import Frame from "react-frame-component";

import "./littleFrame.css";

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.default,
    backgroundColor: "pink",
    width: "100%",
    height: "100%",
    position: "fixed"
  }
});

class LittleFrame extends React.Component {
  state = {
    ready: false
  };

  handleRef = ref => {
    this.contentDocument = ref ? ref.node.contentDocument : null;
    this.contentWindow = ref ? ref.node.contentWindow : null;
  };

  onContentDidMount = () => {
    this.setState({
      ready: true,
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: this.contentWindow["little-frame-jss"]
      }),
      sheetsManager: new Map(),
      container: this.contentDocument.body
    });
  };

  onContentDidUpdate = () => {
    this.contentDocument.body.dir = this.props.theme.direction;
  };

  render() {
    const { children, classes } = this.props;

    return (
      <NoSsr>
        <Frame
          ref={this.handleRef}
          className={classes.root}
          contentDidMount={this.onContentDidMount}
          contentDidUpdate={this.onContentDidUpdate}
        >
          <div id="little-frame-jss" />
          {this.state.ready ? (
            <StylesProvider
              jss={this.state.jss}
              sheetsManager={this.state.sheetsManager}
            >
              {React.cloneElement(children, {
                container: this.state.container
              })}
            </StylesProvider>
          ) : null}
        </Frame>
      </NoSsr>
    );
  }
}

LittleFrame.propTypes = {
  // Anything that can be rendered.
  // children: PropTypes.node.isRequired,
  // A React element.
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LittleFrame);
