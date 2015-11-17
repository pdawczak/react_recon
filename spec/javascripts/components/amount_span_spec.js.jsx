var TestUtils = React.addons.TestUtils;

describe("AmountSpan", function () {
  it("renders amount", function () {
    var span = TestUtils.renderIntoDocument(
      <AmountSpan amount={99.99} />
    );

    var spanNode = ReactDOM.findDOMNode(span);

    expect(spanNode.textContent).toBe("£ 99.99");
  });

  it("formats the amount with two decimal places", function () {
    var span = TestUtils.renderIntoDocument(
      <AmountSpan amount={20} />
    );

    var spanNode = ReactDOM.findDOMNode(span);

    expect(spanNode.textContent).toBe("£ 20.00");
  });

  it("renders 0.00 as value if none provided", function () {
    var span = TestUtils.renderIntoDocument(
      <AmountSpan />
    );

    var spanNode = ReactDOM.findDOMNode(span);

    expect(spanNode.textContent).toBe("£ 0.00");
  });
});
