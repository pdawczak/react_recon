class Filters extends React.Component {
  constructor (params) {
    super(params);

    this.renderStatusFilterCheckbox = this.renderStatusFilterCheckbox.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return ! (nextProps.statusFilters.length == this.props.statusFilters.length &&
      nextProps.sourceFilters.length == this.props.sourceFilters.length);
  }

  renderStatusFilterCheckbox (value) {
    return (
      <li key={value}
        className="checkbox">
        <label>
          <input type="checkbox"
            checked={this.props.statusFilters.indexOf(value) >= 0}
            onChange={this.props.toggleFilter.bind(null, "status", value)} />
          {value}
        </label>
      </li>
    );
  }

  renderSourceFilterCheckbox (value) {
    return (
      <li key={value}
        className="checkbox">
        <label>
          <input type="checkbox"
            checked={this.props.sourceFilters.indexOf(value) >= 0}
            onChange={this.props.toggleFilter.bind(null, "source", value)} />
          {value}
        </label>
      </li>
    );
  }

  render () {
    var statusCheckboxes = Array.from(this.props.availableCheckboxFilters["status"])
      .map(status => this.renderStatusFilterCheckbox(status));

    var sourceCheckboxes = Array.from(this.props.availableCheckboxFilters["source"])
      .map(status => this.renderSourceFilterCheckbox(status));

    return (
      <div className="row">
        <div className="col-sm-6">
          <ul className="list-unstyled">
            <li className="checkbox">
              <label>
                <input type="checkbox"
                  checked={this.props.statusFilters.length == this.props.availableCheckboxFilters["status"].size}
                  onChange={this.props.toggleFilterAll.bind(null, "status")} />
                All
              </label>
            </li>
            {statusCheckboxes}
          </ul>
        </div>

        <div className="col-sm-6">
          <ul className="list-unstyled">
            {sourceCheckboxes}
          </ul>
        </div>
      </div>
    );
  }
}

