class AmountSpan extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.amount != this.props.amount;
  }

  render () {
    var amount = this.props.amount || 0;

    return (
      <span className="amount">
        £ {amount.toFixed(2)}
      </span>
    );
  }
}

