import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
const Purchase = () => {
  return (
    <Layout>
        <PageBanner pageName={"Purchase"} />
        <section className="contact-form-area wow fadeInUp delay-0-2s">
            <div className="container-fluid">
                <iframe src="https://learn.educationnest.com/checkout/" height="950px" width="100%" />
            </div>
        </section>
    </Layout>
  );
};
export default Purchase;
