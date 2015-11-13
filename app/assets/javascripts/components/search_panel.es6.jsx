class SearchPanel extends React.Component {
  constructor (params) {
    super(params);

    this.state = {
      renderAmountValue: params.search.amount.value.toFixed(2)
    };
  }

  onAmountChange (event) {
    var parsed = parseFloat(this.refs.amountValue.value);

    if (isNaN(parsed)) {
      this.props.changeSearchAmountValue(0);
    } else {
      this.props.changeSearchAmountValue(parsed);
    }

    this.state.renderAmountValue = this.refs.amountValue.value;
    this.setState({ renderAmountValue: this.state.renderAmountValue });
  }

  onAmountBlur (event) {
    var parsed = parseFloat(this.state.renderAmountValue);

    if (this.state.renderAmountValue == "") {
      parsed = 0;
    }

    if (! isNaN(parsed)) {
      this.state.renderAmountValue = parsed.toFixed(2);
    }

    this.setState({ renderAmountValue: this.state.renderAmountValue });
  }

  render () {
    return (
      <div className="row">
        <div className="col-sm-4">
        </div>
        <div className="col-sm-4">
          <label className="checkbox">
            <input type="checkbox"
              checked={this.props.search.amount.apply}
              onChange={this.props.toggleSearchAmount} />
            Search Total
          </label>
          <input type="text"
            className="amount"
            ref="amountValue"
            value={this.state.renderAmountValue}
            onChange={this.onAmountChange.bind(this)}
            onBlur={this.onAmountBlur.bind(this)} />
        </div>
        <div className="col-sm-4">
        </div>
      </div>
    );
  }
}
