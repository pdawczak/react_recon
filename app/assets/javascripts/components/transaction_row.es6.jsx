class TransactionRow extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return ! (nextProps.isSelected == this.props.isSelected &&
      nextProps.matchToken == this.props.matchToken);
  }

  render () {
    var classNames = [];
    if (this.props.isSelected) classNames.push("active");

    var status = this.props.transaction.getStatus();

    if (this.props.transaction.getMatchToken() != "") {
      status = <abbr title={this.props.transaction.getMatchToken()}>{status}</abbr>;
    }

    return (
      <tr className={classNames.join(" ")}>
        <td>{this.props.transaction.getSource()}</td>
        <td>{this.props.transaction.getType()}</td>
        <td>{this.props.transaction.getContactName()}</td>
        <td>{this.props.transaction.getRfqReference()}</td>
        <td>{this.props.transaction.getDate()}</td>
        <td>{this.props.transaction.getPaymentReference()}</td>
        <td>{status}</td>
        <td><AmountSpan amount={this.props.transaction.getTotal()} /></td>
        <td>
          <input type="checkbox"
            onChange={this.props.selectTransaction.bind(null, this.props.transaction)}
            checked={this.props.isSelected}/>
        </td>
      </tr>
    );
  }
}

