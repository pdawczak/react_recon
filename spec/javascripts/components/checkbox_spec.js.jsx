var TestUtils = React.addons.TestUtils

describe("Checkbox", function () {
  it("changes the text after click", function () {
    var checkbox = TestUtils.renderIntoDocument(
      <Checkbox labelOn="On" labelOff="Off" />
    );

    var checkboxNode = ReactDOM.findDOMNode(checkbox);

    expect(checkboxNode.textContent).toEqual('Off');
  });
});
