class TransactionsList extends React.Component {
  constructor () {
    super();

    this.renderTransactionLine = this.renderTransactionLine.bind(this);
  }

  renderTransactionLine (transaction) {
    var isSelected = transaction.getId() in this.props.selected;

    return (
      <TransactionRow key={transaction.getId()}
        transaction={transaction}
        isSelected={isSelected}
        selectTransaction={this.props.selectTransaction}
        matchToken={transaction.getMatchToken()} />
    );
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-condensed">
            <thead>
              <tr>
                <th>Source</th>
                <th>Trasn Type</th>
                <th>Contact Name</th>
                <th>RFQ Ref</th>
                <th>Trans Date</th>
                <th>Payment Reference</th>
                <th>Status</th>
                <th>Total</th>
                <th>
                  <button className="btn btn-xs btn-default"
                    onClick={this.props.deselectAll}
                    disabled={Object.keys(this.props.selected).length == 0}>
                    D
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {this.props.transactions.map(this.renderTransactionLine)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

