(function () {
  "use strict";

  this.Transaction = function (params) {
    this.id               = params["id"];
    this.source           = params["source"];
    this.type             = params["type"];
    this.contactName      = params["contact_name"];
    this.rfqReference     = params["rfq_reference"];
    this.date             = params["date"];
    this.paymentReference = params["payment_reference"];
    this.status           = params["status"];
    this.matchToken       = "";
    this.total            = parseFloat(params["total"].toFixed(2));
  }

  this.Transaction.buildWriteOffFrom = function (transaction, total) {
    return new Transaction({ id:                "w_" + GUID.generate(),
                             source:            "Chopin",
                             type:              "Write-Off",
                             contact_name:      transaction.getContactName(),
                             rfq_reference:     transaction.getRfqReference(),
                             date:              transaction.getDate(),
                             payment_reference: transaction.getPaymentReference(),
                             status:            "Unmatched",
                             total:             -1 * total });
  }

  this.Transaction.prototype.getId = function () {
    return this.id;
  }

  this.Transaction.prototype.getSource = function () {
    return this.source;
  }

  this.Transaction.prototype.getType = function () {
    return this.type;
  }

  this.Transaction.prototype.getContactName = function () {
    return this.contactName;
  }

  this.Transaction.prototype.getRfqReference = function () {
    return this.rfqReference;
  }

  this.Transaction.prototype.getDate = function () {
    return this.date;
  }

  this.Transaction.prototype.getPaymentReference = function () {
    return this.paymentReference;
  }

  this.Transaction.prototype.getStatus = function () {
    if (this.matchToken != "") return "Matched";
    return this.status;
  }

  this.Transaction.prototype.setMatchToken = function (matchToken) {
    this.matchToken = matchToken;
  }

  this.Transaction.prototype.getMatchToken = function () {
    return this.matchToken;
  }

  this.Transaction.prototype.fullyMatched = function () {
    return this.getStatus() == "Matched";
  }

  this.Transaction.prototype.unmatch = function () {
    if (this.fullyMatched()) {
      this.matchToken = "";
      return true;
    }

    return false;
  }

  this.Transaction.prototype.getTotal = function () {
    return this.total;
  }

  this.Transaction.prototype.query = function () {
    this.status = "Query";
  }

}).call(window);
