import { useTranslation } from "react-i18next";

import { getUserHistory } from "~/services/ApiServices";

import "./UserSetting.scss";
import { useState, useEffect } from "react";
function UserHistory() {
  const { t } = useTranslation();
  const [dataHistory, setDataHistory] = useState([]);
  useEffect(() => {
    GetHistory();
  }, []);

  const GetHistory = async () => {
    let res = await getUserHistory();
    if (res && res.EC === 0) {
      // convert time
      function formatDate(string) {
        var options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        return new Date(string).toLocaleDateString([], options);
      }

      const newDataHistory = res.DT.data.map((item) => {
        return {
          id: item.id,
          name: item.quizHistory.name,
          totalQuestions: item.total_questions,
          totalAnswerCorrect: item.total_correct,
          time: formatDate(item.updatedAt),
        };
      });
      if (newDataHistory && newDataHistory.length > 7) {
        let updateDataHistory = newDataHistory.slice(-8, -1);

        setDataHistory(updateDataHistory);
      }
    }
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Total question</th>
            <th scope="col">Total answer correct</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {dataHistory &&
            dataHistory.length > 0 &&
            dataHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.totalQuestions}</td>
                <td>{item.totalAnswerCorrect}</td>
                <td>{item.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
export default UserHistory;
