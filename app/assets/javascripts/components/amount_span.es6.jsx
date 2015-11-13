class AmountSpan extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.amount != this.props.amount;
  }

  render () {
    return (
      <span className="amount">
        £ {this.props.amount.toFixed(2)}
      </span>
    );
  }
}

