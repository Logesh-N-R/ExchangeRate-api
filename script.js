$(document).ready(function () {
  const url = "http://api.exchangeratesapi.io/v1/latest?access_key=ad5332c1f44920dc3ee60b8e16f64163"
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      result = data;
      var json = JSON.stringify(data);
      var obj = jQuery.parseJSON(json);
      urlVal = obj;
      options(urlVal);
      $("#from-amount,#to-amount").change(function () {
        choosen = $(this).attr("id");
        country1 = $("#from-select").val();
        country2 = $("#to-select").val();
        data1 = $("#from-amount").val();
        data2 = $("#to-amount").val();

        changeAmount(country1, data1, country2, data2, choosen);
      });

      $("#from-select,#to-select").change(function () {
        var choosedId = $(this).attr("id");
        var choosedCountry = $(this).val();
        country1 = $("#from-select").val();
        country2 = $("#to-select").val();
        data1 = $("#from-amount").val();
        data2 = $("#to-amount").val();
        baseCorrection(country1, data1, country2, data2);
      });
    }
  });
});

function options(json) {
  var obj = json;
  country = Object.keys(obj.rates);
  console.log(country);
  totalCounty = country.length;
  cloneOptionOfFrom = $("#from-option");
  cloneOptionOfTo = $("#to-option");
  for (var i = 0; i <= totalCounty; i++) {
    clonedfrom = cloneOptionOfFrom.clone();
    clonedto = cloneOptionOfTo.clone();
    currentCountry = country[i];
    $(clonedfrom).appendTo("#from-select");
    $(clonedfrom).attr({
      value: currentCountry,
      key: currentCountry
    });
    $(clonedfrom).html(currentCountry);
    $(clonedto).appendTo("#to-select");
    $(clonedto).attr({
      value: currentCountry,
      key: currentCountry
    });
    $(clonedto).html(currentCountry);
  }
}

function changeAmount(country1, data1, country2, data2, choosen) {
  let rate1 = urlVal.rates[country1];
  let rate2 = urlVal.rates[country2];

  let converted1 = 1 / rate1;
  let converted2 = 1 / rate2;
  if (choosen == "from-amount") {
    let firstAmount = converted1 * rate1 * data1;
    let secondAmount = converted1 * rate2 * data1;

    $("#to-amount").val(secondAmount);
    $("#from-amount").val(firstAmount);
  }
  if (choosen == "to-amount") {
    let firstAmount = converted2 * rate1 * data2;
    let secondAmount = converted2 * rate2 * data2;

    $("#to-amount").val(secondAmount);
    $("#from-amount").val(firstAmount);
  }
}

function baseCorrection(country1, data1, country2, data2) {
  let rate1 = urlVal.rates[country1];
  let rate2 = urlVal.rates[country2];

  let converted1 = 1 / rate1;
  let converted2 = 1 / rate2;


  let secondAmount = converted1 * rate2;
  let firstAmount = converted1 * rate1;
  $("#to-amount").val(secondAmount);
  $("#from-amount").val(firstAmount);

}
