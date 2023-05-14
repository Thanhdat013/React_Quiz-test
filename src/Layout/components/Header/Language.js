import "./Header.scss"

import { Button, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"

const Language = () => {
  const { t, i18n } = useTranslation()

  const handleChangeLanguage = (languages) => {
    i18n.changeLanguage(languages)
  }

  return (
    <div className="languages">
      {/* <NavDropdown
        title={i18n.language === "en" ? "English" : "Việt Nam"}
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          {t("header.headerLanguageVi")}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          {t("header.headerLanguageEn")}
        </NavDropdown.Item>
      </NavDropdown> */}
      <Button
        variant="outline"
        className={
          i18n.language === "vi"
            ? "languages-active languages-vi"
            : "languages-vi"
        }
        onClick={() => handleChangeLanguage("vi")}
      >
        Vn
      </Button>

      <Button
        variant="outline"
        className={i18n.language === "en" ? "languages-active" : ""}
        onClick={() => handleChangeLanguage("en")}
      >
        En
      </Button>
    </div>
  )
}

export default Language
