import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyPreviewCard from "./archivecomponents/SurveyPreviewCard";
import { getArchiveSurveys } from "../../api/archiveApi";
import "./PublicArchiveMain.css";

function PublicArchiveMain() {
  const navigate = useNavigate();

  const [surveyList, setSurveyList] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const categories = [
    { label: "전체", value: "" },
    { label: "IT·AI", value: "IT_AI" },
    { label: "교육", value: "EDUCATION" },
    { label: "문화", value: "CULTURE" },
    { label: "생활", value: "LIFE" },
  ];

  const fetchArchiveSurveys = async ({
    keywordValue = keyword,
    categoryValue = selectedCategory,
  } = {}) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getArchiveSurveys({
        keyword: keywordValue,
        category: categoryValue,
        size: 3,
      });

      console.log("데이터:", data);
      setSurveyList(data.items);
    } catch (error) {
      console.error("아카이브 목록 조회 실패:", error);
      setErrorMessage("아카이브 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchiveSurveys({
      keywordValue: "",
      categoryValue: "",
    });
  }, []);

  const handleSearch = () => {
    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue: selectedCategory,
    });
  };

  const handleCategoryClick = (categoryValue) => {
    setSelectedCategory(categoryValue);

    fetchArchiveSurveys({
      keywordValue: keyword,
      categoryValue,
    });
  };

  return (
    <div>
      <section className="archive-page">
        <header className="archive-header">
          <button
            className="archive-back-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <h1 className="archive-title">공공 아카이브</h1>
        </header>

        <div className="archive-intro-card">
          <h2 className="archive-intro-title">공공 아카이브</h2>

          <p className="archive-intro-text">
            공유된 설문 데이터를 검색하고 올리고
            <br />
            과제, 연구에 다시 활용해보세요.
          </p>
        </div>

        <div className="archive-search-box">
          <input
            className="archive-search-input"
            type="text"
            placeholder="설문 제목 검색"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <button
            className="archive-search-button"
            type="button"
            onClick={handleSearch}
          >
            <FiSearch />
          </button>
        </div>

        <div className="archive-filter-list">
          {categories.map((category) => (
            <button
              key={category.value || "all"}
              className={`archive-filter-button ${
                selectedCategory === category.value ? "active" : ""
              }`}
              type="button"
              onClick={() => handleCategoryClick(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="archive-section-header">
          <h2 className="archive-section-title">최근 업데이트</h2>

          <button
            className="archive-more-button"
            type="button"
            onClick={() => navigate("/archiveextra")}
          >
            더보기 &gt;
          </button>
        </div>

        {loading && <p>불러오는 중...</p>}

        {errorMessage && <p>{errorMessage}</p>}

        {!loading && !errorMessage && (
          <div className="archive-card-list">
            {surveyList.map((survey) => (
              <SurveyPreviewCard
               key={survey.id}
               survey={survey}
               isSelected={selectedSurveyId === survey.id}
               onClick={() => {
               setSelectedSurveyId(survey.id);
               navigate(`/archive/surveys/${survey.id}`);
               }}
              />
            ))}
          </div>
        )}

        <button
          className="archive-add-button"
          type="button"
          onClick={() => navigate("/myarchive")}
        >
          +
        </button>
      </section>
    </div>
  );
}

export default PublicArchiveMain;