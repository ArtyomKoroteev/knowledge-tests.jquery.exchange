describe('Stage 6', () => {
  const toValueEl = $('#to-value-changed-haha');
  const fromCurrencyEl = $('[data-exchange-from-currency-changed-haha]');
  const toCurrencyEl = $('[data-exchange-to-currency]');
  const fromValueEl = $('[data-exchange-from-value]');
  const convertBtnEl = $('[data-exchange-convert]');
  const viceVersaBtnEl = $('[data-exchange-vice-versa]');

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
      toValueEl.exchange({
        fromCurrencySelectEl: '[data-exchange-from-currency-changed-haha]',
      });
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

  it('should create `$.fn.exchange.defaults` default options', () => {
    expect($.fn.exchange.defaults).not.to.be(undefined);
  });

  it('should have required values on `$.fn.exchange.defaults` default options',
      () => {
        expect($.fn.exchange.defaults).to.be.eql({
          fromCurrencySelectEl: '[data-exchange-from-currency]',
          toCurrencySelectEl: '[data-exchange-to-currency]',
          convertBtn: '[data-exchange-convert]',
          viceVersaBtn: '[data-exchange-vice-versa]',
          fromValueEl: '[data-exchange-from-value]',
        });
      });

  it('should replace convert currency on `#vice-versa-currency` click',
      (done) => {
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

  it('should convert currencies on `#convert` click', (done) => {
    fromCurrencyEl.val('USD');
    fromValueEl.val(10);
    convertBtnEl.click();

    setTimeout(() => {
      expect(toValueEl.html()).to.be('20');

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

