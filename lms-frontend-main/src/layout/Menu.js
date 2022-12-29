import Link from "next/link";
import { Fragment } from "react";

export const Home = () => (
  <Fragment>
    <li>
      <Link href="/">Home</Link>
    </li>
    {/* <li>
      <Link href="/index2">Home Two</Link>
    </li>
    <li>
      <Link href="/index3">Home Three</Link>
    </li>
    <li>
      <Link href="/index4">Home Four</Link>
    </li> */}
  </Fragment>
);

export const Courses = () => (
  <Fragment>
    <li>
      <Link href="/course-grid">course grid</Link>
    </li>
    {/* <li>
      <Link href="/course-list">course list</Link>
    </li>
    <li>
      <Link href="/course-timeline">course timeline</Link>
    </li> */}
    {/* <li>
      <Link href="/course-details">course details</Link>
    </li> */}
  </Fragment>
);

// export const Pages = () => (
//   <Fragment>
//     <li>
//       <Link href="/faqs">{`FAQ's`}</Link>
//     </li>
//     <li>
//       <Link href="/shop">Shop Page</Link>
//     </li>
//     <li>
//       <Link href="/product-details">product details</Link>
//     </li>
//     <li>
//       <Link href="/checkout">checkout</Link>
//     </li>
//     <li>
//       <Link href="/cart">cart page</Link>
//     </li>
//     <li>
//       <Link href="/instructors">all instructors</Link>
//     </li>
//     <li>
//       <Link href="/become-instructor">become instructor</Link>
//     </li>
//     <li>
//       <Link href="/gallery">gallery</Link>
//     </li>
//     <li>
//       <Link href="/pricing">pricing plan</Link>
//     </li>
//     <li>
//       <Link href="/contact">contact us</Link>
//     </li>
//     <li>
//       <Link href="/404">error Page</Link>
//     </li>
//   </Fragment>
// );

// export const Blog = () => (
//   <Fragment>
//     <li>
//       <Link href="/blog">Blog Page</Link>
//     </li>
//     <li>
//       <Link href="/blog-details">Blog Details</Link>
//     </li>
//   </Fragment>
// );
