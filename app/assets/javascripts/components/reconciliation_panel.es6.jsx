class ReconciliationPanel extends React.Component {
  render () {
    return (
      <div>
        <div className="row">
          <div className="col-sm-5">
            SagePay transactions
          </div>
          <div className="col-sm-4">
            <SelectedTransactionsBalance selected={this.props.selected}
              matchSelected={this.props.matchSelected}
              unmatchSelected={this.props.unmatchSelected}
              buildWriteOffForSelected={this.props.buildWriteOffForSelected}
              querySelected={this.props.querySelected} />
          </div>
          <div className="col-sm-3">
            <Filters sourceFilters={Array.from(this.props.filters.source)}
              statusFilters={Array.from(this.props.filters.status)}
              availableCheckboxFilters={this.props.availableCheckboxFilters}
              toggleFilterAll={this.props.toggleFilterAll}
              toggleFilter={this.props.toggleFilter} />
          </div>
        </div>
      </div>
    );
  }
}

