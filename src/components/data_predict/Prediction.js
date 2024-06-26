import React, { useState } from 'react';
import axios from 'axios';

const colors = [
   "bg-red-300"
];

export default function FeatureForm() {
  const [stn4contest, setStn4contest] = useState('');
  const [efYear, setEfYear] = useState('');
  const [efMonth, setEfMonth] = useState('');
  const [efDay, setEfDay] = useState('');
  const [efHour, setEfHour] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null); // 새로운 예측을 시작할 때 이전 예측 결과를 초기화
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/features', {
        stn4contest,
        efYear,
        efMonth,
        efDay,
        efHour,
      });
      setPrediction(response.data);
      console.log('Prediction data:', response.data); // 디버깅용 로그
    } catch (error) {
      console.error('결과를 가져오는데 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getClassByGrade = () => {
    return colors[0] || "";
  };

  const stn4contests = [
    ...Array.from({ length: 20 }, (_, i) => `STN${String(i + 1).padStart(3, '0')}`),
    ...Array.from({ length: 5 }, (_, i) => `STN${String(i + 31).padStart(3, '0')}`)
  ];
  const years = ['A', 'B', 'C', 'D'];
  const months = [5, 6, 7, 8, 9, 10];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = [0, 3, 6, 9, 12, 15, 18, 21];

  return (
    <div className="flex flex-col items-center justify-start h-screen py-24 sm:py-32 lg:px-8 lg:pl-72">
      <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <div className="w-full sm:w-auto">
            <label htmlFor="stn4contest" className="block text-sm font-medium text-gray-700">stn4contest</label>
            <select
              id="stn4contest"
              value={stn4contest}
              onChange={(e) => setStn4contest(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">AWS 지점 코드</option>
              {stn4contests.map((stn4contest) => (
                <option key={stn4contest} value={stn4contest}>{stn4contest}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="efYear" className="block text-sm font-medium text-gray-700">ef_year</label>
            <select
              id="efYear"
              value={efYear}
              onChange={(e) => setEfYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">년도</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="efMonth" className="block text-sm font-medium text-gray-700">ef_month</label>
            <select
              id="efMonth"
              value={efMonth}
              onChange={(e) => setEfMonth(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="efDay" className="block text-sm font-medium text-gray-700">ef_day</label>
            <select
              id="efDay"
              value={efDay}
              onChange={(e) => setEfDay(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="efHour" className="block text-sm font-medium text-gray-700">ef_hour</label>
            <select
              id="efHour"
              value={efHour}
              onChange={(e) => setEfHour(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">시간</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <button type="submit" className="mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
            예측 결과 보기
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="mt-8 w-full sm:w-auto">
          <h2 className="text-lg font-semibold">결과가 나오는 중...</h2>
        </div>
      )}
      {prediction && (
        <div className="mt-8 w-full sm:w-auto flex items-center space-x-4">
          <h2 className="text-lg font-semibold">예측 결과:</h2>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md"> 실 강수량: {prediction.predictions} 강수계급: {prediction.class_intervals}</pre>
        </div>
      )}

      <div className="flex flex-col items-center mt-12">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-gray-300 p-2">계급</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={i} className="border border-gray-300 p-2">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">강수량 구간</td>
              {["0.1미만(무강수)", "0.1-0.19", "0.2-0.49", "0.5-0.99", "1.0-1.9", "2.0-4.9", "5.0-9.9", "10.0-19.9", "20.0-29.9", "30.0이상"].map((range, index) => {
                const isActive = prediction && prediction.class_intervals[0] === index;
                const className = isActive ? getClassByGrade() : '';

                if (isActive) {
                  console.log(`Range: ${range}, Index: ${index}, ClassName: ${className}`); // 디버깅용 로그
                }

                return (
                  <td
                    key={index}
                    className={`border border-gray-300 p-2 ${className}`}
                  >
                    {range}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <span className="ml-4 text-gray-700">(단위: mm)</span>
      </div>
    </div>
  );
}
