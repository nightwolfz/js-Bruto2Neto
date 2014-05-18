// How about some jQuery
$(function(){

    var incomeTax = 0.21;
    var socialSecurity = 0.189;
    var generalTax = 0.0254;
    var labourTax = 0.02775;
    var ruling30percent = 0.30;

    function NetIncomeCalculator(income){
        // Private vars
        var socialSecurityOn = false;
        var ruling30percentOn = false;

        // Static vars
        sIncome = income;
        sNetIncome = income;

        function formatNumber(elemId, int){
            var formatedInt = parseInt(int).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.').slice(0, -3);

            $("#" + elemId).html(formatedInt);
        }

        var subIncomeTax = function(){
            formatNumber("iIncomeTax", -sIncome * incomeTax);
            sNetIncome -= sIncome * incomeTax;
        };

        var subSocialSecurity = function(){
            formatNumber("iSocialSecurity", -sIncome * socialSecurity);
            sNetIncome -= sIncome * socialSecurity;
        };

        var subGeneralTax = function(){
            formatNumber("iGeneralTax", sIncome * generalTax);
            sNetIncome += sIncome * generalTax;
        };

        var subLabourTax = function(){
            formatNumber("iLabourTax", sIncome * labourTax);
            sNetIncome += sIncome * labourTax;
        };

        var subRuling30Percent = function(){
            formatNumber("iPercent30Ruling", sIncome * ruling30percent);
            sNetIncome -= sIncome * ruling30percent;
        };

        // Public methods
        return {
            calculateNetIncome: function(){
                formatNumber("iTaxableIncome", sIncome);
                subIncomeTax();

                if($("#flip-ruling").val()=="on"){
                    $(".ui-field-contain#div_social").show();
                    subSocialSecurity();
                } else {
                    $(".ui-field-contain#div_social").hide();
                }

                subGeneralTax();
                subLabourTax();

                if($("#flip-ruling").val()=="on"){
                    $(".ui-field-contain#div_ruling").show();
                    subRuling30Percent();
                } else {
                    $(".ui-field-contain#div_ruling").hide();
                }

                formatNumber("iNetIncome", sNetIncome);
            }
        };
    }

    function launchCalculator(){
        $("#div_results").fadeOut(function(){
            new NetIncomeCalculator($("#grossIncome").val()).calculateNetIncome();
            $("#div_results").fadeIn();
        });

    }

    $("#grossIncome").on("change", launchCalculator);
    $("#calculateNet").on("click", launchCalculator);
});