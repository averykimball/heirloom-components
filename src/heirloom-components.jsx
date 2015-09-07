var React = require('react');
require('es6-shim'); // Maybe dump es6 shim and just grab Object.assign only.

var TextProgress = React.createClass({
  getDefaultProps: function() {
    return {
      scale: 10, // Number of characters used for representation
      numerator: 0,
      denominator: 100, // Support tiers, reflected in scale(s), if boundary String, equal
      fulfilledStyle: {
        fontFamily: "Monospace",
      },
      unfulfilledStyle: {
        fontFamily: "Monospace",
      },
      partialStyle: {
        fontFamily: "Monospace",
      }, 
      _wrapStyle: {
        whiteSpace: "pre-wrap"
      },
      charset: {
        fulfilled: ["X"],
        partial: ">",
        unfulfilled: "|"
      },
      direction: "ltr",
      messages: ["30%"], // For floating on top of fulfilled
      floatingText: "",
      round: true
    };
  },
  componentWillUpdate: function(nextProps, nextState) {
    // Sanitize props, with useful errors?
  },
  render: function() {

    var normalized = (this.props.numerator / this.props.denominator) * this.props.scale;
    var fulfilled = Math.floor(normalized);
    var partial = normalized - fulfilled;
    var remaining = this.props.scale - normalized;
    
    var fulfilledString = "";
    var partialString = "";
    var unfulfilledString = "";

    for (var i = 0; i < fulfilled; i++) {
     fulfilledString = fulfilledString.concat(this.props.charset.fulfilled[0]);
    }
    
    for (var j = 0; j < remaining; j++) {
      unfulfilledString = unfulfilledString.concat(this.props.charset.unfulfilled);
    }

    if (partial > 0) {
      console.log("partial is bigger than 0: ", partial);
      var partialLen = this.props.charset.partial.length;
      unfulfilledString = unfulfilledString.substring(0,unfulfilledString.length - partialLen);
      partialString = this.props.charset.partial;
    }
    
    var fulfilledStyle = Object.assign({}, this._wrap, this.props.fulfilledStyle);
    
    var fulfilledComponent = (
      <span
        className="fulfilled"
        style={fulfilledStyle}>
        {fulfilledString}
      </span>
    );

    var partialStyle = Object.assign({}, this._wrap, this.props.partialStyle);
    
    var partialComponent = (
      <span
        className="partial"
        style={partialStyle}>
        {partialString}
      </span>
    );
    
    var unfulfilledStyle = Object.assign({}, this._wrap, this.props.unfulfilledStyle);
    
    var unfulfilledComponent = (
      <span
        className="unfulfilled"
        style={unfulfilledStyle}>
        {unfulfilledString}
      </span>
    );
    
    return (
      <div className="TextProgress-container">
        {fulfilledComponent}{partialComponent}{unfulfilledComponent}
      </div>
    );
  }

});

module.exports = {

  TextProgress: TextProgress
  
};

// Possible ideas and todos
//
// A variable charSet ie. numerical, alphabetical, a phrase, etc, or
// a percentage in place of the partial characters or
// a "floating" percentage that stays on top of the progress bar,
// taking up unfulfilled characters (until end/edge)
//
// How to style arb denominators/scales?
//
// Scale 0 is non-normalized, but with remaining (1:1)
// Scale -1 is numerator only, (1:1)
//
// Message bumps up against last character in scale
//
// Option to extend message past end of scale characters
//
// Mid-bar label
//
// Sanitize:
// Numerator not larger than denominator
// Denominator not 0
// Numerator and Denominator not less than 0
// Scale either -1, 0, or greater than 0
// Message not longer than scale



