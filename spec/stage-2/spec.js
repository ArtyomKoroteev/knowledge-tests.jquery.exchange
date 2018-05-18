describe('Stage 2', () => {
  const toValueEl = $('#to-value');

  before((done) => {
    // Delay for ajax requests
    setTimeout(done, 1000);
  });

  it('should make request with getJSON', () => {
    sinon.assert.calledOnce($.getJSON);
  });

  it('should replace #to-value content with test data from ajax', () => {
    expect(toValueEl.html()).to.be.equal('{"UAH_USD":{"val":1}}');
  });
});
