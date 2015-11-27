class ReconciliationScreen extends React.Component {
  constructor (props) {
    super(props);

    this.availableCheckboxFilters = {
      status: new Set(["Matched", "Partial", "Unmatched", "Query"]),
      source: new Set(["SagePay", "Chopin"])
    }

    var transactions = props.sagepayTransactions
      .map(data => new Transaction(data))
      .concat(props.chopinTransactions.map(data => new Transaction(data)))
      .sort( (leftTransaction, rightTransaction) => {
        if (leftTransaction.getPaymentReference() < rightTransaction.getPaymentReference()) return -1;
        if (leftTransaction.getPaymentReference() > rightTransaction.getPaymentReference()) return 1;
        return 0;
      });

    this.state = {
      transactions: transactions,
      selected: {},
      filters: {
        status: new Set(this.availableCheckboxFilters.status.values()),
        source: new Set(this.availableCheckboxFilters.source.values())
      },
      search: {
        amount: {
          apply: false,
          value: 0
        }
      }
    };

    this.selectTransaction        = this.selectTransaction.bind(this);
    this.deselectAll              = this.deselectAll.bind(this);
    this.toggleFilterAll          = this.toggleFilterAll.bind(this);
    this.toggleFilter             = this.toggleFilter.bind(this);
    this.toggleSearchAmount       = this.toggleSearchAmount.bind(this);
    this.changeSearchAmountValue  = this.changeSearchAmountValue.bind(this);
    this.matchSelected            = this.matchSelected.bind(this);
    this.unmatchSelected          = this.unmatchSelected.bind(this);
    this.buildWriteOffForSelected = this.buildWriteOffForSelected.bind(this);
    this.querySelected            = this.querySelected.bind(this);
  }

  toggleFilter (type, value) {
    if (this.state.filters[type].has(value)) {
      this.state.filters[type].delete(value);
    } else {
      this.state.filters[type].add(value);
    }

    this.setState({ filters: this.state.filters });
  }

  toggleFilterAll (type) {
    if (this.state.filters[type].size == this.availableCheckboxFilters[type].size) {
      this.state.filters[type] = new Set();
    } else {
      this.state.filters[type] = new Set(this.availableCheckboxFilters[type].values());
    }

    this.setState({ filters: this.state.filters });
  }

  toggleSearchAmount () {
    this.state.search.amount.apply = !this.state.search.amount.apply;

    this.setState({ search: this.state.search });
  }

  changeSearchAmountValue (value) {
    this.state.search.amount.value = value;

    this.setState({ search: this.state.search });
  }

  selectTransaction (transaction) {
    if (transaction.getId() in this.state.selected) {
      delete this.state.selected[transaction.getId()];

      // Deselect all that match
      if (transaction.getMatchToken() != "") {
        this.state.transactions
          .filter(currentTransaction => currentTransaction.getMatchToken() == transaction.getMatchToken())
          .forEach(currentTransaction => delete this.state.selected[currentTransaction.getId()]);
      }
    } else {
      this.state.selected[transaction.getId()] = transaction;

      // Select all that match
      if (transaction.getMatchToken() != "") {
        this.state.transactions
          .filter(currentTransaction => currentTransaction.getMatchToken() == transaction.getMatchToken())
          .forEach(currentTransaction => this.state.selected[currentTransaction.getId()] = currentTransaction);
      }
    }

    this.setState({ selected: this.state.selected });
  }

  deselectAll () {
    this.setState({ selected: {} });
  }

  matchSelected () {
    var selectedKeys = Object.keys(this.state.selected);

    // var total = selectedKeys
    //   .map(key => this.state.selected[key].getTotal())
    //   .reduce( (acc, amount) => acc + amount, 0);

    //   console.log(total);
    // if (total != 0) { return alert("Transaction that don't balance to 0.00 can't be matched"); }

    var matchToken = GUID.generate();

    selectedKeys.forEach(key => this.state.selected[key].setMatchToken(matchToken));

    this.state.selected = {};

    this.setState({ selected: this.state.selected });
  }

  unmatchSelected () {
    Object.keys(this.state.selected)
      .filter(key => this.state.selected[key].unmatch())
      .map(key => delete this.state.selected[key])

    this.setState({ selected: this.state.selected });
  }

  buildWriteOffForSelected (total) {
    if (Math.abs(total) > 10) { return alert("Can't create Write-Off for amount > £10.00"); }

    var chopinTransactions = Object.keys(this.state.selected)
      .map(key => this.state.selected[key])
      .filter(transaction => transaction.getSource() == "Chopin");

    if (chopinTransactions.length == 0) { return alert("No Chopin Transaction to match with!"); }

    var writeOff = new Transaction.buildWriteOffFrom(chopinTransactions[0], total);

    this.state.selected[writeOff.getId()] = writeOff;
    this.state.transactions.push(writeOff);

    this.state.transactions
      .sort( (leftTransaction, rightTransaction) => {
        if (leftTransaction.getPaymentReference() < rightTransaction.getPaymentReference()) return -1;
        if (leftTransaction.getPaymentReference() > rightTransaction.getPaymentReference()) return 1;
        return 0;
      });

    this.setState({ selected:     this.state.selected,
                    transactions: this.state.transactions });
  }

  querySelected () {
    Object.keys(this.state.selected)
      .forEach(key => this.state.selected[key].query());

    this.setState({ selected: {} });
  }

  render () {
    var filteredTransactions = this.state.transactions
      .filter(transaction => this.state.filters.status.has(transaction.getStatus()))
      .filter(transaction => this.state.filters.source.has(transaction.getSource()));

    if (this.state.search.amount.apply) {
      filteredTransactions = filteredTransactions
        .filter(transaction => transaction.getTotal() == this.state.search.amount.value);
    }

    // filteredTransactions
    //   .sort( (leftTransaction, rightTransaction) => {
    //     if (leftTransaction.getMatchToken() < rightTransaction.getMatchToken()) return -1;
    //     if (leftTransaction.getMatchToken() > rightTransaction.getMatchToken()) return 1;
    //     return 0;
    //   });

    return (
      <div>
        <ReconciliationPanel selected={this.state.selected}
          filters={this.state.filters}
          availableCheckboxFilters={this.availableCheckboxFilters}
          toggleFilterAll={this.toggleFilterAll}
          toggleFilter={this.toggleFilter}
          matchSelected={this.matchSelected}
          unmatchSelected={this.unmatchSelected}
          buildWriteOffForSelected={this.buildWriteOffForSelected}
          querySelected={this.querySelected} />

        <SearchPanel search={this.state.search}
          toggleSearchAmount={this.toggleSearchAmount}
          changeSearchAmountValue={this.changeSearchAmountValue} />

        <TransactionsList transactions={filteredTransactions}
          selected={this.state.selected}
          selectTransaction={this.selectTransaction}
          deselectAll={this.deselectAll}
          filters={this.state.filters} />
      </div>
    );
  }
}

