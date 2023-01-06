import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import { Index1WorkStepSliderprops } from "../../sliderProps";

export default class TestimonialsSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      speed: 400,
      autoplay: false,
      autoplaySpeed: 5000,
      arrows: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <Fragment>
        <div className="row justify-content-between align-items-center pb-30 wow fadeInUp delay-0-2s">
          <div className="col-xl-7 col-lg-8">
            <div className="section-title">
              <span className="sub-title mb-15">TESTIMONIALS</span>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="slider-arrow-btns text-lg-right mt-10">
              <button onClick={this.previous} className="work-prev">
                <i className="fas fa-angle-left" />
              </button>
              <button onClick={this.next} className="work-next">
                <i className="fas fa-angle-right" />
              </button>
            </div>
          </div>
        </div>
        <Slider {...Index1WorkStepSliderprops} ref={(c) => (this.slider = c)} className="work-step-wrap wow fadeInUp delay-0-4s">
          <div className="work-step-item">
            <span className="number">01</span>
            <div className="content">
              <h4>Abhinav Pandey </h4> <br /> <span>Associate Sector Lead- HCL Foundation</span>
              <p>
                This training course is beyond my expectations. These tools and methodology & principals have opened my eyes on how to be effective and ethical! Honestly saying I wanted to be a Researcher but, due to lack of knowledge and guidance it
                was difficult for me (I was thinking) but, after attending the course I really at least found my path that how I have to start. Thanks Sambodhi and their amazing teacher/ trainer(s). Looking forward to putting all those learning
                things in my professional and personal practices. Thanks again.
              </p>
            </div>
          </div>
          <div className="work-step-item">
            <span className="number">02</span>
            <div className="content">
              <h4>Hashir P.V </h4> <br />
              <span>Centre For Research In Schemes And Policies</span>
              <p>
                MEL4DP Program has immensely helped me in getting a clarity on MEL through a clear practical lens. The course taught me various aspects of MEL practice and theory and dashboard making by drawing examples from different case studies. I
                strongly recommend this course to the beginner and mid-level professionals interested in monitoring and evaluation. A big thank you to Sambodhi and my mentors for providing me a scholarship to pursue this course.
              </p>
            </div>
          </div>
          <div className="work-step-item">
            <span className="number">03</span>
            <div className="content">
              <h4>Abha</h4>
              <br />
              <span>Senior Research Manager- Sambodhi</span>
              <p>
                I have been a development practitioner since last six years. Working at the grassroots in Pradan developed a sense of understanding of real challenges and opportunities to work with the rural communities. I however felt the need to
                understand the "change" that's coming by the immense work we all were doing. I switched my career to M&E in sambodhi. We were offered a course that was so deep yet easy to understand the gist, was a bliss to a professional like me
                from the field. Right from history of monitoring and evaluation to all the techniques and technicalities, this course is a complete package for any professional wanting to get in the domain of M&E. This course also offers some
                learning while doing which is great and easy to cope with regular office work.
              </p>
            </div>
          </div>
        </Slider>
      </Fragment>
    );
  }
}
