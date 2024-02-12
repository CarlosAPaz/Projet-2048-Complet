class Cellule extends React.Component {
  render() {
    let classes = "col border border-4 border-secondary case";
    classes += this.props.cellule === 0 ? "" : "-" + this.props.cellule;

    let number = this.props.cellule === 0 ? 0 : this.props.cellule;

    return (
      <div className={classes}>
        <h1>{number}</h1>
      </div>
    );
  }
}
