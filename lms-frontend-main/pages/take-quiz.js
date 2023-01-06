import React from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Quiz from "../src/components/quiz/Quiz";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserService from "./api/user.service";
import { useState } from "react";

const TakeQuiz = () => {
  const router = useRouter();
  const { id, title, detail, teacher } = router.query;
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    let params = getQueryStringParams(window.location.search);
    if (params && params.id) {
      UserService.getQuizQuestionList(params.id).then((res) => {
        // console.log("data", res.data.data)
        setQuestionList(res.data.data);
      });
    }
  }, []);

  const getQueryStringParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
          return params;
        }, {})
      : {};
  };

  return (
    <Layout>
      <PageBanner pageName={"Take Quiz"} />
      <section className="features-section-three rel z-1 pt-110 rpt-85 pb-100 rpb-70">
        {questionList === undefined && <h2 className="text-center">Coming soon!</h2>}
        {!!questionList && questionList.length > 0 && <Quiz quizData={questionList} title={title} detail={detail} teacher={teacher} />}
      </section>
    </Layout>
  );
};

export default TakeQuiz;
