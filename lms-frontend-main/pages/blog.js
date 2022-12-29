import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
const Blog = () => {
  return (
    <Layout>
        <PageBanner pageName={"Blogs"} />
        <section className="contact-form-area wow fadeInUp delay-0-2s">
            <div className="container-fluid">
                <iframe src="https://learn.educationnest.com/blogs/" height="2000px" width="100%" />
            </div>
        </section>
    </Layout>
  );
};
export default Blog;
