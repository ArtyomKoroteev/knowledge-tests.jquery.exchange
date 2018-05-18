describe('Stage 5', () => {
  const toValueEl = $('#to-value');
  const fromCurrencyEl = $('#from-currency');
  const toCurrencyEl = $('#to-currency');
  const fromValueEl = $('#from-value');
  const convertBtnEl = $('#convert');
  const viceVersaBtnEl = $('#vice-versa-currency');

  before(() => {
    $.mockjax([
      {
        url: 'http://free.currencyconverterapi.com/api/v5/convert?q=UAH_USD&compact=y',
        logging: 1,
        responseText: {'UAH_USD': {'val': 0.5}},
      },
      {
        url: 'http://free.currencyconverterapi.com/api/v5/convert?q=USD_UAH&compact=y',
        logging: 1,
        responseText: {'USD_UAH': {'val': 2}},
      },
    ]);

    if ($.fn.exchange) {
      toValueEl.exchange();
    }
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

  it('should create `exchange` jquery plugin', () => {
    expect($.fn.exchange).not.to.be(undefined);
  });

  it('should replace convert currency on `#convert` click', (done) => {
    toCurrencyEl.val('USD');
    fromValueEl.val(10);
    viceVersaBtnEl.click();

    setTimeout(() => {
      expect(toValueEl.html()).to.be('20');

      done();
    }, 500);
  });

  it('should switch currencies on `#vice-versa-currency` click', () => {
    fromCurrencyEl.val('USD');
    viceVersaBtnEl.click();

    expect(fromCurrencyEl.val()).to.be('UAH');
    expect(toCurrencyEl.val()).to.be('USD');
  });

  it('should convert currencies on `#vice-versa-currency` click', (done) => {
    fromCurrencyEl.val('USD');
    fromValueEl.val(10);
    convertBtnEl.click();

    setTimeout(() => {
      expect(toValueEl.html()).to.be('5');

      done();
    }, 500);
  });

  it('should convert currencies on `#from-currency` change', (done) => {
    fromCurrencyEl.val('USD').change();
    fromValueEl.val(10);

    setTimeout(() => {
      expect(toValueEl.html()).to.be('20');

      done();
    }, 500);
  });

  it('should convert currencies on `#to-currency` change', (done) => {
    toCurrencyEl.val('USD').change();
    fromValueEl.val(10);

    setTimeout(() => {
      expect(toValueEl.html()).to.be('5');

      done();
    }, 500);
  });
});

