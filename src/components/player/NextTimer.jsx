import { useEffect, useState } from "react";
import i18n from "../../i18n";


function NextTimer() {
    const [countDown, setCountDown] = useState();
    const [countDownTitle, setCountDownTitle] = useState();

    useEffect(() => {
        let current = new Date();
        let countDownDate = current.setHours(23, 59, 59, 999);
        let lastMinute = 0;

        let interval = setInterval(function () {

            let now = new Date().getTime();
            let timeLeft = countDownDate - now;

            if (timeLeft >= 0) {
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
                const result = hours + ":" + minutes + ":" + seconds;

                setCountDown(result);

                if (lastMinute !== minutes) {
                    const resultDetailed = hours + i18n.t("result.hours") + minutes + i18n.t("result.minutes");
                    setCountDownTitle(resultDetailed);
                    lastMinute = minutes;
                }
            }

            if (timeLeft < 0) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.reload(true);
                }, 2000);
            }

        }, 1000);

        return function cleanup() {
            clearInterval(interval);
        };
    })

    return (
        <>
            <div className="flex flex-col justify-center items-center mb-6 mx-3">
                <div className="thinFont text-center text-lg text-white">{i18n.t("result.nexttitle")}</div>
                <div className="thinFont text-lg" title={countDownTitle}>{countDown}</div>
            </div>
        </>
    );
}

export default NextTimer;