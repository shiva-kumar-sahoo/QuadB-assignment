import React, { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import CircularTimer from "./components/CircularTimer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import DataTable from "./components/DataTable";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [countDownTimer, setCountDownTimer] = useState(60);
  const [selectedOption, setSelectedOption] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/crypto/`
      );
      const data = await response.json();
      setCryptoData(data.data.slice(0, 10));
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Error fetching top 10 data:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (countDownTimer <= 0) {
        console.log("fetch call again");

        fetchData();
        setCountDownTimer(60);
      } else {
        setCountDownTimer(countDownTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownTimer]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-white py-4 md:p-4">
        <div className="pt-5 pb-8 ">
          <div className="grid md:grid-cols-3 lg:flex items-center justify-between">
            <div className="w-64 col-span-12 md:col-span-4 flex items-center lg:mx-0 my-2 lg:my-0 mx-auto">
              <a href="/">
                <div>
                  <img src="logo.png" alt="HODLINFO" />
                </div>
              </a>
            </div>
            <div className="flex items-center  lg:justify-between lg:mx-0 my-2 lg:my-0 mx-auto gap-4 col-span-12 md:col-span-4">
              <Dropdown defaultValue="INR" options={["INR"]} />
              <Dropdown
                defaultValue="BTC"
                options={[
                  "BTC",
                  "ETH",
                  "USDT",
                  "XRP",
                  "TRX",
                  "DASH",
                  "ZEC",
                  "XEM",
                  "IOST",
                  "WIN",
                  "BIT",
                  "WRX",
                ]}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
              <a
                href="https://wazirx.com/invite/sp7pvbt6?utm_source=finstreet&utm_medium=affiliate&utm_campaign=regnow-btn"
                className="px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-800 font-medium text-lg rounded-md shadow-sm focus:outline-none"
              >
                BUY {selectedOption || "BTC"}
              </a>
            </div>
            <div className="flex items-center lg:justify-between lg:mx-0 my-2 lg:my-0 mx-auto gap-4 col-span-12 md:col-span-4">
              <div className="flex items-center justify-between gap-2">
                <CircularTimer countDownTimer={countDownTimer} />
                <div className="  bg-[#3dc6c1] rounded-xl">
                  <a
                    className="flex items-center justify-center px-4 py-2  text-white font-bold rounded-md "
                    href="https://hodlinfo.com/connect/telegram"
                  >
                    <img
                      src="telegram.png"
                      alt="telegram"
                      className="w-4 h-4 mr-2"
                    />
                    Connect Telegram
                  </a>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex justify-around items-center py-2">
                <div className="text-center w-full md:w-auto">
                  <div className="text-[#3dc6c1] text-base md:text-3xl font-bold">
                    0.1 %
                  </div>
                  <div className="text-sm text-gray-600">5 Mins</div>
                </div>

                <div className="text-center w-full md:w-auto">
                  <div className="text-[#3dc6c1] text-base md:text-3xl font-bold">
                    0.96 %
                  </div>
                  <div className="text-sm text-gray-600">1 Hour</div>
                </div>

                <div className="md:max-w-2/5 text-center mx-2">
                  <div className=" ">
                    <div className="text-gray-600 mt-2">
                      <span className="font-medium text-lg">
                        Best Price to Trade
                      </span>
                    </div>
                    <div className="text-2xl lg:text-8xl md:text-4xl font-bold text-black dark:text-white pb-2">
                      ₹26,56,110
                    </div>
                    <div className="text-base  text-gray-600">
                      Average ETH/INR net price including commission
                    </div>
                  </div>
                </div>

                <div className="text-center w-full md:w-auto">
                  <div className="text-[#3dc6c1] text-base md:text-3xl font-bold">
                    2.73 %
                  </div>
                  <div className="text-sm text-gray-600">1 Day</div>
                </div>

                <div className="text-center w-full md:w-auto">
                  <div className="text-[#3dc6c1] text-base md:text-3xl font-bold">
                    7.51 %
                  </div>
                  <div className="text-sm text-gray-600">7 Days</div>
                </div>
              </div>
              <DataTable cryptoData={cryptoData} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
