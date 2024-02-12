class Row extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.row.map((c, i) => (
          <Cellule key={i} cellule={c} />
        ))}
      </div>
    );
  }
}
