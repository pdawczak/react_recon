var TestUtils = React.addons.TestUtils;

describe("AmountSpan", function () {
  it("renders amount", function () {
    var span = TestUtils.renderIntoDocument(
      <AmountSpan amount={99.99} />
    );

    var spanNode = ReactDOM.findDOMNode(span);

    expect(spanNode.textContent).toBe("£ 99.90");
  });
});
