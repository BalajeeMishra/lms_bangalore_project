import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import UserService from "./api/user.service";

const MyQuiz = () => {

  const [quizList, setQuizeList] = useState([]);

  useEffect(() => {
    UserService.getQuizList().then(res => {
      setQuizeList(res.data.data);
    })
  }, [])

  return (
    <Layout>
      <PageBanner pageName={"Quiz"} />
      <div className="row justify-content-center title_heading">
        <h1>Your Quizes</h1>
      </div>
      <section className="features-section-three rel z-1 pt-80 rpt-85 pb-100 rpb-70">
        <div className="container">
          <div className="row justify-content-center">
            {quizList === undefined &&
              <label className="col-form-label form-label">Looks like Quiz list is empty !</label>
            }
            {!!quizList && (quizList.length > 0 &&
              quizList.map((item, idx) => {
                return (
                  <div className="col-lg-3 col-sm-6" key={item.id}>
                    <div className="feature-three-item wow fadeInUp delay-0-2s">
                      <div className="icon">
                        <img src="/assets/images/courses/quiz.jpg" alt="Card image cap" className="avatar-img rounded" />
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                      {!item.is_submitted &&
                        <Link
                          href={`/take-quiz?${`id=${encodeURIComponent(item.id)}&title=${encodeURIComponent(item.title)}&detail=${encodeURIComponent(item.detail)}&teacher=${encodeURIComponent(item.teacher.id)}`}`}
                        >
                          <a className="details-btn">
                            <i className="fas fa-long-arrow-alt-right" />
                          </a>
                        </Link>
                      }
                      {item.is_submitted && <div className="flex-Just-between">
                        <span className="clr-green">Submitted</span>
                        <span className="clr-orange">Score: {item.score}</span>
                      </div>
                      }
                    </div>
                  </div>
                )
              }))
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default MyQuiz;