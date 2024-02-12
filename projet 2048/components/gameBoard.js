class GameBoard extends React.Component {
  render() {
    const { gameBoard } = this.props;

    return (
      <React.Fragment>
        {gameBoard.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </React.Fragment>
    );
  }
}
