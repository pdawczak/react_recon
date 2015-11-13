class SelectedTransactionsBalance extends React.Component {
  render () {
    var selectedKeys = Object.keys(this.props.selected);

    var total = selectedKeys
      .map(key => this.props.selected[key].getTotal())
      .reduce((sum, amount) => sum + amount, 0);

    var anyTransactionFromChopin = selectedKeys
      .filter(key => this.props.selected[key].getSource() == "Chopin")
      .length > 0;

    var anyToUnmatch = selectedKeys
      .filter(key => this.props.selected[key].fullyMatched())
      .length > 0;

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <label>Selected Balance</label>
            <input type="text"
              className="amount"
              value={total.toFixed(2)}
              readOnly={true} />
            <button className="btn btn-default btn-xs"
              disabled={! anyTransactionFromChopin || Math.abs(total) > 10 || total == 0}
              onClick={this.props.buildWriteOffForSelected.bind(null, total)}>
              Write Off
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-xs btn-default"
              disabled={selectedKeys.length < 2}
              onClick={this.props.matchSelected}>
              Match Selected
            </button>
            <button className="btn btn-xs btn-default"
              disabled={! anyToUnmatch}
              onClick={this.props.unmatchSelected}>
              Unmatch
            </button>
            <button className="btn btn-xs btn-default"
              disabled={selectedKeys.length == 0}
              onClick={this.props.querySelected}>
              Query
            </button>
          </div>
        </div>
      </div>
    );
  }
}

