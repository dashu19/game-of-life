function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class Game extends React.Component {
  /*state = {
                                                                                                                                                                                                                                                  mydata: this.createRandomData(10, 10),
                                                                                                                                                                                                                                                  numrows: 10,
                                                                                                                                                                                                                                                  numcols: 10,
                                                                                                                                                                                                                                                  dummy: "123"
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              fn = () => {
                                                                                                                                                                                                                                                ...
                                                                                                                                                                                                                                              }*/
  constructor(props) {
    super(props);_defineProperty(this, "changeCell",







    (i, j) => {
      //let newval = (this.state.mydata[i][j] == 'dead' ? 'alive':'dead');
      //let newgrid = this.state.mydata;
      //newgrid[i][j] = newval;
      this.state.mydata[i][j] = this.state.mydata[i][j] == 'dead' ? 'alive' : 'dead';
      //this.setState({mydata: this.state.mydata});
      this.forceUpdate();
    });_defineProperty(this, "createBlankData",

    (numrows, numcols) => {
      var newdata = [];
      for (var i = 0; i < numrows; i++) {
        var newrow = [];
        for (var j = 0; j < numcols; j++) {
          newrow.push("dead");
        }
        newdata.push(newrow);
      }
      return newdata;
    });_defineProperty(this, "createRandomData",

    (numrows, numcols) => {
      var newdata = [];
      for (var i = 0; i < numrows; i++) {
        var newrow = [];
        for (var j = 0; j < numcols; j++) {
          let seed = Math.floor(Math.random() * 2);
          newrow.push(seed == 0 ? 'dead' : 'alive');
        }
        newdata.push(newrow);
      }
      return newdata;
    });_defineProperty(this, "getNextGen",

    () => {
      let prevgen = this.state.mydata;
      let nextgen = [];

      //for every row
      for (let i = 0; i < this.state.numrows; i++) {
        let newrow = [];
        //for every col
        for (let j = 0; j < this.state.numcols; j++) {
          let neighbors = 0;
          let rowstart = i - 1 == -1 ? 0 : i - 1;
          let colstart = j - 1 == -1 ? 0 : j - 1;
          let rowend = i + 1 == this.state.numrows ? i + 1 : i + 2;
          let colend = j + 1 == this.state.numcols ? j + 1 : j + 2;

          for (let r = rowstart; r < rowend; r++) {
            for (let c = colstart; c < colend; c++) {
              if (prevgen[r][c] == 'alive') {
                neighbors++;
              }
            }
          }
          if (prevgen[i][j] == 'alive') {
            neighbors--;
          }
          if (neighbors < 2 || neighbors > 3) {
            newrow.push('dead');
          } else if (neighbors == 2) {
            newrow.push(prevgen[i][j]);
          } else if (neighbors == 3) {
            newrow.push('alive');
          }

        }
        nextgen.push(newrow);
      }
      this.setState({ mydata: nextgen });
      console.log('setstate new data');


      if (JSON.stringify(prevgen) == JSON.stringify(nextgen)) {
        this.stopGen();
        console.log('stop gen from getNextGen');
      }

    });_defineProperty(this, "stopGen",

    () => {
      clearInterval(this.timer);
    });_defineProperty(this, "startGen",

    () => {
      this.timer = setInterval(() => this.getNextGen(), 75);
    });_defineProperty(this, "seedRandom",

    () => {
      this.setState({ mydata: this.createRandomData(this.state.numrows, this.state.numcols) });
    });_defineProperty(this, "seedBlank",

    () => {
      this.setState({ mydata: this.createBlankData(this.state.numrows, this.state.numcols) });
    });_defineProperty(this, "componentDidUpdate",

    () => {
      console.log('update');

    });_defineProperty(this, "componentDidMount",

    () => {
      console.log('mount');
      this.startGen();
    });_defineProperty(this, "createBoard",

    () => {
      let newboard = [];
      for (let i = 0; i < this.state.numrows; i++) {
        let newrow = [];
        for (let j = 0; j < this.state.numcols; j++) {
          newrow.push(React.createElement("td", { className: this.state.mydata[i][j], onClick: () => this.changeCell(i, j) }));
        }
        newboard.push(React.createElement("tr", { className: "gamerow" }, newrow));
      }
      return React.createElement("table", { className: "gameboard" }, newboard);
    });this.state = { mydata: this.createRandomData(30, 30), numrows: 30, numcols: 30 };}

  render() {
    return (
      React.createElement("div", null,
      this.createBoard(),
      React.createElement("table", { className: "gamecontrols" },
      React.createElement("button", { className: "gamecontrolbutton", onClick: () => this.startGen() }, "Start"),
      React.createElement("button", { className: "gamecontrolbutton", onClick: () => this.stopGen() }, "Stop"),
      React.createElement("button", { className: "gamecontrolbutton", onClick: () => this.seedRandom() }, "Randomize"),
      React.createElement("button", { className: "gamecontrolbutton", onClick: () => this.seedBlank() }, "Clear"))));



  }}


ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));