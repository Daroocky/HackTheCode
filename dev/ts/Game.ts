declare const $: any;

interface resultJson {
    "right": number,
    "position": number,
    "wrong": number
}

class Game {
    private code: number;

    private resultLog: ResultLog;
    private codeGenerator: CodeGenerator;

    private won: boolean = false;

    constructor() {
        this.resultLog = new ResultLog();
        this.codeGenerator = new CodeGenerator();

        this.registerEvents();
        this.createCode();
    }

    createCode() {
        this.codeGenerator.generateCode();
    }

    registerEvents() {
        $(document).ready(() => {
            $("#lock").on("click", () => {
                this.eventCheckCode()
            });
            $("input, #lock").on("keyup", (e: any) => {
                this.eventNavigate(e);
                this.eventNextInput(e);
            });
        });
    }

    eventNavigate(event: any) {
        if (event.keyCode == 37) {
            $(event.target).prev("input").focus().select();
        }

        if (event.keyCode == 39) {
            $(event.target).next("input").focus().select();
        }

        if(event.keyCode == 8) {
            if($(event.target).val() == "") {
                $(event.target).prev("input").focus().val("");
            }
        }
    }

    eventNextInput(event: any) {
        if (event.keyCode != 37 && event.keyCode != 39) {
            if (isNaN($(event.target).val())) {
                $(event.target).val("");
            }

            var inputValues = ["0"];
            if ($(event.target).attr("id") != "num1") inputValues.push($("#num1").val());
            if ($(event.target).attr("id") != "num2") inputValues.push($("#num2").val());
            if ($(event.target).attr("id") != "num3") inputValues.push($("#num3").val());
            if ($(event.target).attr("id") != "num4") inputValues.push($("#num4").val());

            if (inputValues.indexOf($(event.target).val()) != -1) {
                $(event.target).val("");
            }

            if ($(event.target).val() !== "") {
                $(event.target).next().focus();
            }
        }
    }

    eventCheckCode() {
        if(this.won) {
            this.won = false;

            $(".icon").removeClass("icon-lock-open").addClass("icon-lock-closed");
            $(".description").show();
            $(".logo").text("HACK THE CODE");

            $("#num1").val("").attr("disabled", false).focus();
            $("#num2").val("").attr("disabled", false);
            $("#num3").val("").attr("disabled", false);
            $("#num4").val("").attr("disabled", false);

            this.createCode();
        } else {
            let num = "";
            num = num + $("#num1").val();
            num = num + $("#num2").val();
            num = num + $("#num3").val();
            num = num + $("#num4").val();

            let numRes = parseInt(num);

            let result = this.codeGenerator.checkCode(numRes);
            this.resultLog.add(numRes, result);

            if(!this.checkWin(result)) {
                $("#num1").val("").focus();
                $("#num2").val("");
                $("#num3").val("");
                $("#num4").val("");
            }
        }
    }

    checkWin(result: resultJson) {
        if (result.right >= 4) {
            this.won = true;

            $(".icon").removeClass("icon-lock-closed").addClass("icon-lock-open");

            $(".logo").text("CODE HACKED");
            $(".description").hide();
            $(".logo").show();

            $("#game").removeClass("start");

            $("#log").addClass("animate");
            $("#log").addClass("hide");
            setTimeout(function () {
                $("#log").removeClass("animate");
                $("#log").removeClass("hide");
                $("#log").html("");
            }, 1000);


            $("#num1").attr("disabled", true);
            $("#num2").attr("disabled", true);
            $("#num3").attr("disabled", true);
            $("#num4").attr("disabled", true);

            return true;
        } else {
            return false;
        }
    }
}

new Game();