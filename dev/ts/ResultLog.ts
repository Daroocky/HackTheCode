class ResultLog {
    public add(num: number, result: resultJson) {
        $("#game").addClass("start");

        setTimeout(function () {
            $(".logo").hide();
        },1000);

        let numArray = ("" + num).split("");

        let $html = $($("#logEntry").html());

        $html.find(".num").eq(0).text(numArray[0]);
        $html.find(".num").eq(1).text(numArray[1]);
        $html.find(".num").eq(2).text(numArray[2]);
        $html.find(".num").eq(3).text(numArray[3]);

        let index = 0;

        for (let i = 0; i < result.right; i++) {
            $html.find(".status").eq(index).addClass("right");
            index++;
        }

        for (let i = 0; i < result.position; i++) {
            $html.find(".status").eq(index).addClass("position");
            index++;
        }

        for (let i = 0; i < result.wrong; i++) {
            $html.find(".status").eq(index).addClass("wrong");
            index++;
        }


        var waitTillStart = 0;
        if($("#log").html() == "") {
            waitTillStart = 1000;
        }

        setTimeout(function () {
            $("#log").addClass("newLog");
            $("#log").prepend($html);

            setTimeout(function () {
                $("#log").addClass("animate");
                $("#log").removeClass("newLog");
                setTimeout(function () {
                    $("#log").removeClass("animate");
                }, 1000);
            }, 100);
        }, waitTillStart);

    }
}