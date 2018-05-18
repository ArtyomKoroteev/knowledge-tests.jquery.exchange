describe('Stage 3', () => {
  const fromCurrencyEl = $('#from-currency');
  const toCurrencyEl = $('#to-currency');
  const fromValueEl = $('#from-value');
  const convertBtnEl = $('#convert');

  before(() => {
    $.mockjax({
      url: new RegExp('http://free.currencyconverterapi.com/api/v5/convert.+'),
      logging: 1,
      responseText: {'UAH_USD': {'val': 1}}, // maybe sometime in a future
    });
  });

  beforeEach(() => {
    sinon.spy($, 'getJSON');
    fromCurrencyEl.val('UAH');
    toCurrencyEl.val('UAH');
    fromValueEl.val('');
  });

  afterEach(() => {
    $.getJSON.restore();
  });

  it('should make request with getJSON on click', () => {
    convertBtnEl.click();

    sinon.assert.calledOnce($.getJSON);
  });

  it('should replace `from` and `to` currency from selects in request url on click',
      () => {
        fromCurrencyEl.val('USD');
        toCurrencyEl.val('UAH');
        convertBtnEl.click();

        expect($.getJSON.getCall(0).args[0]).
            to.
            be('http://free.currencyconverterapi.com/api/v5/convert?q=USD_UAH&compact=y');

        fromCurrencyEl.val('UAH');
        toCurrencyEl.val('USD');
        convertBtnEl.click();

        expect($.getJSON.getCall(1).args[0]).
            to.
            be('http://free.currencyconverterapi.com/api/v5/convert?q=UAH_USD&compact=y');
      });
});

