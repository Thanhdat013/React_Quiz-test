import { useTranslation, Trans } from "react-i18next";

const TableQuizzes = ({
  listQuiz,
  handleClickDeleteQuiz,
  handleClickUpdateQuiz,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <table className="table table-hover table-bordered mb-4">
        <thead>
          <tr>
            <th scope="col"> {t("tableQuiz.tableQuizId")}</th>
            <th scope="col">{t("tableQuiz.tableQuizName")} </th>
            <th scope="col">{t("tableQuiz.tableQuizDesc")} </th>
            <th scope="col">{t("tableQuiz.tableQuizDifficult")} </th>
            <th scope="col">{t("tableQuiz.tableQuizAction")} </th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickUpdateQuiz(item)}
                    >
                      {t("tableQuiz.tableQuizUpdate")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDeleteQuiz(item)}
                    >
                      {t("tableQuiz.tableQuizDelete")}
                    </button>
                  </td>
                </tr>
              );
            })}

          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan="4">{t("tableQuiz.tableQuizData")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuizzes;
