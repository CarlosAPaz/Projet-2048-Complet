class ToolBar extends React.Component {
  render() {
    return (
      <div className="container text-white bg-dark">
        <label htmlFor="customRange3" className="form-label">
          Entrer un chiffre pour initialiser le jeu 2048 avec une
          table{" "}
          <span id="textInput">
            {this.props.selection + "x" + this.props.selection}
          </span>
        </label>
        <input type="text" id="customRange3" />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.onSize}>
          Commencer
        </button>
      </div>
    );
  }
}
